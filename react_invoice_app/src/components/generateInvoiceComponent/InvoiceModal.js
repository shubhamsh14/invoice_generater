import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'



function amountToWords(amount) {
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const convertLessThanOneThousand = (number) => {
    let words = '';

    if (number % 100 < 10) {
      words = units[number % 100];
    } else if (number % 100 < 20) {
      words = teens[number % 10];
    } else {
      words = units[Math.floor(number % 100 / 10)] + ' ' + units[number % 10];
    }

    if (number >= 100) {
      words = units[Math.floor(number / 100)] + ' Hundred ' + words;
    }

    return words;
  };

  const convertDecimals = (decimalPart) => {
    const decimalWords = convertLessThanOneThousand(decimalPart);
    return decimalWords ? ` and ${decimalWords} Paise` : '';
  };

  if (amount === 0) {
    return 'Zero';
  }

  let words = '';

  if (amount < 0) {
    words += 'Negative ';
    amount = Math.abs(amount);
  }

  var integerPart = Math.floor(amount);
  var decimalPart = Math.round((amount - integerPart) * 100);

  if (Math.floor(integerPart / 10000000) > 0) {
    words += convertLessThanOneThousand(Math.floor(integerPart / 10000000)) + ' Crore ';
    integerPart %= 10000000;
  }

  if (Math.floor(integerPart / 100000) > 0) {
    words += convertLessThanOneThousand(Math.floor(integerPart / 100000)) + ' Lakh ';
    integerPart %= 100000;
  }

  if (Math.floor(integerPart / 1000) > 0) {
    words += convertLessThanOneThousand(Math.floor(integerPart / 1000)) + ' Thousand ';
    integerPart %= 1000;
  }

  words += convertLessThanOneThousand(integerPart);

  words += convertDecimals(decimalPart);

  return words.trim();
}

class InvoiceModal extends React.Component {
  constructor(props) {
    super(props);
  }
  closeModel = () => {
    // Add any additional cleanup or actions you want to perform before closing the modal
    this.props.closeModal();
  };

  updateDatabase = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/add_invoice_data', {
        method: 'POST', // or 'PUT' or 'PATCH' depending on your server implementation
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: this.props.items,
          billTo: this.props.info.billTo,
          billToEmail: this.props.info.billToEmail,
          billToAddress:this.props.info.billToAddress,
          billToCustomerType:this.props.info.customerType,
          billToType:this.props.info.billType,
          total:this.props.info.total,
          taxAmount:this.props.info.taxAmount,
          subTotal:this.props.info.subTotal
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update database');
      }
  
      console.log('Database updated successfully');
    } catch (error) {
      console.error('Error updating database:', error.message);
    }
  }
  

  GenerateInvoice = async () => {
    await this.updateDatabase();
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, ''); // Generate timestamp without special characters
  
    html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // Use JPEG format with maximum quality
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [612, 792]
      });
  
      // Set scale factor and add image to PDF
      pdf.internal.scaleFactor = 1;
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
  
      // Save the PDF with a dynamic name based on the timestamp
      pdf.save(`Invoice-${timestamp}.pdf`);
    });
  }
  render() {
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
          <div id="invoiceCapture" >
            <h4 style={{ textAlign: 'center' ,verticalAlign: 'middle'}} className="w-100 p-0" > Tax Invoice </h4>
            <Modal.Body>

              <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-0">
                <div className="w-100 p-1">
                  <h4 className="fw-bold mb-1">{this.props.info.billFrom}</h4>
                  <h8 className="fw-bold text-secondary mb-1">{this.props.info.billFromEmail}</h8>
                  <h6 className="fw-bold text-secondary mb-1">
                    GSTIN: {'XXXX'}
                  </h6>
                  <h6 className="fw-bold text-secondary mb-1">
                    Invoice No.: {this.props.info.invoiceNumber || ''}
                  </h6>
                  <h6 className="fw-bold text-secondary mb-1">
                    Invoice Date.: {this.props.info.dateOfIssue || ''}
                  </h6>
                </div>
                <div className="text-end ms-6 p-3">
                  <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                  <h5 className="fw-bold text-secondary"> {this.props.currency} {this.props.total}</h5>
                  <h7 className="fw-bold text-secondary"> Customer&nbsp;Type: {this.props.info.customerType}</h7>
                  <h7 className="fw-bold text-secondary"> Bill&nbsp;Type: {this.props.info.billType}</h7>
                </div>
              </div>
              <div className="p-2">
                <Row className="mb-2">
                  <Col md={6} lg={6}>
                    <div className="fw-bold">Billed to:</div>
                    <div>{this.props.info.billTo || ''}</div>
                    <div>{this.props.info.billToAddress || ''}</div>
                    <div>{this.props.info.billToEmail || ''}</div>
                  </Col>
                  <Col md={6} lg={6}>
                    <div className="fw-bold">Billed From:</div>
                    <div>{this.props.info.billFrom || ''}</div>
                    <div>{this.props.info.billFromAddress || ''}</div>
                    <div>{this.props.info.billFromMobile  || ''}</div>
                  </Col>
                </Row>
                <Table style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }} >
                  <thead>
                    <tr>
                      <th style={{ width: '12%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>Sr No.</th>
                      <th style={{ width: '32', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>ITEM</th>
                      <th style={{ width: '5%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>HSN</th>
                      <th style={{ width: '5%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>QTY</th>
                      <th style={{ width: '10%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>PRICE/RATE</th>
                      <th style={{ width: '9%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>DISCOUNT </th>
                      <th style={{ width: '9%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }} >GST</th>
                      <th style={{ width: '20%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.items.map((item, i) => {
                      return (
                        <tr id={i} key={i}>
                          <td style={{ width: '12%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>
                            {i + 1}
                          </td>
                          <td style={{ width: '32%', textAlign: 'left', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>
                            {item.name}
                          </td>
                          <td style={{ width: '9%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>
                            {item.hsnCode}
                          </td>
                          <td style={{ width: '9%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>
                            {item.quantity}
                          </td>

                          <td style={{ width: '9%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>
                            {this.props.currency} {item.price}</td>

                          <td style={{ width: '9%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>
                            <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
                              <span>{item.discountForSelectedItem}</span>
                              <span className="small ">({item.discount || 0}%)</span>
                            </div>
                          </td>
                          <td style={{ width: '9%', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>
                            <div style={{ alignContent: 'center', display: 'flex', flexDirection: 'column' }}>
                              <span>{item.gstForSelectedItem}</span>
                              <span className="small ">({item.gstRate || 0}%)</span>
                            </div>
                          </td>

                          <td style={{ width: '9%', textAlign: 'right', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>
                            {this.props.currency} {item.discountedAmountForSelectedItem}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td style={{ width: '12%', textAlign: 'center', verticalAlign: 'middle' }}></td>
                      <td style={{ width: '32', textAlign: 'center', verticalAlign: 'middle' }}></td>
                      <td style={{ width: '5%', textAlign: 'center', verticalAlign: 'middle' }}></td>
                      <td style={{ width: '5%', textAlign: 'center', verticalAlign: 'middle' }}></td>
                      <td style={{ width: '10%', backgroundColor: '#f8f9fa', textAlign: 'right', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>SUBTOTAL</td>
                      <td style={{ width: '9%', backgroundColor: '#f8f9fa', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}> {this.props.discountAmount} </td>
                      <td style={{ width: '9%', backgroundColor: '#f8f9fa', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }} >{this.props.taxAmount}</td>
                      <td style={{ width: '20%', backgroundColor: '#f8f9fa', textAlign: 'center', verticalAlign: 'middle', border: '1px solid #dee2e6' }}>  {this.props.subTotal}</td>
                    </tr>
                  </tfoot>
                </Table>
                <Row>
                  <Col sm={6} md={6} lg={6} className="p-2">
                    <div>
                      <h5 className="fw-bold">TERMS AND CONDITIONS</h5>
                      <ol>
                        <li>Goods once sold will not be taken back or exchanged</li>
                        <li>All disputes are subject to Pune jurisdiction only</li>
                      </ol>
                    </div>
                  </Col>
                  <Col sm={6} md={6} lg={6} className="p-2">
                    <div className="d-flex flex-row align-items-start justify-content-between mb-1">
                      <span className="fw-bold">Taxable amount:</span>
                      <span>{this.props.currency} {this.props.subTotal}</span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-1 mb-1">
                      <span className="fw-bold">CGST:</span>
                      <span>{this.props.currency} {this.props.taxAmount / 2 || 0}</span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-1 mb-1">
                      <span className="fw-bold">SGST:</span>
                      <span>{this.props.currency} {this.props.taxAmount / 2 || 0}</span>
                    </div>
                    <div className="d-flex flex-row align-items-start justify-content-between mt-1" style={{ fontSize: '1.125rem' }}>
                      <span className="fw-bold">Total:</span>
                      <span className="fw-bold">{this.props.currency} {this.props.total || 0}</span>
                    </div>
                  </Col>
                  <Col className="p-2">
                    <div className="py-1 px-1 rounded">
                      <Table border="0"> {/* Added border="0" to hide borders */}
                        <thead>
                            <th style={{ width: '75%', fontSize: '10pt', textAlign: 'left', verticalAlign: 'middle' }}>Total (in words)</th>
                            <th style={{ width: '25%', fontSize: '10pt', textAlign: 'center', verticalAlign: 'middle' }}>For R. K. ENTERPRISES</th>
                        </thead>
                        <tbody>
                            <td style={{ width: '75%', textAlign: 'left', verticalAlign: 'middle' }}>{amountToWords(this.props.total)} Only </td>
                            <td style={{ width: '25', textAlign: 'center', verticalAlign: 'middle' }}></td>


                        </tbody>
                        <tfoot>
                            <th style={{ width: '75%', fontSize: '8pt', textAlign: 'center', verticalAlign: 'middle' }}></th>
                            <th style={{ width: '25%', fontSize: '8pt', textAlign: 'center', verticalAlign: 'middle' }}>Authorised Signatory</th>
                        </tfoot>
                      </Table>
                    </div>
                  </Col>
                </Row>

              </div>
              {this.props.info.notes &&
                <div className="bg-light py-1 px-1 rounded">
                  <span className="fw-bold"> Notes: </span>
                  {this.props.info.notes}
                </div>}
              <h6 style={{ textAlign: 'center' }} > *This is a Computer Generated Invoice </h6>

            </Modal.Body>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button variant="primary" className="d-block w-100" onClick={this.closeModel}>
                  <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Send Invoice
                </Button>
              </Col>
              <Col md={6}>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={this.GenerateInvoice}>
                  <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                  Download Copy
                </Button>
              </Col>
            </Row>
          </div>
        </Modal >
        <hr className="mt-4 mb-3" />
      </div >
    )
  }
}

export default InvoiceModal;
