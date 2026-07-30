import React from "react";

interface LowStockProduct {
  name: string;
  stock: number;
}

interface LowStockTableProps {
  data: LowStockProduct[];
}

const LowStockTable: React.FC<LowStockTableProps> = ({ data }) => {
  return (
    <div className="analytics-card">
      <h3 style={{ marginBottom: "1rem" }}>
        Low Stock Products
      </h3>

      {data.length === 0 ? (
        <p>All products are sufficiently stocked.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Stock</th>
            </tr>
          </thead>

          <tbody>
            {data.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LowStockTable;