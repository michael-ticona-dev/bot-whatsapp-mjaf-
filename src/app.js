
require("dotenv").config();

const express = require("express");
const whatsappRouter = require("./routes/whatsapp");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        name: "mjaf-bot",
        status: "online",
        message: "MJAF Bot está funcionando"
    });
});

app.use("/webhook", whatsappRouter);

app.listen(PORT, "0.0.0.0", () => {
    console.log(`MJAF Bot ejecutándose en puerto ${PORT}`);
});
