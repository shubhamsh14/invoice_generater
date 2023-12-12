import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LineChart from '../generateInvoiceComponent/Test'
import { HiOutlineReceiptTax } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { useEffect } from 'react';
import LeftPane from '../single_components/Left_Pane';
import PageHeader from '../single_components/header';

const ReportsHome = () => {
  let navigate = useNavigate();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButton1Clicked, setIsButton1Clicked] = useState(false);
  const [isButton2Clicked, setIsButton2Clicked] = useState(false);
  const [isButton3Clicked, setIsButton3Clicked] = useState(false);
  const [isButton4Clicked, setIsButton4Clicked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authenticated") === "false") {
      // Redirect to the home page
      console.log('o', localStorage.getItem("authenticated"))
      navigate("/");
    } else {
      console.log('in', localStorage.getItem("authenticated"))
    }
  }, [navigate]);

  const onGST1ReportClick = () => {
    console.log('Go GST 1R')
    setIsButtonClicked(true)
    navigate("/GST1Report")

  }
  const onGST2ReportClick = () => {
    console.log('Go GST 1R')
    setIsButton1Clicked(true)
    navigate("/GST2Report")
  }
  const onGST3ReportClick = () => {
    console.log('Go GST 1R')
    setIsButton2Clicked(true)
    navigate("/GST2Report")
  }
  const onGSTSReportClick = () => {
    console.log('Go GST 1R')
    setIsButton3Clicked(true)
    navigate("/GSTSales")
  }
  const onGSTPReportClick = () => {
    console.log('Go GST 1R')
    setIsButton4Clicked(true)
    navigate("/GSTPurchase")
  }

  return (
    <Row>
      <Col md={4} lg={3}> <LeftPane /> </Col>
      <Col md={8} lg={9}>
        <PageHeader pageName='Reports' />
        <Row>
          {/* First Card - Takes up 50% of the screen */}
          <Col md={6}>
            <Card className="custom-card">
              <Card.Header className="custom-header" style={{ fontSize: 20 }} >
                <TbReport style={{ fontSize: '1.25em', marginLeft: '2px', marginRight: '5px', alignItems: 'center' }} />
                Sales Report </Card.Header>
              <Card.Body>
                <LineChart />
              </Card.Body>
            </Card>
          </Col>

          {/* Second Card - Takes up 50% of the screen */}
          <Col md={6}>
            <Card className="custom-card">
              <Card.Header className="custom-header" style={{ fontSize: 20 }} >
                <HiOutlineReceiptTax style={{ fontSize: '1.25em', marginLeft: '2px', marginRight: '5px', alignItems: 'center' }} />
                GST </Card.Header>
              <Card.Body>
                <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0 d-flex justify-content-between align-items-center mb-3"
                  style={{

                    fontSize: 18,
                    width: '100%',
                    color: 'black',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    border: '1px solid grey'
                  }}
                  onClick={onGST1ReportClick}>
                  <span>
                    GSTR-1 (Sales)
                  </span>
                </Button>
                <Button variant="outline-primary"
                  type="submit"
                  className="d-flex justify-content-between align-items-center mb-3 d-block w-100 mt-3 mt-md-0"
                  style={{
                    blockSize: '10%',
                    fontSize: 18,
                    width: '100%',
                    color: 'black',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    border: '1px solid grey',
                    transition: 'backgroundColor 0.3s ease'
                  }}
                  onClick={onGST1ReportClick}>
                  <span>
                    GSTR-1 (Sales)
                  </span>
                </Button>
                <Button variant="outline-primary"
                  type="submit"
                  className="d-flex justify-content-between align-items-center mb-3"
                  style={{
                    blockSize: '10%',
                    fontSize: 18,
                    width: '100%',
                    color: 'black',
                    backgroundColor: isButton1Clicked ? '#d7e6f5' : 'white',
                    alignItems: 'center',
                    border: '1px solid grey',
                    transition: 'border-color 0.3s ease'
                  }}
                  onClick={onGST2ReportClick}>
                  <span>
                    GSTR-2 (Purchase)
                  </span>
                </Button>
                <Button variant="primary"
                  type="submit"
                  className="d-flex justify-content-between align-items-center mb-3"
                  style={{
                    blockSize: '10%',
                    fontSize: 18,
                    width: '100%',
                    color: 'black',
                    backgroundColor: isButton2Clicked ? '#d7e6f5' : 'white',
                    alignItems: 'center',
                    border: '1px solid grey',
                    transition: 'backgroundColor 0.3s ease'
                  }}
                  onClick={onGST3ReportClick}>
                  <span>
                    GSTR-3b
                  </span>
                </Button>
                <Button variant="primary"
                  type="submit"
                  className="d-flex justify-content-between align-items-center mb-3"
                  style={{
                    blockSize: '10%',
                    fontSize: 18,
                    width: '100%',
                    color: 'black',
                    backgroundColor: isButton3Clicked ? '#d7e6f5' : 'white',
                    alignItems: 'center',
                    border: '1px solid grey',
                    transition: 'backgroundColor 0.3s ease'
                  }}
                  onClick={onGSTSReportClick}>
                  <span>
                    GST Sales (with HSN)
                  </span>
                </Button>
                <Button variant="primary"
                  type="submit"
                  className="d-flex justify-content-between align-items-center mb-3"
                  style={{
                    blockSize: '10%',
                    fontSize: 18,
                    width: '100%',
                    color: 'black',
                    backgroundColor: isButton4Clicked ? '#d7e6f5' : 'white',
                    alignItems: 'center',
                    border: '1px solid grey',
                    transition: 'border-color 0.3s ease'
                  }}
                  onClick={onGSTPReportClick}>
                  <span>
                    GST Purchase (With HSN)
                  </span>
                </Button>
              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ReportsHome;



