'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getSupabaseStorageUrl } from '@/lib/supabase-config'

interface ImageItem {
  id: string
  storage_path: string | null
  external_url: string | null
  position: number
}

interface ListingData {
  id: string
  title: string
  description: string | null
  price_eur: number | null
  operation: string
  city: string | null
  district: string | null
  province: string | null
  bedrooms: number | null
  bathrooms: number | null
  area_m2: number | null
  status: string
  images?: ImageItem[]
}

export default function EditarAnuncioForm({ listing }: { listing: ListingData }) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  
  // Gestión de imágenes
  const [images, setImages] = useState<ImageItem[]>(listing.images || [])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])
  const [uploadingImages, setUploadingImages] = useState(false)

  const [form, setForm] = useState({
    title:       listing.title ?? '',
    description: listing.description ?? '',
    price_eur:   listing.price_eur?.toString() ?? '',
    operation:   listing.operation ?? 'sale',
    city:        listing.city ?? '',
    district:    listing.district ?? '',
    bedrooms:    listing.bedrooms?.toString() ?? '',
    bathrooms:   listing.bathrooms?.toString() ?? '',
    area_m2:     listing.area_m2?.toString() ?? '',
  })

  function set(field: keyof typeof form, value: string) {
    setForm(f => ({ ...f, [field]: value }))
    setSuccess(false)
    setError(null)
  }

  // Gestión de imágenes
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    
    const imageFiles = files.filter(f => f.type.startsWith('image/'))
    if (imageFiles.length === 0) {
      setError('Solo puedes subir archivos de imagen')
      return
    }
    
    const totalImages = images.length - deletedImageIds.length + newFiles.length + imageFiles.length
    if (totalImages > 20) {
      setError('Máximo 20 fotos por anuncio')
      return
    }
    
    setNewFiles(prev => [...prev, ...imageFiles])
    setSuccess(false)
    setError(null)
  }

  function removeExistingImage(imageId: string) {
    setDeletedImageIds(prev => [...prev, imageId])
    setSuccess(false)
  }

  function undoRemoveImage(imageId: string) {
    setDeletedImageIds(prev => prev.filter(id => id !== imageId))
  }

  function removeNewFile(index: number) {
    setNewFiles(prev => prev.filter((_, i) => i !== index))
  }

  async function handleDeleteListing() {
    if (!confirm('¿Estás seguro de eliminar este anuncio? Esta acción no se puede deshacer.')) return
    
    setDeleting(true)
    setError(null)
    
    try {
      const res = await fetch(`/api/mis-anuncios/${listing.id}`, {
        method: 'DELETE',
      })
      
      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? 'Error al eliminar')
      } else {
        router.push('/mi-cuenta/anuncios?deleted=1')
      }
    } catch {
      setError('Error de conexión')
    } finally {
      setDeleting(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)
    
    try {
      // 1. Actualizar campos del formulario
      const res = await fetch(`/api/mis-anuncios/${listing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title:       form.title.trim(),
          description: form.description.trim(),
          price_eur:   form.price_eur ? Number(form.price_eur) : undefined,
          operation:   form.operation,
          city:        form.city.trim(),
          district:    form.district.trim(),
          bedrooms:    form.bedrooms !== '' ? Number(form.bedrooms) : undefined,
          bathrooms:   form.bathrooms !== '' ? Number(form.bathrooms) : undefined,
          area_m2:     form.area_m2 !== '' ? Number(form.area_m2) : undefined,
        }),
      })
      
      if (!res.ok) {
        const d = await res.json()
        setError(d.error ?? 'Error guardando')
        setSaving(false)
        return
      }
      
      // 2. Gestionar imágenes si hay cambios
      if (deletedImageIds.length > 0 || newFiles.length > 0) {
        setUploadingImages(true)
        const supabase = createClient()
        
        // Eliminar imágenes marcadas
        if (deletedImageIds.length > 0) {
          const imagesToDelete = images.filter(img => deletedImageIds.includes(img.id))
          
          for (const img of imagesToDelete) {
            // Eliminar de listing_images
            await supabase.from('listing_images').delete().eq('id', img.id)
            
            // Eliminar de Storage si tiene storage_path
            if (img.storage_path) {
              await supabase.storage.from('listings').remove([img.storage_path])
            }
          }
        }
        
        // Subir nuevas imágenes
        if (newFiles.length > 0) {
          const userId = listing.id.split('/')[0] // Asumiendo estructura de paths
          
          for (let i = 0; i < newFiles.length; i++) {
            const file = newFiles[i]
            const ext = file.name.split('.').pop() ?? 'webp'
            const timestamp = Date.now()
            const path = `${userId}/${listing.id}/${timestamp}_${i}.${ext}`
            
            // Add delay between uploads to avoid rate limiting (300ms)
            if (i > 0) {
              await new Promise(resolve => setTimeout(resolve, 300))
            }
            
            const { error: upErr } = await supabase.storage
              .from('listings')
              .upload(path, file, { upsert: true, contentType: file.type })
            
            if (upErr) {
              console.error('[Upload Error]', upErr)
              continue
            }
            
            const { data: urlData } = supabase.storage.from('listings').getPublicUrl(path)
            
            const nextPosition = images.length + i
            await supabase.from('listing_images').insert({
              listing_id:   listing.id,
              storage_path: path,
              external_url: urlData.publicUrl,
              position:     nextPosition,
            })
          }
        }
        
        setUploadingImages(false)
      }
      
      setSuccess(true)
      setDeletedImageIds([])
      setNewFiles([])
      router.refresh()
      
    } catch (err) {
      console.error(err)
      setError('Error de conexión')
    } finally {
      setSaving(false)
      setUploadingImages(false)
    }
  }

  const inputCls = 'w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9962a]/40 focus:border-gold-500 transition-colors'
  const labelCls = 'block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Título */}
      <div>
        <label className={labelCls}>Título *</label>
        <input
          type="text"
          required
          maxLength={200}
          value={form.title}
          onChange={e => set('title', e.target.value)}
          className={inputCls}
          placeholder="Ej: Piso luminoso de 3 hab en centro"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className={labelCls}>Descripción</label>
        <textarea
          rows={6}
          maxLength={3000}
          value={form.description}
          onChange={e => set('description', e.target.value)}
          className={inputCls + ' resize-none'}
          placeholder="Describe el inmueble..."
        />
        <p className="text-xs text-gray-400 mt-1 text-right">{form.description.length}/3000</p>
      </div>

      {/* Precio + Operación */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Precio (€) *</label>
          <input
            type="number"
            required
            min={1}
            max={99999999}
            value={form.price_eur}
            onChange={e => set('price_eur', e.target.value)}
            className={inputCls}
            placeholder="Ej: 180000"
          />
        </div>
        <div>
          <label className={labelCls}>Operación</label>
          <select
            value={form.operation}
            onChange={e => set('operation', e.target.value)}
            className={inputCls + ' bg-white'}
          >
            <option value="sale">Venta</option>
            <option value="rent">Alquiler</option>
          </select>
        </div>
      </div>

      {/* Ciudad + Barrio */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Ciudad</label>
          <input
            type="text"
            maxLength={100}
            value={form.city}
            onChange={e => set('city', e.target.value)}
            className={inputCls}
            placeholder="Ej: Madrid"
          />
        </div>
        <div>
          <label className={labelCls}>Barrio / Zona</label>
          <input
            type="text"
            maxLength={100}
            value={form.district}
            onChange={e => set('district', e.target.value)}
            className={inputCls}
            placeholder="Ej: Salamanca"
          />
        </div>
      </div>

      {/* Habitaciones + Baños + Superficie */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelCls}>Habitaciones</label>
          <input
            type="number"
            min={0}
            max={20}
            value={form.bedrooms}
            onChange={e => set('bedrooms', e.target.value)}
            className={inputCls}
            placeholder="0"
          />
        </div>
        <div>
          <label className={labelCls}>Baños</label>
          <input
            type="number"
            min={0}
            max={10}
            value={form.bathrooms}
            onChange={e => set('bathrooms', e.target.value)}
            className={inputCls}
            placeholder="1"
          />
        </div>
        <div>
          <label className={labelCls}>Superficie m²</label>
          <input
            type="number"
            min={1}
            max={9999}
            value={form.area_m2}
            onChange={e => set('area_m2', e.target.value)}
            className={inputCls}
            placeholder="80"
          />
        </div>
      </div>

      {/* Feedback */}
      {error && (
        <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
      )}
      {success && (
        <p className="text-sm text-gold-700 bg-cream-100 px-4 py-2.5 rounded-xl">
          ✓ Cambios guardados correctamente
        </p>
      )}

      {/* GESTIÓN DE FOTOS */}
      <div className="border-t pt-6 mt-6">
        <label className={labelCls}>Fotos del anuncio</label>
        <p className="text-xs text-gray-400 mb-3">Máximo 20 fotos. Primera foto = portada.</p>
        
        {/* Fotos existentes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
          {images
            .filter(img => !deletedImageIds.includes(img.id))
            .map((img, idx) => {
              const imgUrl = img.storage_path
                ? getSupabaseStorageUrl('listings', img.storage_path)
                : img.external_url
              
              return (
                <div key={img.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl || ''} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx === 0 && (
                    <div className="absolute top-2 left-2 bg-gold-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                      Portada
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeExistingImage(img.id)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              )
            })}
          
          {/* Fotos eliminadas (preview con opción de deshacer) */}
          {images
            .filter(img => deletedImageIds.includes(img.id))
            .map((img, idx) => {
              const imgUrl = img.storage_path
                ? getSupabaseStorageUrl('listings', img.storage_path)
                : img.external_url
              
              return (
                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-red-300 opacity-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgUrl || ''} alt={`Eliminada ${idx + 1}`} className="w-full h-full object-cover grayscale" />
                  <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => undoRemoveImage(img.id)}
                      className="bg-white hover:bg-gray-100 text-gray-900 px-3 py-1.5 rounded-lg text-xs font-medium shadow"
                    >
                      Deshacer
                    </button>
                  </div>
                </div>
              )
            })}
          
          {/* Nuevas fotos pendientes de subir */}
          {newFiles.map((file, idx) => (
            <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 border-green-300">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file)}
                alt={`Nueva ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-gold-500 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                Nueva
              </div>
              <button
                type="button"
                onClick={() => removeNewFile(idx)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
          
          {/* Botón agregar fotos */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-gold-500 hover:bg-cream-100 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gold-500"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs font-medium">Agregar</span>
          </button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {(deletedImageIds.length > 0 || newFiles.length > 0) && (
          <p className="text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
            ⚠️ Cambios pendientes en fotos. Click en "Guardar cambios" para aplicar.
          </p>
        )}
      </div>

      {/* Botones */}
      <div className="flex flex-col gap-3 pt-4">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving || uploadingImages}
            className="flex-1 bg-gold-500 hover:bg-[#b8841e] disabled:opacity-50 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
          >
            {uploadingImages ? 'Subiendo fotos...' : saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
          <Link
            href="/mi-cuenta/anuncios"
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-center"
          >
            Cancelar
          </Link>
        </div>
        
        {/* Botón eliminar anuncio */}
        <button
          type="button"
          onClick={handleDeleteListing}
          disabled={deleting}
          className="w-full bg-white hover:bg-red-50 border border-red-200 text-red-600 font-medium py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
        >
          {deleting ? 'Eliminando...' : '🗑️ Eliminar anuncio permanentemente'}
        </button>
      </div>
    </form>
  )
}
