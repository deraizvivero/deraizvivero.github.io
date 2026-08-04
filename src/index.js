export default {
  async fetch(request, env) {
    try {
      // 1. Extraemos los parámetros de la URL para capturar la pregunta
      const urlParams = new URL(request.url).searchParams;
      
      // 2. Buscamos el texto que escribas después de '?pregunta='
      // Si no escribes nada, la IA usará un saludo por defecto
      const preguntaUsuario = urlParams.get('pregunta') || 'Hola, dame un saludo corto para mi vivero.';

      // 3. Enviamos tu pregunta real al motor de IA de Cloudflare
      const response = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
        messages: [
          { 
            role: 'system', 
            content: 'Eres un asistente experto en botánica, plantas y jardinería para el vivero De Raíz. Responde siempre de forma clara, amable y en español.' 
          },
          { 
            role: 'user', 
            content: preguntaUsuario 
          }
        ]
      });

      // 4. Te devolvemos la respuesta limpia en la pantalla
      return new Response(JSON.stringify(response), {
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*" // Esto permitirá conectar tu web más adelante
        }
      });
    } catch (error) {
      return new Response("Error en la IA de Cloudflare: " + error.message, { status: 500 });
    }
  }
};
