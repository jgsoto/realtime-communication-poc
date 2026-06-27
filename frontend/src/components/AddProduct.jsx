import { useState } from "react";

function AddProduct({ addMutation }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !price) {
      alert("Please complete all fields.");
      return;
    }

    addMutation.mutate(
      {
        name,
        price: Number(price),
      },
      {
        onSuccess: () => {
          setName("");
          setPrice("");
        },
      }
    );
  };

  return (
    <>
      <hr />

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button
          type="submit"
          disabled={addMutation.isPending}
        >
          {addMutation.isPending
            ? "Saving..."
            : "Add Product"}
        </button>

      </form>
    </>
  );
}

export default AddProduct;