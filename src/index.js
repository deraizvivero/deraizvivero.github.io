export default {
  async fetch(request, env) {
    // Lee la variable GEMINI_API_KEY directamente desde tu panel de Cloudflare
    const apiKey = env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "cambiar_en_github") {
      return new Response("Error: No se encontró la API Key real en Cloudflare.", { status: 500 });
    }

    // URL y modelo oficiales correctos
    const url = "https://googleapis.com";
    
    try {
      const response = await fetch(`${url}?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: "Hola Gemini, la conexión desde mi Cloudflare Worker raicita funciona perfectamente. Dame un saludo corto de confirmación."
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        return new Response("Error de la API de Gemini: " + errorText, { status: response.status });
      }

      const data = await response.json();
      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response("Error al conectar con Gemini: " + error.message, { status: 500 });
    }
  }
};
