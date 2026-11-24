
function generateResponse(message) {
    const text = message.toLowerCase().trim();

    if (["hola", "buenas", "buenos dias", "buenas tardes"].includes(text)) {
        return `¡Hola! 👋 Bienvenido a MJAF.

¿En qué podemos ayudarte?

1️⃣ Ver catálogo
2️⃣ Consultar precios
3️⃣ Realizar pedido
4️⃣ Consultar envío
5️⃣ Hablar con un asesor

Escribe el número de una opción.`;
    }

    switch (text) {
        case "1":
            return "👕 ¡Tenemos prendas para ti! Pronto podrás consultar nuestro catálogo completo.";

        case "2":
            return "💰 Para consultar precios, indícanos qué producto te interesa.";

        case "3":
            return "🛍️ ¡Vamos a realizar tu pedido! Indícanos qué producto deseas comprar.";

        case "4":
            return "🚚 Realizamos envíos en Arequipa y a otras provincias. ¿A qué ciudad deseas enviar tu pedido?";

        case "5":
            return "🙋 Te ayudaremos a contactar con un asesor. Déjanos tu consulta.";

        default:
            if (text.includes("precio")) {
                return "💰 ¿Qué producto deseas consultar?";
            }

            if (text.includes("envio") || text.includes("envío")) {
                return "🚚 Contamos con envíos. ¿A qué ciudad necesitas enviar tu pedido?";
            }

            if (text.includes("pedido")) {
                return "📦 Cuéntanos qué pedido deseas realizar.";
            }

            return `No logré entender tu mensaje 😅.

Escribe hola para mostrarte nuestro menú.`;
    }
}

module.exports = { generateResponse };
