import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  const { system, contents } = req.body;

  if (!contents || !contents.length) {
    return res.status(400).json({ error: 'El contenido es obligatorio' });
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: system || ''
    });

    const result = await model.generateContent({ contents });
    const text = result.response.text();

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error("Error en la API de Gemini:", error);
    return res.status(500).json({
      error: "Error interno al procesar el chat",
      details: error.message
    });
  }
}