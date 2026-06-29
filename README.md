# RabbitMQ + Webhook Proof of Concept

This project demonstrates the integration of RabbitMQ and Webhooks in an event-driven architecture.

## Objective

The objective of this Proof of Concept (PoC) is to demonstrate how asynchronous messaging systems and HTTP callbacks can be integrated to automate processes between distributed systems.

## Technologies

- Node.js
- Express
- RabbitMQ
- Docker
- Axios
- HTML
- JavaScript

## Architecture

```
User
  ↓
Frontend
  ↓
Producer API
  ↓
RabbitMQ Queue
  ↓
Consumer Service
  ↓
Webhook
  ↓
External System
```

## Project Structure

```
frontend/
    index.html
    app.js

producer/
    package.json
    server.js

consumer/
    package.json
    worker.js

webhook-server/
    package.json
    server.js

docker-compose.yml
README.md
```

## Components

### Frontend

Provides a simple user registration form.

### Producer

Receives HTTP requests and publishes messages to RabbitMQ.

### RabbitMQ

Stores messages in a queue and enables asynchronous communication.

### Consumer

Consumes messages from RabbitMQ and processes them.

### Webhook Server

Receives automatic HTTP notifications from the consumer.

---

## Installation

### Start RabbitMQ

```bash
docker compose up -d
```

RabbitMQ Management Console:

```
http://localhost:15672
```

Credentials:

```
username: guest
password: guest
```

---

### Start Producer

```bash
cd producer
node server.js
```

---

### Start Consumer

```bash
cd consumer
node worker.js
```

---

### Start Webhook Server

```bash
cd webhook-server
node server.js
```

---

### Start Frontend

```bash
cd frontend
python -m http.server 5500
```

Open:

```
http://localhost:5500
```

---

## Proof of Concept Workflow

1. The user submits the registration form.
2. The frontend sends a POST request to the Producer.
3. The Producer publishes the message to RabbitMQ.
4. RabbitMQ stores the message in a queue.
5. The Consumer retrieves and processes the message.
6. The Consumer sends a webhook notification.
7. The Webhook Server receives the notification.

---

## Example Message

```json
{
    "name": "John Doe",
    "email": "john@example.com"
}
```

---

## Concepts Demonstrated

### Webhooks

- HTTP Callbacks
- Event-driven notifications
- System integration
- Real-time communication

### RabbitMQ

- Message Queues
- Producers
- Consumers
- Asynchronous processing
- Decoupled architecture

---

## Authors

Messaging Systems Proof of Concept for educational purposes.