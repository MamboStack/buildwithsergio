export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { contents, system } = req.body;

  if (!contents || !system) {
    return res.status(400).json({ error: 'Missing contents or system' });
  }

  try {
    // Uso del modelo estable gemini-2.5-flash y la versión v1 de la API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents,
          generationConfig: { maxOutputTokens: 600, temperature: 0.7 }
        })
      }
    );

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    // Mensaje de error ajustado para mantener la consistencia del portafolio
    return res.status(500).json({ error: 'Error en la integración de modelos de IA' });
  }
}