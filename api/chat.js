export default async function handler(req, res) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "Clé API manquante" });

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key,
        'X-Title': 'LifeOS Elite'
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: req.body.messages,
        response_format: { type: "json_object" } // Force l'IA à répondre en JSON pur
      })
    });

    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
}
