const amqp = require("amqplib");
const axios = require("axios");

const QUEUE = "user_registration";

async function startConsumer() {

    const connection = await amqp.connect(
        "amqp://guest:guest@localhost:5672"
    );

    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE);

    console.log("Consumer waiting for messages...\n");

    channel.consume(QUEUE, async (message) => {

        if (!message) return;

        const data = JSON.parse(
            message.content.toString()
        );

        console.log("Message received:");
        console.log(data);

        console.log("\nProcessing...");
        await new Promise(resolve =>
            setTimeout(resolve, 5000)
        );

        console.log("Sending webhook...\n");

        try {

            const response = await axios.post(
                "http://localhost:4000/webhook",
                {
                    event: "USER_REGISTERED",
                    user: data,
                    processedAt: new Date()
                }
            );

            console.log(
                "Webhook sent:",
                response.status
            );

            channel.ack(message);

        } catch (error) {

            console.error(
                "Webhook failed:",
                error.message
            );
        }

    });
}

startConsumer();