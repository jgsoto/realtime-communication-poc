import { mqttClient, temperatureTopic } from "./config.js";

mqttClient.on("connect", () => {
    console.log("Sensor connected");

    setInterval(() => {
        const temperature = (20 + Math.random() * 15).toFixed(1);

        const payload = JSON.stringify({
            value: Number(temperature),
            unit: "°C",
            timestamp: new Date().toISOString()
        });

        mqttClient.publish(temperatureTopic, payload);

        console.log(`Published: ${payload}`);
    }, 2000);
});