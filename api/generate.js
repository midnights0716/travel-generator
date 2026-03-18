export async function onRequestPost(context) {
  const { prompt } = await context.request.json();
  if (!prompt) return new Response('no prompt', { status: 400 });

  const res = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${context.env.SF_API_KEY}`
    },
    body: JSON.stringify({
      model: 'Qwen/Qwen2.5-7B-Instruct',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
}
