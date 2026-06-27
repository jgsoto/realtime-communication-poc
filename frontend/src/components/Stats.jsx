function Stats({ totalProducts, lastUpdate }) {
  return (
    <div className="stats">

      <div className="card">

        <h3>Total Products</h3>

        <p>{totalProducts}</p>

      </div>

      <div className="card">

        <h3>Last Update</h3>

        <p>{lastUpdate}</p>

      </div>

    </div>
  );
}

export default Stats;