import { dashboardConsumer, loginTopic, ensureTopicExists } from "./config.js";

let totalLogins = 0;

await ensureTopicExists(loginTopic);

await dashboardConsumer.connect();

await dashboardConsumer.subscribe({
    topic: loginTopic,
    fromBeginning: true
});

console.log("Dashboard Consumer Running");

await dashboardConsumer.run({
    eachMessage: async ({ message }) => {

        const event = JSON.parse(message.value.toString());

        totalLogins++;

        console.clear();

        console.log("SMART MONITORING CENTER");
        console.log("========================");
        console.log(`Last User: ${event.username}`);
        console.log(`Last Event: ${event.event}`);
        console.log(`Total Logins: ${totalLogins}`);
        console.log(`Last Update: ${event.timestamp}`);
    }
});