import { logsConsumer, loginTopic, ensureTopicExists } from "./config.js";

await ensureTopicExists(loginTopic);

await logsConsumer.connect();

await logsConsumer.subscribe({
    topic: loginTopic,
    fromBeginning: true
});

console.log("Logs Consumer Running");

await logsConsumer.run({
    eachMessage: async ({ message }) => {

        const event = JSON.parse(message.value.toString());

        console.log("------------------------------");
        console.log("LOGIN EVENT");
        console.log(`User: ${event.username}`);
        console.log(`Event: ${event.event}`);
        console.log(`Time: ${event.timestamp}`);
        console.log("------------------------------");
    }
});