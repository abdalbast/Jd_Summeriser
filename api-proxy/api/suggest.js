export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { jdText, targetSkills, userCvMeta } = req.body || {};
    if (!process.env.OPENAI_API_KEY) return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
    const system = `You are a precise, non-bluffing CV tailoring assistant. Use concise, recruiter-friendly language. Do not invent experience.`;
    const prompt = {
      role: 'user',
      content: JSON.stringify({ jdText, targetSkills, userCvMeta })
    };
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [ { role:'system', content: system }, prompt ],
        temperature: 0.3
      })
    });
    const json = await r.json();
    if (!r.ok) return res.status(500).json({ error: json.error || 'LLM error' });
    return res.status(200).json({ text: json.choices?.[0]?.message?.content || '' });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Unexpected' });
  }
}
