import { mqttClient, temperatureTopic } from "./config.js";

mqttClient.on("connect", () => {
    console.log("Dashboard connected");

    mqttClient.subscribe(temperatureTopic);
});

mqttClient.on("message", (topic, message) => {
    const data = JSON.parse(message.toString());

    console.clear();

    console.log("SMART MONITORING CENTER");
    console.log("========================");
    console.log(`Topic: ${topic}`);
    console.log(`Temperature: ${data.value} ${data.unit}`);
    console.log(`Timestamp: ${data.timestamp}`);

    if (data.value >= 30) {
        console.log("Status: ALERT");
    } else {
        console.log("Status: NORMAL");
    }
});