#!/usr/bin/env tsx
/**
 * BACKUP AUTOMÁTICO DE LA BASE DE DATOS
 * 
 * Este script:
 * 1. Exporta toda la BD de Supabase a SQL
 * 2. Lo guarda en la carpeta /backups con timestamp
 * 3. Comprime el archivo
 * 4. Opcionalmente lo sube a la nube (S3/Google Drive)
 * 5. Limpia backups antiguos (mantiene últimos 30 días)
 * 
 * Uso:
 *   npx tsx scripts/backup-database.mts
 * 
 * Automatización (Linux/Mac crontab):
 *   0 3 * * * cd /path/to/project && npx tsx scripts/backup-database.mts
 * 
 * Automatización (Windows Task Scheduler):
 *   Program: powershell.exe
 *   Arguments: -Command "cd C:\path\to\project; npx tsx scripts\backup-database.mts"
 *   Schedule: Daily at 3:00 AM
 */

import { config } from 'dotenv'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as fs from 'fs/promises'
import * as path from 'path'
import { createWriteStream, createReadStream } from 'fs'
import { createGzip } from 'zlib'
import { pipeline } from 'stream/promises'

config({ path: '.env.local' })

const execAsync = promisify(exec)

// ── CONFIGURACIÓN ──────────────────────────────────────────────────────────

const BACKUP_DIR = path.join(process.cwd(), 'backups')
const RETENTION_DAYS = 30 // Mantener últimos 30 días
const SUPABASE_DB_URL = process.env.DATABASE_URL // Si tienes acceso directo
const SUPABASE_PROJECT_REF = 'ktsdxpmaljiyuwimcugx' // Tu project ref de Supabase

// ── FUNCIONES ──────────────────────────────────────────────────────────────

async function ensureBackupDir() {
  try {
    await fs.access(BACKUP_DIR)
  } catch {
    await fs.mkdir(BACKUP_DIR, { recursive: true })
    console.log(`📁 Creada carpeta de backups: ${BACKUP_DIR}`)
  }
}

async function createBackup(): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const filename = `backup-${timestamp}.sql`
  const filepath = path.join(BACKUP_DIR, filename)

  console.log('🔄 Exportando base de datos...')

  if (SUPABASE_DB_URL) {
    // Opción 1: pg_dump directo (si tienes DATABASE_URL)
    const command = `pg_dump "${SUPABASE_DB_URL}" > "${filepath}"`
    
    try {
      await execAsync(command)
      console.log(`✅ Backup creado: ${filename}`)
    } catch (error) {
      console.error('❌ Error ejecutando pg_dump:', error)
      throw error
    }
  } else {
    // Opción 2: Usar Supabase CLI
    console.log('⚠️ DATABASE_URL no configurada, usando Supabase CLI...')
    
    const command = `npx supabase db dump -p ${process.env.SUPABASE_DB_PASSWORD || ''} --project-ref ${SUPABASE_PROJECT_REF} > "${filepath}"`
    
    try {
      await execAsync(command)
      console.log(`✅ Backup creado: ${filename}`)
    } catch (error) {
      console.error('❌ Error con Supabase CLI. Alternativa: exportar manualmente desde Dashboard')
      console.error('   https://supabase.com/dashboard/project/ktsdxpmaljiyuwimcugx/database/backups')
      
      // Fallback: Crear un backup de solo los datos críticos vía API
      await createAPIBackup(filepath)
    }
  }

  return filepath
}

async function createAPIBackup(filepath: string) {
  console.log('🔄 Creando backup vía Supabase API (tablas críticas)...')
  
  const { createClient } = await import('@supabase/supabase-js')
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const criticalTables = [
    'listings',
    'listing_images',
    'user_favorites',
    'search_alerts',
    'conversations',
    'messages',
    'gestoria_requests',
    'owner_leads',
    'agency_leads',
  ]

  let sqlDump = `-- Backup de Inmonest (API mode) - ${new Date().toISOString()}\n\n`

  for (const table of criticalTables) {
    console.log(`  📊 Exportando tabla: ${table}`)
    
    const { data, error } = await supabase.from(table).select('*').limit(10000)
    
    if (error) {
      console.warn(`  ⚠️ Error en ${table}:`, error.message)
      continue
    }

    if (!data || data.length === 0) {
      sqlDump += `-- Tabla ${table}: vacía\n\n`
      continue
    }

    // Convertir a INSERT statements
    sqlDump += `-- Tabla: ${table} (${data.length} registros)\n`
    sqlDump += `TRUNCATE TABLE ${table} CASCADE;\n`
    
    for (const row of data) {
      const columns = Object.keys(row).join(', ')
      const values = Object.values(row)
        .map(v => {
          if (v === null) return 'NULL'
          if (typeof v === 'string') return `'${v.replace(/'/g, "''")}'`
          if (typeof v === 'object') return `'${JSON.stringify(v).replace(/'/g, "''")}'`
          return v
        })
        .join(', ')
      
      sqlDump += `INSERT INTO ${table} (${columns}) VALUES (${values});\n`
    }
    
    sqlDump += '\n'
  }

  await fs.writeFile(filepath, sqlDump, 'utf-8')
  console.log(`✅ Backup API creado`)
}

async function compressBackup(filepath: string): Promise<string> {
  const gzPath = `${filepath}.gz`
  
  console.log('📦 Comprimiendo backup...')
  
  const source = createReadStream(filepath)
  const destination = createWriteStream(gzPath)
  const gzip = createGzip({ level: 9 })
  
  await pipeline(source, gzip, destination)
  
  // Borrar archivo original sin comprimir
  await fs.unlink(filepath)
  
  const stats = await fs.stat(gzPath)
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2)
  
  console.log(`✅ Backup comprimido: ${path.basename(gzPath)} (${sizeMB} MB)`)
  
  return gzPath
}

async function cleanOldBackups() {
  console.log(`🧹 Limpiando backups antiguos (>${RETENTION_DAYS} días)...`)
  
  const files = await fs.readdir(BACKUP_DIR)
  const now = Date.now()
  let deleted = 0
  
  for (const file of files) {
    if (!file.startsWith('backup-')) continue
    
    const filepath = path.join(BACKUP_DIR, file)
    const stats = await fs.stat(filepath)
    const ageInDays = (now - stats.mtimeMs) / (1000 * 60 * 60 * 24)
    
    if (ageInDays > RETENTION_DAYS) {
      await fs.unlink(filepath)
      console.log(`  🗑️ Eliminado: ${file} (${Math.floor(ageInDays)} días)`)
      deleted++
    }
  }
  
  if (deleted === 0) {
    console.log('  ℹ️ No hay backups antiguos para eliminar')
  } else {
    console.log(`✅ ${deleted} backup(s) antiguo(s) eliminado(s)`)
  }
}

async function uploadToCloud(filepath: string) {
  // TODO: Implementar subida a S3, Google Drive, Dropbox, etc.
  // Por ahora solo guardamos local
  console.log('ℹ️ Upload a la nube: no configurado (backups solo locales)')
  
  // Ejemplo con AWS S3:
  /*
  const AWS = require('aws-sdk')
  const s3 = new AWS.S3()
  
  const fileContent = await fs.readFile(filepath)
  const params = {
    Bucket: 'inmonest-backups',
    Key: path.basename(filepath),
    Body: fileContent,
  }
  
  await s3.upload(params).promise()
  console.log('✅ Backup subido a S3')
  */
}

// ── MAIN ───────────────────────────────────────────────────────────────────

async function main() {
  console.log('🚀 Iniciando backup automático de Inmonest\n')
  console.log(`📅 Fecha: ${new Date().toLocaleString('es-ES')}`)
  console.log(`📁 Destino: ${BACKUP_DIR}\n`)

  try {
    // 1. Asegurar que existe la carpeta
    await ensureBackupDir()

    // 2. Crear backup
    const backupPath = await createBackup()

    // 3. Comprimir
    const compressedPath = await compressBackup(backupPath)

    // 4. Subir a la nube (opcional)
    await uploadToCloud(compressedPath)

    // 5. Limpiar backups antiguos
    await cleanOldBackups()

    console.log('\n✅ ¡Backup completado exitosamente!')
    console.log(`📊 Archivo: ${path.basename(compressedPath)}`)
    
  } catch (error) {
    console.error('\n❌ Error durante el backup:', error)
    process.exit(1)
  }
}

main()
