export default async function handler(req, res) {
  const cle = process.env.OPENAI_API_KEY; // Ta clé Vercel
  try {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + cle, // Syntaxe ultra-basique pour éviter les erreurs
        'X-Title': 'LifeOS'
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: req.body.messages
      })
    });
    const d = await r.json();
    res.status(200).json(d);
  } catch (err) {
    res.status(500).json({ error: "Erreur" });
  }
}
