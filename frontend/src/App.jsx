import { useEffect, useState } from "react";

import socket from "./socket/socket";

import Dashboard from "./components/Dashboard";
import Stats from "./components/Stats";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

import useProducts from "./hooks/useProducts";

function App() {
  const [connected, setConnected] = useState(socket.connected);

  const [lastUpdate, setLastUpdate] = useState(
    new Date().toLocaleTimeString()
  );

  const {
    products,
    isLoading,
    isError,
    addMutation,
    deleteMutation,
    refreshProducts,
  } = useProducts();

  useEffect(() => {
    const handleConnect = () => {
      setConnected(true);
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    const handleRefresh = () => {
      refreshProducts();
      setLastUpdate(new Date().toLocaleTimeString());
    };

    socket.on("connect", handleConnect);

    socket.on("disconnect", handleDisconnect);

    socket.on("product-added", handleRefresh);

    socket.on("product-deleted", handleRefresh);

    return () => {
      socket.off("connect", handleConnect);

      socket.off("disconnect", handleDisconnect);

      socket.off("product-added", handleRefresh);

      socket.off("product-deleted", handleRefresh);
    };
  }, [refreshProducts]);

  if (isLoading) {
    return (
      <div className="container">
        <h2>Loading products...</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container">
        <h2>Error loading products.</h2>
      </div>
    );
  }

  return (
    <div className="container">

      <Dashboard connected={connected} />

      <Stats
        totalProducts={products.length}
        lastUpdate={lastUpdate}
      />

      <ProductList
        products={products}
        deleteMutation={deleteMutation}
      />

      <AddProduct
        addMutation={addMutation}
      />

    </div>
  );
}

export default App;