import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(process.cwd(), '.env.local') })

const key = process.env.OPENROUTER_API_KEY!

console.log('🧪 Probando modelo GRATUITO de OpenRouter...\n')

const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${key}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': 'https://inmonest.com',
    'X-Title': 'Inmonest'
  },
  body: JSON.stringify({
    model: 'google/gemma-2-9b-it:free',
    messages: [{
      role: 'user',
      content: 'Describe en 200 palabras: Piso 3 habitaciones, 2 baños, 90m², alquiler 1200€/mes en Chamberí, Madrid. Tono profesional.'
    }],
    max_tokens: 500,
    temperature: 0.7
  })
})

const data = await response.json()

if (data.error) {
  console.error('❌ Error:', data.error)
  process.exit(1)
}

console.log('✅ MODELO GRATIS FUNCIONA!\n')
console.log('Respuesta:')
console.log('─'.repeat(80))
console.log(data.choices[0].message.content)
console.log('─'.repeat(80))
console.log('\n📊 Estadísticas:')
console.log('   Tokens usados:', data.usage?.total_tokens || 'N/A')
console.log('   Coste:', data.usage?.total_cost || '$0.00 (GRATIS)')
