const express = require("express");

const app = express();

app.use(express.json());

app.post("/webhook", (req, res) => {

    console.log("\n=== WEBHOOK RECEIVED ===");
    console.log("Timestamp:", new Date().toLocaleString());
    console.log("Data:", req.body);
    console.log("========================\n");

    res.status(200).json({
        success: true,
        message: "Webhook received"
    });
});

app.listen(4000, () => {
    console.log("Webhook server running on port 4000");
});