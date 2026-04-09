import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Solo permitimos peticiones POST (seguridad básica)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Usa POST.' });
  }

  // 2. Extraer el mensaje del cuerpo de la petición
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'El mensaje es obligatorio' });
  }

  // 3. Inicializar la IA con la variable de entorno que configuramos en Vercel
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    // Usamos gemini-1.5-flash que es más rápido y eficiente para chatbots
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 4. Generar la respuesta
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // 5. Devolver la respuesta al frontend
    return res.status(200).json({ reply: text });

  } catch (error) {
    // 6. En caso de error (API Key inválida, límite de cuota, etc.)
    console.error("Error en la API de Gemini:", error);
    return res.status(500).json({ 
      error: "Error interno al procesar el chat", 
      details: error.message 
    });
  }
}