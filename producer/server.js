const express = require("express");
const amqp = require("amqplib");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const QUEUE = "user_registration";

let channel;

async function connectRabbitMQ() {
    const connection = await amqp.connect("amqp://guest:guest@localhost:5672");

    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE);

    console.log("Connected to RabbitMQ");
}

app.post("/register", async (req, res) => {

    const message = req.body;

    channel.sendToQueue(
        QUEUE,
        Buffer.from(JSON.stringify(message))
    );

    console.log("Message sent:", message);

    res.json({
        success: true,
        message: "User queued successfully"
    });
});

app.listen(3000, async () => {
    await connectRabbitMQ();

    console.log("Producer running on port 3000");
});