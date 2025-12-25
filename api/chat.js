export default async function handler(req, res) {
  const key = process.env.OPENAI_API_KEY;
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + key,
        'X-Title': 'LifeOS Ultimate'
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: req.body.messages,
        response_format: { type: "json_object" } 
      })
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erreur IA" });
  }
}
