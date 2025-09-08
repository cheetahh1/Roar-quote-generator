import { getSupabaseClient } from '@/lib/supabaseClient'

export async function GET() {
  try {
    const supabase = getSupabaseClient()
    // Expect a table `quotes` with a text column `content`
    const { data, error } = await supabase
      .from('quotes')
      .select('content')
      .limit(1000)

    if (error) throw error

    const pool = (data || []).map((q) => q.content).filter(Boolean)
    if (pool.length === 0) {
      return new Response(JSON.stringify({ quote: 'No quotes found in database.' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const randomIndex = Math.floor(Math.random() * pool.length)
    const quote = pool[randomIndex]

    return new Response(JSON.stringify({ quote }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    console.error('GET /api/quotes failed:', err)
    const body =
      process.env.NODE_ENV !== 'production'
        ? { quote: 'Unable to fetch from Supabase.', error: String(err?.message || err) }
        : { quote: 'Unable to fetch from Supabase.' }
    return new Response(JSON.stringify(body), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}

export async function POST(request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json().catch(() => ({}))

    const quotesArray = Array.isArray(body?.quotes)
      ? body.quotes
      : body?.content
        ? [body.content]
        : []

    const toInsert = quotesArray
      .map((q) => (typeof q === 'string' ? q.trim() : ''))
      .filter((q) => q.length > 0)
      .map((q) => ({ content: q }))

    if (toInsert.length === 0) {
      return new Response(
        JSON.stringify({ ok: false, error: 'Provide content or quotes[]' }),
        { status: 400 }
      )
    }

    const { error } = await supabase.from('quotes').insert(toInsert)
    if (error) throw error

    return new Response(
      JSON.stringify({ ok: true, inserted: toInsert.length }),
      { status: 200 }
    )
  } catch (err) {
    console.error('POST /api/quotes failed:', err)
    return new Response(
      JSON.stringify({ ok: false, error: err?.message || 'Insert failed' }),
      { status: 500 }
    )
  }
}


