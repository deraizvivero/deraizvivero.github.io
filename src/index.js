export default {
  async fetch(request, env) {
    try {
      // Llama directamente al modelo de Inteligencia Artificial de Cloudflare
      const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
        messages: [
          { role: 'user', content: 'Hola, dame un saludo corto para confirmar que mi Cloudflare Worker funciona.' }
        ]
      });

      return new Response(JSON.stringify(response), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      return new Response("Error en la IA de Cloudflare: " + error.message, { status: 500 });
    }
  }
};
