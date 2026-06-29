import dotenv from "dotenv";
import { Kafka } from "kafkajs";

dotenv.config();

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID,
    brokers: [process.env.KAFKA_BROKER]
});

export const producer = kafka.producer();

export const logsConsumer = kafka.consumer({
    groupId: "logs-group"
});

export const dashboardConsumer = kafka.consumer({
    groupId: "dashboard-group"
});

export const loginTopic = process.env.LOGIN_TOPIC;

const admin = kafka.admin();

export async function ensureTopicExists(topic) {
    await admin.connect();
    const topics = await admin.listTopics();

    if (!topics.includes(topic)) {
        await admin.createTopics({
            topics: [{ topic, numPartitions: 1, replicationFactor: 1 }]
        });
        console.log(`Topic "${topic}" created`);
    } else {
        console.log(`Topic "${topic}" already exists`);
    }

    await admin.disconnect();
}