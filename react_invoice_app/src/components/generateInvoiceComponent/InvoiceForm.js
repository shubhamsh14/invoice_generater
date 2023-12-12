import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import "./DashboardContainer.css";
import { BiChevronRight, BiLayout, BiSolidReport, BiLogOut } from "react-icons/bi";
import { MdInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import PageHeader from '../single_components/header';

const NavigateWrapper = (Component) => {

  return function WrappedComponent(props) {
    const navigate = useNavigate();
    const handleNavigate = (to) => {
      navigate(to);
    };


    return <Component {...props} navigate={handleNavigate} />;
  };
};

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    const isAuthenticated = localStorage.getItem('authenticated') === 'true' || false;
    this.state = {
      isOpen: false,
      currency: '₹',
      currentDate: '',
      invoiceNumber: 1,
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: 'R. K. ENTERPRISES',
      billFromMobile: '+91 95341 25511',
      billFromEmail: 'anilkumargupta1800@gmail.com',
      billFromAddress: 'CHIANKI, DALTONGANH, PALAMU, JHARKHAND PIN : 822101',
      billType:'',
      customerType:'',
      notes: '',
      discountAmount:0,
      taxAmount: 0,
      total: '0.00',
      subTotal: '0',
      shouldRedirect: false,
      authenticated: isAuthenticated
    };
    this.state.items = [
      {
      id: 1,
      name: '',
      price: 0,
      hsnCode: '',
      quantity: 0,
      discount: 0,
      gstRate: 0,
      itemAmount: 0,
      amountforSelectedItem: 0,
      discountForSelectedItem: 0,
      discountedAmountForSelectedItem: 0,
      gstForSelectedItem: 0,
      subtotalForSelectedItem:0

      }
    ];
    this.editField = this.editField.bind(this);
  }
  componentDidMount(prevProps) {
    this.calculateItemAtribute();
  }
  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
    this.calculateItemAtribute();
  };
  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: '',
      price: 0,
      hsnCode: '',
      quantity: 0,
      discount: 0,
      gstRate: 0,
      itemAmount: 0,
      amountforSelectedItem: 0,
      discountForSelectedItem: 0,
      discountedAmountForSelectedItem: 0,
      gstForSelectedItem: 0,
      subtotalForSelectedItem:0
    }
    this.state.items.push(items);
    this.setState(this.state.items);
  }
  handleCalculateTotal() {
    var items = this.state.items;
    var subTotal = 0;
    var totalDiscount = 0;
    var taxAmount1 = 0;
    var totalAmount = 0;
    console.log(items)
    items.forEach((item) => {
      const itemAmount = parseFloat(item.amountforSelectedItem)
      const discountAmount = parseFloat(item.discountForSelectedItem)
      const discountedItemAmount = parseFloat(item.discountedAmountForSelectedItem)
      const gstAmount = parseFloat(item.gstForSelectedItem)

      subTotal += discountedItemAmount;
      totalDiscount += discountAmount;
      taxAmount1 += gstAmount;
      totalAmount += (discountedItemAmount + gstAmount)

    });

    this.setState({
      subTotal: parseFloat(subTotal).toFixed(2),
      taxAmount: parseFloat(taxAmount1).toFixed(2),
      discountAmount: parseFloat(totalDiscount).toFixed(2),
      total: (totalAmount).toFixed(2),
    });
  }

  calculateItemAtribute() {
    var items = this.state.items;
  
    var updatedItems = items.map((item) => {
      var amountforSelectedItem = parseFloat(item.price) * parseInt(item.quantity);
      var discountForSelectedItem = (amountforSelectedItem * parseFloat(item.discount)) / 100;
      var discountedAmountForSelectedItem = amountforSelectedItem - discountForSelectedItem;
      var gstForSelectedItem = (discountedAmountForSelectedItem * parseFloat(item.gstRate)) / 100;
      var subtotalForSelectedItem = discountedAmountForSelectedItem + gstForSelectedItem;
  
      console.log('1', amountforSelectedItem, ' 2', discountForSelectedItem, '3', discountedAmountForSelectedItem, '4', gstForSelectedItem);
  
          // Use isNaN() to check for NaN and replace it with 0
      amountforSelectedItem = isNaN(amountforSelectedItem) ? 0 : amountforSelectedItem;
      discountForSelectedItem = isNaN(discountForSelectedItem) ? 0 : discountForSelectedItem;
      discountedAmountForSelectedItem = isNaN(discountedAmountForSelectedItem) ? 0 : discountedAmountForSelectedItem;
      gstForSelectedItem = isNaN(gstForSelectedItem) ? 0 : gstForSelectedItem;
      subtotalForSelectedItem = isNaN(subtotalForSelectedItem) ? 0 : subtotalForSelectedItem;


      // Create an updatedItem for each item
      return {
        ...item,
        amountforSelectedItem: amountforSelectedItem,
        discountForSelectedItem: discountForSelectedItem,
        gstForSelectedItem: gstForSelectedItem,
        discountedAmountForSelectedItem: discountedAmountForSelectedItem,
        subtotalForSelectedItem: subtotalForSelectedItem,
      };
    });
  
    // Update the state with the new array of updated items
    this.setState({
      items: updatedItems,
    }, () => {
      // This callback will be executed after the state has been updated
      this.handleCalculateTotal(); // Now call the method that depends on the updated state
    });
  }
  



  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var items = this.state.items.slice();
    var newItems = items.map(function (items) {
      for (var key in items) {
        if (key == item.name && items.id == item.id) {
          items[key] = item.value;
          console.log('X', key, '  ', item.value)
        }
      }
      return items;
    });
    // Calculate the discount amount and include it in the newItems array


    this.setState({ items: newItems });
    this.calculateItemAtribute();
  };
  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.calculateItemAtribute();
  };
  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };

  onRadioButton = (selectedOption) => {
     console.log('Radio Selected', selectedOption)
    this.setState({
      billType: selectedOption
    });
  }

  onButtonClick = (selectedOption) => {
    console.log('Radio Selected1', selectedOption)
    this.setState(
      {customerType: selectedOption});

  }

  onLogoutClick = () => {
    console.log('Go to Home after logout')
    console.log('authenticated', this.state.authenticated)
    localStorage.setItem("authenticated", false);
    // this.setState({
    //   [this.state.authenticated]: 'false'
    // });
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    this.setState({ authenticated: false }, () => {
      localStorage.setItem('authenticated', 'false');
    });
    console.log('authenticated', this.state.authenticated)
  };

  openModal = (event) => {
    event.preventDefault();
    this.calculateItemAtribute();
    this.setState({ isOpen: true });
  };
  closeModal = (event) => this.setState({ isOpen: false });
  render() {
    return (

      <Row>
        <Col md={4} lg={3}>
          <Card className="p-1 p-xl-1 my-1 my-xl-1 " style={{ height: '100%', backgroundColor: '#2148c0', alignItems: 'center' }}>
            <div className="sticky-top pt-md-3 pt-xl-4 ">
              <Button variant="primary" type="submit" className="justify-content-between align-items-center mb-3" style={{ blockSize: '10%', fontSize: 28, width: '100%', color: 'black', backgroundColor: 'white', alignItems: 'center' }}
                onClick={() => this.props.navigate('/home')}>
                <span>
                  <BiLayout style={{ marginRight: '5px', alignItems: 'center' }} /> 
                  Dashboard
                </span>
                <span>
                  <BiChevronRight style={{ marginLeft: '5px', alignItems: 'center' }} /> 
                </span>
              </Button>
              <Button variant="primary" type="submit" className="d-flex justify-content-between align-items-center mb-3" style={{ blockSize: '10%', fontSize: 28, width: '100%', color: 'black', backgroundColor: 'white', alignItems: 'center' }}
                onClick={() => this.props.navigate('/inventory')}>
                <span>
                  <MdInventory style={{ marginRight: '5px', alignItems: 'center' }} /> 
                  Inventory
                </span>
                <span>
                  <BiChevronRight style={{ marginLeft: '5px', alignItems: 'center' }} />
                </span>
              </Button>
              <Button variant="primary" type="submit" className="d-flex justify-content-between align-items-center mb-3" style={{ blockSize: '10%', fontSize: 28, width: '100%', color: 'black', backgroundColor: 'white', alignItems: 'center' }}
                onClick={() => this.props.navigate('/reports')}>
                <span>
                  <BiSolidReport style={{ marginRight: '5px', alignItems: 'center' }} /> 
                  Report
                </span>
                <span>
                  <BiChevronRight style={{ marginLeft: '5px', alignItems: 'center' }} /> 
                </span>
              </Button>
              <div style={{ margin: '110%' }}></div>
              <Button variant="primary" type="submit" className="d-flex justify-content-between align-items-center mb-3" style={{ blockSize: '10%', fontSize: 28, width: '100%', color: 'black', backgroundColor: 'white', alignItems: 'center' }}
                onClick={() => { this.onLogoutClick(); this.props.navigate('/') }}>
                <span>
                  <BiLogOut style={{ marginRight: '5px', alignItems: 'center' }} /> 
                  Logout
                </span>
              </Button>
            </div>
          </Card>
        </Col>
        <Col md={8} lg={9}>
          <PageHeader pageName='Generate Invoice' />
          <Form>
            <Row >
              <Card className="p-2 p-xl-1 my-1 my-xl-1">
                <Row className="p-2 p-xl-1 my-1 my-xl-1">
                  <Col sm={7} md={8} lg={8}>
                    <Form.Label className="fw-bold">Bill to:</Form.Label>
                    <div class="d-flex flex-column ">
                      <div class="form-group row align-items-center">
                        <label class="col-sm-4 col-lg-3 col-form-label" style={{ fontSize: 18, color: 'black', alignItems: 'center' }} >Customer Name</label>
                        <div class="col-sm-6 col-md-6, col-lg-7">
                          <Form.Control placeholder={"Who is this invoice to?"} rows={1} value={this.state.billTo} type="text" name="billTo" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required" />
                        </div>
                      </div>
                      <div class="form-group row align-items-center">
                        <label class="col-sm-4 col-lg-3 col-form-label" style={{ fontSize: 18, color: 'black', alignItems: 'center' }} >Mobile Number</label>
                        <div class="col-sm-6 col-md-6, col-lg-7">
                          <Form.Control placeholder={"Phone Number"} value={this.state.billToEmail} type="tel" name="billToEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="tel" required="required" />
                        </div>
                      </div>
                      <div class="form-group row align-items-center">
                        <label class="col-sm-4 col-lg-3 col-form-label" style={{ fontSize: 18, color: 'black', alignItems: 'center' }} >Address</label>
                        <div class="col-sm-6 col-md-6, col-lg-7">
                          <Form.Control placeholder={"Billing address"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required" />
                        </div>
                      </div>
                      <div class="form-group row align-items-center">
                        <label class="col-sm-4 col-lg-3 col-form-label" style={{ fontSize: 18, color: 'black', alignItems: 'center' }} >Date</label>
                        <div class="col-sm-6 col-md-6, col-lg-7">
                          <Form.Control type="date" value={this.state.dateOfIssue} name={"dateOfIssue"} onChange={(event) => this.editField(event)} style={{
                            maxWidth: '50%'
                          }} required="required" />
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col sm={2} md={2} lg={2}>
                    <div class="d-flex flex-column ">
                      <div class="form-group row align-items-center">
                        <Form.Label className="fw-bold">Bill Type</Form.Label>
                      </div>
                      <div class="col-sm-10">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadiosBillType" id="gridRadiosBillType1" value="option1_Kaccha" checked onChange={() => this.onRadioButton('Kaccha Bill')} />
                          <label class="form-check-label" for="gridRadiosBillType1">
                            Kaccha Bill
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadiosBillType" id="gridRadiosBillType2" value="option2_Pakka" onChange={() => this.onRadioButton('Pakka Bill')} />
                          <label class="form-check-label" for="gridRadiosBillType2">
                            Pakka Bil
                          </label>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col sm={3} md={2} lg={2}>
                    <div class="d-flex flex-column ">
                      <div class="form-group row align-items-center">
                        <Form.Label className="fw-bold">Customer Type</Form.Label>
                      </div>
                      <div class="col-sm-10">
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1_B2B" checked onChange={() => this.onButtonClick('B2B')} />
                          <label class="form-check-label" for="gridRadios1">
                            B2B
                          </label>
                        </div>
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2_B2C" onChange={() => this.onButtonClick('B2C')} />
                          <label class="form-check-label" for="gridRadios2">
                            B2C
                          </label>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items} />


                <Table style={{ marginTop: '5px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                  <thead>
                    <tr>
                      <td style={{ width: '52%', backgroundColor: '#f8f9fa', textAlign: 'center', verticalAlign: 'middle' }}></td>
                      <td style={{ width: '11%', backgroundColor: '#f8f9fa', textAlign: 'center', verticalAlign: 'middle' }}>SUBTOTAL</td>
                      <td style={{ width: '10%', backgroundColor: '#f8f9fa', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>
                        <span>{this.state.currency} {this.state.discountAmount}</span> </td>
                      <td style={{ width: '10%', backgroundColor: '#f8f9fa', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }} >
                        <span>{this.state.currency} {this.state.taxAmount}</span> </td>
                      <td style={{ width: '12%', backgroundColor: '#f8f9fa', textAlign: 'center', verticalAlign: 'middle' }}>
                        <span>{this.state.currency} {this.state.subTotal}</span> </td>
                      <td style={{ width: '5%', backgroundColor: '#f8f9fa', textAlign: 'center', verticalAlign: 'middle' }}></td>
                    </tr>
                  </thead>
                </Table>
                <Row className="mt-4 justify-content-end">
                  <Col lg={6}>
                    <div className="d-flex flex-row align-items-start justify-content-between">
                      <span className="fw-bold">Taxable amount:
                      </span>
                      <span>{this.state.currency}
                        {this.state.subTotal}</span>
                    </div>
                    <hr />
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                      <span className="fw-bold">CGST:</span>
                      <span>
                        {/* <span className="small ">({this.state.discountRate || 0}%)</span> */}
                        {this.state.currency}
                        {this.state.taxAmount/2 || 0}</span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                      <span className="fw-bold">SGST:
                      </span>
                      <span>
                        {/* <span className="small ">({this.state.taxRate || 0}%)</span> */}
                        {this.state.currency}
                        {this.state.taxAmount/2 || 0}</span>
                    </div>
                    <hr />
                    <div className="d-flex flex-row align-items-start justify-content-between" style={{
                      fontSize: '1.125rem'
                    }}>
                      <span className="fw-bold">Total:
                      </span>
                      <span className="fw-bold">{this.state.currency}
                        {this.state.total || 0}</span>
                    </div>
                  </Col>
                </Row>
                <hr className="my-4" />
                <Form.Label className="fw-bold">Notes:</Form.Label>
                <Form.Control placeholder="Thanks for your business!" name="notes" value={this.state.notes} onChange={(event) => this.editField(event)} as="textarea" className="my-2" rows={1} />
              </Card>
            </Row>
            <Row>
              <Button variant="primary" type="submit" className="d-block w-100" onClick={this.openModal}>Review Invoice</Button>
              <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items} currency={this.state.currency} subTotal={this.state.subTotal} taxAmount={this.state.taxAmount} discountAmount={this.state.discountAmount} total={this.state.total} />
            </Row>
          </Form>
        </Col>

      </Row>
      // </div>

    )
  }

}

export default NavigateWrapper(InvoiceForm);
