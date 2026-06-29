import readline from "readline";
import { producer, loginTopic } from "./config.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

await producer.connect();

console.log("Login Event Producer");

function sendEvent() {
    rl.question("Username: ", async (username) => {

        const event = {
            username,
            event: "LOGIN",
            timestamp: new Date().toISOString()
        };

        await producer.send({
            topic: loginTopic,
            messages: [
                {
                    value: JSON.stringify(event)
                }
            ]
        });

        console.log("Event published");

        sendEvent();
    });
}

sendEvent();