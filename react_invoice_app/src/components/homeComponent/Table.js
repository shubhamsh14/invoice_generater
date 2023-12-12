import React, { useState, useEffect } from 'react';

export function MyTable() {
  const [data, setData] = useState([]);
  useEffect(() => {
    // Fetch data from your API or data source
    // For demonstration purposes, we'll use a mock API endpoint
    fetch('http://127.0.0.1:5000/fetch_all_data')
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []); // The empty dependency array ensures the effect runs only once

  return (
    <div>
      <h3>Latest Transections</h3>
      <table className="table" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>ID</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Item Name</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>HSN Code</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Price</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Quantity</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Discount</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Amount</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>GST</th>
            <th style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>Final Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.id}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.item_name}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.hsn_code}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.price}</td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ width: '9%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid black' }}>
                            <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
                              <span>{item.discount_amount}</span>
                              <span className="small ">({item.discount_percent || 0}%)</span>
                            </div>
                          </td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.sub_total}</td>
              <td style={{ width: '9%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid black' }}>
                            <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
                              <span>{item.gst_amount}</span>
                              <span className="small ">({item.gst_percent || 0}%)</span>
                            </div>
                          </td>
              <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{item.sold_price}</td>    
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyTable;
