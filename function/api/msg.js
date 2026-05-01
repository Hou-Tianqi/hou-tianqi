export async function onRequest(context) {
  const { request, env } = context
  const db = env.msg_db  // 改成你在 Dashboard 里绑定的变量名

  const url = new URL(request.url)
  const method = request.method

  // GET：获取留言列表
  if (method === 'GET') {
    const { results } = await db.prepare(
      'SELECT * FROM messages ORDER BY created_at DESC LIMIT 50'
    ).all()
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  // POST：提交留言
  if (method === 'POST') {
    const body = await request.json()
    const { nickname, content } = body

    if (!nickname || !nickname.trim()) {
      return new Response(
        JSON.stringify({ error: '请输入昵称' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    if (!content || !content.trim()) {
      return new Response(
        JSON.stringify({ error: '请输入留言内容' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    if (nickname.length > 20 || content.length > 500) {
      return new Response(
        JSON.stringify({ error: '昵称不超过20字，内容不超过500字' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { meta } = await db.prepare(
      'INSERT INTO messages (nickname, content) VALUES (?, ?)'
    ).bind(nickname.trim(), content.trim()).run()

    return new Response(
      JSON.stringify({ success: true, id: meta.last_row_id }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { status: 405, headers: { 'Content-Type': 'application/json' } }
  )
}