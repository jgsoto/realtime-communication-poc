const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
  },
  {
    id: 2,
    name: "Keyboard",
    price: 80,
  },
  {
    id: 3,
    name: "Mouse",
    price: 35,
  },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const { name, price } = req.body;

  const newProduct = {
    id: Date.now(),
    name,
    price,
  };

  products.push(newProduct);

  io.emit("product-added", newProduct);

  res.status(201).json(newProduct);
});

app.delete("/products/:id", (req, res) => {

  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  products = products.filter((p) => p.id !== id);

  io.emit("product-deleted", id);

  res.json({
    message: "Product deleted successfully",
  });

});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});