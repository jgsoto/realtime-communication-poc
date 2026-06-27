function ProductItem({ product, deleteMutation }) {

  const handleDelete = () => {

    const confirmDelete = window.confirm(
      `Delete "${product.name}"?`
    );

    if (!confirmDelete) return;

    deleteMutation.mutate(product.id);

  };

  return (
    <li>

      <div>

        <strong>{product.name}</strong>

        <p>${product.price}</p>

      </div>

      <button
        className="delete-btn"
        onClick={handleDelete}
        disabled={deleteMutation.isPending}
      >
        Delete
      </button>

    </li>
  );
}

export default ProductItem;