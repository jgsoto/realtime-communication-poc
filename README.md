# Real-Time Product Dashboard with TanStack Query and Socket.IO

## Overview

This project is a Proof of Concept (PoC) that demonstrates how **TanStack Query** and **Socket.IO** can be integrated to efficiently manage server-side data in a React application.

The application implements a simple real-time product management system where users can retrieve, create, and delete products. Whenever a product is added or removed, all connected clients receive the update instantly without refreshing the page.

The project illustrates modern frontend data management techniques such as query caching, automatic refetching, cache invalidation, and real-time synchronization.

---

## Objectives

- Demonstrate the use of TanStack Query for server-state management.
- Implement data caching and automatic data synchronization.
- Integrate Socket.IO to enable real-time communication.
- Show how cache invalidation updates the user interface automatically.
- Build a simple but functional real-time dashboard.

---

## Technologies

### Frontend

- React
- Vite
- TanStack Query
- Axios
- Socket.IO Client

### Backend

- Node.js
- Express.js
- Socket.IO
- CORS

---

## Project Architecture

```
Frontend (React)
│
├── TanStack Query
│      │
│      ├── Cache
│      ├── Queries
│      └── Mutations
│
├── Socket.IO Client
│
└── Components
       │
       ├── Dashboard
       ├── Product List
       ├── Add Product
       └── Statistics

                │

REST API + WebSocket

                │

Backend (Express)

        │
        ├── GET /products
        ├── POST /products
        └── DELETE /products/:id
```

---

## Features

- Retrieve products from a REST API.
- Store server data in TanStack Query cache.
- Automatically refetch updated data.
- Add new products.
- Delete existing products.
- Real-time synchronization using Socket.IO.
- Automatic cache invalidation.
- Connection status indicator.
- Dashboard statistics.

---

## Installation

### Clone the repository

```bash
git clone https://github.com/jgsoto/realtime-communication-poc.git
```

---

### Backend

```bash
cd backend

npm install

npm run dev
```

Runs on:

```
http://localhost:3000
```

---

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## API Endpoints

### Get Products

```
GET /products
```

Returns the list of products.

---

### Add Product

```
POST /products
```

Request Body

```json
{
  "name": "Monitor",
  "price": 350
}
```

---

### Delete Product

```
DELETE /products/:id
```

Deletes the selected product.

---

## Real-Time Workflow

```
User adds a product
        │
        ▼
POST /products
        │
        ▼
Express stores product
        │
        ▼
Socket.IO emits "product-added"
        │
        ▼
Frontend receives event
        │
        ▼
TanStack Query invalidates cache
        │
        ▼
Automatic refetch
        │
        ▼
Updated dashboard
```

The same process occurs when a product is deleted.

---

## Learning Outcomes

This project demonstrates:

- Server-state management
- Data caching
- Query invalidation
- Automatic refetching
- REST API integration
- Real-time communication
- Modern React architecture
