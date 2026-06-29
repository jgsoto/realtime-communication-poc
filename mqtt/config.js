import dotenv from "dotenv";
import mqtt from "mqtt";

dotenv.config();

export const mqttClient = mqtt.connect({
    host: process.env.MQTT_HOST,
    port: Number(process.env.MQTT_PORT)
});

export const temperatureTopic = process.env.TEMPERATURE_TOPIC;