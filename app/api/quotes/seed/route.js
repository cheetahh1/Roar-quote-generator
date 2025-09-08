import { getSupabaseClient } from '@/lib/supabaseClient'

export async function POST(request) {
  const supabase = getSupabaseClient()
  // Simple mode: no auth checks; anyone can call this.

  const starterQuotes = [
    'Life finds a way to be awesome! 🦕',
    "Don't let anyone make you extinct! 🦖",
    'Roar with confidence, stomp with purpose! 🦕',
    'Big dreams require big steps! 🦖',
    'Stay fierce, stay fabulous! 🦕',
    'Every day is a new adventure in the Jurassic! 🦖',
    'Be the T-Rex of your own story! 🦕',
    'Herbivore or carnivore, we all need love! 🦖',
    "Don't be a fossil, be a legend! 🦕",
    'Stomp your way to success! 🦖',
  ]

  try {
    const { data: existing, error: readError } = await supabase
      .from('quotes')
      .select('content')
      .limit(10000)

    if (readError) throw readError

    const existingSet = new Set((existing || []).map((q) => q.content))
    const toInsert = starterQuotes
      .filter((q) => q && !existingSet.has(q))
      .map((q) => ({ content: q }))

    if (toInsert.length === 0) {
      return new Response(JSON.stringify({ ok: true, inserted: 0 }), { status: 200 })
    }

    const { error: insertError } = await supabase.from('quotes').insert(toInsert)
    if (insertError) throw insertError

    return new Response(JSON.stringify({ ok: true, inserted: toInsert.length }), { status: 200 })
  } catch (err) {
    console.error('POST /api/quotes/seed failed:', err)
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || 'Seed failed' }),
      { status: 500 }
    )
  }
}


