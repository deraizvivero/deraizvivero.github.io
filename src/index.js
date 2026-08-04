export default {
  async fetch(request, env) {
    try {
      // Forzamos el uso del nuevo modelo oficial y vigente de Cloudflare
      const response = await env.AI.run('@cf/meta/llama-3.2-3b-instruct', {
        messages: [
          { role: 'user', content: 'Hola, dame un saludo muy corto de una frase para confirmar que mi web funciona.' }
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
