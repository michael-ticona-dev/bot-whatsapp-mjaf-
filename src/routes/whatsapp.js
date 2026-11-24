
const express = require("express");
const axios = require("axios");
const { generateResponse } = require("../services/bot");

const router = express.Router();

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.PHONE_NUMBER_ID;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const API_VERSION = process.env.GRAPH_API_VERSION;

router.get("/", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        return res.status(200).send(challenge);
    }

    return res.sendStatus(403);
});

router.post("/", async (req, res) => {
    res.sendStatus(200);

    try {
        const entry = req.body.entry || [];

        for (const item of entry) {
            for (const change of item.changes || []) {
                const messages = change.value.messages || [];

                for (const message of messages) {
                    if (message.type !== "text") continue;

                    const from = message.from;
                    const text = message.text.body;

                    console.log(`Mensaje de ${from}: ${text}`);

                    const response = generateResponse(text);

                    await axios.post(
                        `https://graph.facebook.com/${API_VERSION}/${PHONE_ID}/messages`,
                        {
                            messaging_product: "whatsapp",
                            recipient_type: "individual",
                            to: from,
                            type: "text",
                            text: {
                                body: response
                            }
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${TOKEN}`,
                                "Content-Type": "application/json"
                            }
                        }
                    );
                }
            }
        }
    } catch (error) {
        console.error(
            "Error enviando mensaje:",
            error.response?.data || error.message
        );
    }
});

module.exports = router;
