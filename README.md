# Real-Time Communication POC

A proof-of-concept project demonstrating **real-time event streaming** using **Apache Kafka** and **MQTT** (Mosquitto) within a Dockerized infrastructure. This lab showcases two foundational patterns of real-time communication: enterprise event streaming (Kafka) and lightweight IoT messaging (MQTT).

---

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
  - [1. Start Infrastructure](#1-start-infrastructure)
  - [2. Kafka Lab — Login Event Streaming](#2-kafka-lab--login-event-streaming)
  - [3. MQTT Lab — Temperature Sensor Monitoring](#3-mqtt-lab--temperature-sensor-monitoring)
- [Expected Output](#expected-output)
  - [Kafka — Consumer Logs](#kafka--consumer-logs)
  - [Kafka — Consumer Dashboard](#kafka--consumer-dashboard)
  - [MQTT — Sensor](#mqtt--sensor)
  - [MQTT — Subscriber](#mqtt--subscriber)
- [Architecture](#architecture)
- [Key Concepts](#key-concepts)

---

## Overview

This project is a hands-on lab that explores two distinct approaches to real-time communication:

1. **Apache Kafka** — An enterprise-grade distributed event streaming platform. In this lab, a producer simulates user login events, and two independent consumer groups process those events in parallel: one for logging and one for a live dashboard.

2. **MQTT (Mosquitto)** — A lightweight publish/subscribe messaging protocol designed for IoT. In this lab, a simulated sensor publishes temperature readings every 2 seconds, and a subscriber displays a real-time monitoring dashboard with threshold-based alerts.

Both services run as Docker containers, orchestrated via a single `docker-compose.yml` file.

---

## Technologies

| Technology | Version | Purpose |
|---|---|---|
| [Node.js](https://nodejs.org/) | v24+ | Runtime environment |
| [Apache Kafka](https://kafka.apache.org/) | latest (KRaft mode) | Distributed event streaming |
| [KafkaJS](https://kafka.js.org/) | ^2.2.4 | Node.js client for Kafka |
| [Eclipse Mosquitto](https://mosquitto.org/) | 2.x | MQTT message broker |
| [mqtt.js](https://github.com/mqttjs/MQTT.js) | ^5.15.1 | Node.js client for MQTT |
| [Docker Compose](https://docs.docker.com/compose/) | v2+ | Container orchestration |
| [dotenv](https://github.com/motdotla/dotenv) | ^17.4.2 | Environment variable management |

---

## Project Structure

```
realtime-communication-poc/
├── docker/
│   └── docker-compose.yml          # Kafka + Mosquitto container definitions
├── kafka/
│   ├── config.js                   # KafkaJS client setup, producer, consumers, and Admin API helper
│   ├── producer.js                 # Interactive producer — sends login events
│   ├── consumer-logs.js            # Consumer (logs-group) — displays formatted login events
│   └── consumer-dashboard.js       # Consumer (dashboard-group) — live dashboard with login counter
├── mqtt/
│   ├── config.js                   # MQTT client setup and topic configuration
│   ├── sensor.js                   # Simulated temperature sensor — publishes readings every 2s
│   └── subscriber.js               # Subscriber — real-time temperature dashboard with alerts
├── .env                            # Environment variables (not committed)
├── .env.example                    # Template for environment variables
├── .gitignore
├── package.json
└── README.md
```

---

## Prerequisites

- **Node.js** v24 or higher
- **Docker** and **Docker Compose** (Docker Desktop recommended for Windows/macOS)
- A terminal (PowerShell, Bash, or Zsh)

---

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/jgsoto/realtime-communication-poc.git
cd realtime-communication-poc
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create your `.env` file from the template:**

```bash
cp .env.example .env
```

> The `.env.example` file contains all required environment variables with sensible defaults. Modify values only if you change the default Docker infrastructure ports.

---

## Configuration

All configuration is managed through environment variables in the `.env` file:

| Variable | Description | Default |
|---|---|---|
| `MQTT_HOST` | MQTT broker hostname | `localhost` |
| `MQTT_PORT` | MQTT broker port | `1883` |
| `TEMPERATURE_TOPIC` | MQTT topic for temperature data | `building/floor1/temperature` |
| `KAFKA_BROKER` | Kafka broker address | `localhost:9092` |
| `KAFKA_CLIENT_ID` | KafkaJS client identifier | `event-streaming-poc` |
| `LOGIN_TOPIC` | Kafka topic for login events | `user-events` |

---

## Running the Project

### 1. Start Infrastructure

Start Kafka and Mosquitto containers in the background:

```bash
docker compose -f docker/docker-compose.yml up -d
```

Verify containers are running:

```bash
docker ps
```

You should see two containers: `kafka` and `mosquitto`.

---

### 2. Kafka Lab — Login Event Streaming

Open **three separate terminals** and run each command in its own terminal:

**Terminal 1 — Producer** (interactive, type a username and press Enter):

```bash
node kafka/producer.js
```

**Terminal 2 — Consumer Logs** (displays each login event):

```bash
node kafka/consumer-logs.js
```

**Terminal 3 — Consumer Dashboard** (displays a live dashboard with login counter):

```bash
node kafka/consumer-dashboard.js
```

---

### 3. MQTT Lab — Temperature Sensor Monitoring

Open **two separate terminals**:

**Terminal 4 — Subscriber** (start first, waits for messages):

```bash
node mqtt/subscriber.js
```

**Terminal 5 — Sensor** (publishes temperature readings every 2 seconds):

```bash
node mqtt/sensor.js
```

---

## Expected Output

### Kafka — Consumer Logs

Each time you type a username in the producer, the logs consumer displays:

```
LOGIN EVENT
------------------------------
User: juan
Event: LOGIN
Time: 2026-06-29T07:28:29.226Z
------------------------------
```

### Kafka — Consumer Dashboard

The dashboard consumer maintains a running total and refreshes the display:

```
SMART MONITORING CENTER
========================
Last User: juan
Last Event: LOGIN
Total Logins: 3
Last Update: 2026-06-29T07:30:15.100Z
```

### MQTT — Sensor

The sensor publishes a reading every 2 seconds:

```
Sensor connected
Published: {"value":24.5,"unit":"°C","timestamp":"2026-06-29T07:31:00.000Z"}
Published: {"value":31.2,"unit":"°C","timestamp":"2026-06-29T07:31:02.001Z"}
```

### MQTT — Subscriber

The subscriber displays a real-time dashboard with alert status:

```
SMART MONITORING CENTER
========================
Topic: building/floor1/temperature
Temperature: 31.2 °C
Timestamp: 2026-06-29T07:31:02.001Z
Status: ALERT
```

> If the temperature is **≥ 30°C**, the status changes to **ALERT**. Otherwise, it displays **NORMAL**.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Docker (docker-compose)               │
│                                                         │
│  ┌──────────────┐              ┌──────────────────┐     │
│  │ Apache Kafka │              │ Eclipse Mosquitto │     │
│  │  (KRaft)     │              │   (MQTT Broker)   │     │
│  │  :9092       │              │   :1883            │     │
│  └──────┬───────┘              └────────┬──────────┘     │
└─────────┼──────────────────────────────┼────────────────┘
          │                              │
          ▼                              ▼
┌─────────────────────┐     ┌────────────────────────┐
│    Kafka Cluster    │     │     MQTT Cluster       │
│                     │     │                        │
│ ┌─────────────────┐ │     │  ┌──────────────────┐  │
│ │ topic:          │ │     │  │ topic:           │  │
│ │ user-events     │ │     │  │ building/floor1/ │  │
│ │                 │ │     │  │ temperature      │  │
│ │ ┌─────────────┐ │ │     │  └──────────────────┘  │
│ │ │  Producer   │ │ │     │         │              │
│ │ │ (login.js)  │─┼─┤     │  ┌──────┴──────┐      │
│ │ └─────────────┘ │ │     │  │             │      │
│ │       │         │ │     │  ▼             ▼      │
│ │  ┌────┴────┐    │ │     │ ┌────┐    ┌────────┐  │
│ │  ▼         ▼    │ │     │ │Pub │    │Sub     │  │
│ │ Logs    Dash-   │ │     │ │(sens│    │(subscr │  │
│ │Consumer board   │ │     │ │or) │    │iber)   │  │
│ │       Consumer  │ │     │ └────┘    └────────┘  │
│ └─────────────────┘ │     │                        │
└─────────────────────┘     └────────────────────────┘
```

---

## Key Concepts

### Apache Kafka

- **Producer / Consumer pattern** — The producer publishes events to a topic; consumers read from it independently.
- **Consumer Groups** — Two consumer groups (`logs-group` and `dashboard-group`) each receive a full copy of every message, enabling parallel processing with different logic.
- **KRaft Mode** — Kafka runs without ZooKeeper using its built-in Raft consensus protocol for metadata management.
- **Auto Topic Creation** — Topics are created automatically via the KafkaJS Admin API when consumers start.

### MQTT

- **Publish / Subscribe pattern** — The sensor publishes to a topic; subscribers receive messages without the publisher knowing about them.
- **Hierarchical Topics** — MQTT topics support `/`-delimited hierarchies (e.g., `building/floor1/temperature`), enabling scalable topic organization.
- **Lightweight Protocol** — MQTT is designed for constrained environments with minimal overhead, making it ideal for IoT use cases.
- **Threshold Alerts** — The subscriber applies business logic (temperature ≥ 30°C triggers an alert) demonstrating edge-level processing.

---

## License

ISC
