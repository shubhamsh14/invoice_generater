import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

const products = [
  { name: "TRANSPORTATION", hsnCode: "8704", GST: 18 },
  { name: "STONE CHIPS & DUST SELL", hsnCode: "2517", GST: 5 },
  { name: "FLYASH & FLYASHBRICKS", hsnCode: "6815", GST: 12 },
  { name: "VEHICLE RENTING", hsnCode: "9996", GST: 18 },
];

const getHsnCodeForProduct = (selectedProduct) => {
  const selectedProductInfo = products.find((product) => product.name === selectedProduct);
  return selectedProductInfo ? selectedProductInfo.hsnCode : '';
};

const getGSTRateForProduct = (selectedProduct) => {
  const selectedProductInfo = products.find((product) => product.name === selectedProduct);
  return selectedProductInfo ? selectedProductInfo.GST : '';
};

class InvoiceItem extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map(function (item) {
      return (
        <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={rowDel.bind(this)} key={item.id} currency={currency} />
      )
    });
    return (
      <div>
        <Table style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }} >
          <thead>
            <tr> 
              <th style={{ width: '30%',  textAlign: 'center', verticalAlign: 'middle'  }}>ITEM</th>
              <th style={{ width: '8%',  textAlign: 'center', verticalAlign: 'middle'  }}>HSN</th>
              <th style={{ width: '8%',  textAlign: 'center', verticalAlign: 'middle'  }}>QTY</th>
              <th style={{ width: '14%',  textAlign: 'center', verticalAlign: 'middle'  }}>PRICE/RATE</th>
              <th style={{ width: '10%',  textAlign: 'center', verticalAlign: 'middle'  }}>DIS %</th>
              <th style={{ width: '5%',  textAlign: 'center', verticalAlign: 'middle'  }}>DISCOUNT </th>
              <th style={{ width: '10%',  textAlign: 'center', verticalAlign: 'middle'  }} >GST</th>
              <th style={{ width: '12%',  textAlign: 'center', verticalAlign: 'middle'  }}>AMOUNT</th>
              <th style={{ width: '8%',  textAlign: 'center', verticalAlign: 'middle'  }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>Add Item</Button>
        
      </div>
    );

  }

}
class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }

  handleProductChange = (event) => {
    const selectedProduct = event.target.value;
    const hsnCode = getHsnCodeForProduct(selectedProduct); // You need to implement this function
    const gstRate = getGSTRateForProduct(selectedProduct)
    // Update state with the selected product and its associated hsnCode
    this.props.onItemizedItemEdit({
      target: {
        id: this.props.item.id,
        name: 'name',
        value: selectedProduct,
      }
    });

    this.props.onItemizedItemEdit({
      target: {
        id: this.props.item.id,
        name: 'hsnCode',
        value: hsnCode,
      }
    });
    this.props.onItemizedItemEdit({
      target: {
        id: this.props.item.id,
        name: 'gstRate',
        value: gstRate,
      }
    });

  };
  render() {
    return (
      <tr>
        <td style={{ width: '30%',  textAlign: 'center', verticalAlign: 'middle'  }}>
          <select
            className="form-control"
            onChange={this.handleProductChange}
            value={this.props.item.name}
          >
            <option>Select a product</option>
            {products.map((product, pIndex) => (
              <option key={pIndex} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </td>
        <td style={{ width: '8%', textAlign: 'center', verticalAlign: 'middle'  }}>
          <span>{this.props.item.hsnCode}  </span> 
        </td>
        <td style={{ width: '8%' , textAlign: 'center', verticalAlign: 'middle' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              type: "number",
              name: "quantity",
              min: 1,
              step: "1",
              value: this.props.item.quantity,
              id: this.props.item.id,
            }} />
        </td>
        <td style={{ width: '14%', textAlign: 'center', verticalAlign: 'middle' }}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
              leading: this.props.currency,
              type: "number",
              name: "price",
              min: 1,
              step: "0.01",
              presicion: 2,
              textAlign: "text-end",
              value: this.props.item.price,
              id: this.props.item.id,
            }} />
        </td>
        <td style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle' }}>
          <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'row' }}>
            <EditableField
              onItemizedItemEdit={this.props.onItemizedItemEdit}
              cellData={{
                type: 'number',
                name: 'discount',
                // min: 0,
                // step: "1",
                // textAlign: 'text-end',
                value: this.props.item.discount,
                id: this.props.item.id,
              }}
              style={{ marginRight: '4px' }}
            />
            <span style={{ fontSize: '1.6em' }}>{'%'}</span>
           </div>
          </td>
          <td style={{ width: '5%' , textAlign: 'center', verticalAlign: 'middle'}}>
            {this.props.item.discountForSelectedItem}
        {/* { <DiscountAmount
            discount={this.props.item.discount}
            price={this.props.item.price}
            quantity={this.props.item.quantity}
          />} */}
        </td> 
        <td style={{ width: '10%' , textAlign: 'center', verticalAlign: 'middle' }}>
          <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
            {/* <span>  {((this.props.item.price * this.props.item.quantity) * (1 - (this.props.item.discount / 100)).toFixed(2)) * (this.props.item.gstRate / 100) || 0} </span> */}
            <span>{this.props.item.gstForSelectedItem}</span>
            <span className="small ">({this.props.item.gstRate || 0}%)</span>
          </div>
        </td>
        <td style={{ width: '12%' , textAlign: 'center', verticalAlign: 'middle' }}>
          {/* <span> {(this.props.item.price * this.props.item.quantity) * (1 - (this.props.item.discount / 100)).toFixed(2) || 0}</span> */}
          <span> {this.props.item.discountedAmountForSelectedItem} </span>
        </td>
        <td className="text-center" style={{ width: '8%' , textAlign: 'center', verticalAlign: 'middle'}}>
          <BiTrash onClick={this.onDelEvent.bind(this)} style={{ height: '33px', width: '33px', padding: '7.5px' }} className="text-white mt-1 btn btn-danger" />
        </td>  
      </tr>
    );

  }

}

export default InvoiceItem;
