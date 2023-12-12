import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const products = [
  { name: "TRANSPORTATION", hsnCode: "8704", GST: 18 },
  { name: "STONE CHIPS & DUST SELL", hsnCode: "2517", GST: 5 },
  { name: "FLYASH & FLYASHBRICKS", hsnCode: "6815", GST: 12 },
  { name: "VEHICLE RENTING", hsnCode: "9996", GST: 18 },
];

export function InventoryModal({ showModal, closeModal }) {
  const [formData, setFormData] = useState({
    selectedProduct: '',
    supplierName: '',
    supplierGSTIN: '',
    invoiceNumber: '',
    dateOfIssue: '',
    addStock: '',
    purchasePrice: '',
  });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/add_inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('Inventory details added successfully');
      } else {
        console.error('Failed to add inventory details');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      closeModal(); // Close the modal regardless of success or failure
    }
  };
  
  const editField = () => {
    console.log('Shubham,',formData.selectedProduct,' ',
    formData.supplierName , ' ',
    formData.supplierGSTIN, ' ',
    formData.invoiceNumber, ' ',
    formData.dateOfIssue, ' ',
    formData.addStock, ' ',
    formData.purchasePrice, ' ')
    closeModal(); 
  };
return (
    <>
      <Modal show={showModal} onHide={handleSaveChanges}>
        <Modal.Header closeButton>
          <Modal.Title>Add Item in Inventory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3 mt-4 row align-items-center" controlId="exampleForm.ControlSelect1">
              <Form.Label className="col-sm-4 align-items-center">Select Product</Form.Label>
              <div className="col-sm-8">
                <Form.Select name="selectedProduct" value={formData.selectedProduct} onChange={handleFormChange}>
                  <option>Select a product</option>
                  {products.map((product, pIndex) => (
                    <option key={pIndex}>
                      {product.name}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>

            {/* Other form groups */}
            
            <Form.Group className="mb-3 mt-4 row align-items-center" controlId="exampleForm.ControlInput2">
              <Form.Label className="col-sm-4 align-items-center">Supplier Name</Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="name"
                  placeholder="Supplier Name"
                  name="supplierName"
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3 mt-4 row align-items-center" controlId="exampleForm.ControlInput3">
              <Form.Label className="col-sm-4 align-items-center">Supplier GSTIN</Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="name"
                  placeholder="Supplier GST Number"
                  name="supplierGSTIN" 
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3 mt-4 row align-items-center" controlId="exampleForm.ControlInput4">
              <Form.Label className="col-sm-4 align-items-center">Invoice No.</Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="number"
                  placeholder="Invoice Number"
                  name="invoiceNumber"
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <div className="form-group row align-items-center">
                <label className="col-sm-4 align-items-center"> Invoice Date</label>
                <div className="col-sm-8 col-md-9, col-lg-7">
                  <Form.Control
                    type="date"
                    name="dateOfIssue"
                    onChange={handleFormChange}
                    required="required"
                  />
                </div>
              </div>
            </Form.Group>

            <Form.Group className="mb-3 mt-4 row align-items-center" controlId="exampleForm.ControlInput6">
              <Form.Label className="col-sm-4 align-items-center">Add Stock</Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="number"
                  placeholder="Add Stock"
                  name="addStock"
                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3 mt-4 row align-items-center" controlId="exampleForm.ControlInput7">
              <Form.Label className="col-sm-4 align-items-center">Purchase Price</Form.Label>
              <div className="col-sm-8">
                <Form.Control
                  type="number"
                  placeholder="Purchase Price"
                  name="purchasePrice"

                  onChange={handleFormChange}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>

          <Button variant="secondary" onClick={editField}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
