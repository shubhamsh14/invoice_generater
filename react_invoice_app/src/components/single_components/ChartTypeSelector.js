import React from 'react';

function ChartTypeSelector({ selectedProduct, setSelectedProduct, products }) {
  return (
    <select
      value={selectedProduct}
      onChange={(e) => setSelectedProduct(e.target.value)}
      style={{
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '8px',
        cursor: 'pointer',
      }}
    >
      {products.map((product, pIndex) => (
        <option key={pIndex} value={product.name}>
          {product.name}
        </option>
      ))}
    </select>
  );
}

export default ChartTypeSelector;
