import ProductItem from "./ProductItem";

function ProductList({ products, deleteMutation }) {

  if (products.length === 0) {
    return (
      <p>No products available.</p>
    );
  }

  return (
    <>

      <h2>Products</h2>

      <ul>

        {products.map((product) => (

          <ProductItem
            key={product.id}
            product={product}
            deleteMutation={deleteMutation}
          />

        ))}

      </ul>

    </>
  );
}

export default ProductList;