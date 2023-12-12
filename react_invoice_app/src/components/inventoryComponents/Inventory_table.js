import React, { useState, useEffect } from 'react';

export function MyTable() {
  const [data, setData] = useState([]);
  console.log('data', data);
  useEffect(() => {
    // Fetch data from your API or data source
    // For demonstration purposes, we'll use a mock API endpoint
    fetch('http://127.0.0.1:5000/fetch_all_inventory_data')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []); // The empty dependency array ensures the effect runs only once

  return (
    <div>
      <h3>Inventory Status</h3>
      <table className="table" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Item Name</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>HSN Code</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Supplier Name</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Price</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Quantity</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>GST Amount</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>GST Percent</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.id}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.item_name}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.hsn_code}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.supplier_name}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.price}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.stock_quantity}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.gst_amount}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.gst_percent}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.total_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyTable;
