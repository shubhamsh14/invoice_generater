import React from 'react';
import  { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {BiLayout,BiPlusMedical } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MyTable } from './Table'
import LeftPane from '../single_components/Left_Pane';
import PageHeader from '../single_components/header'


const Home = () => {
    let navigate = useNavigate();
    
    useEffect(() => {
      if (localStorage.getItem("authenticated") === "false") {
        // Redirect to the home page
        console.log('o', localStorage.getItem("authenticated"))
        navigate("/");
      } else {
        console.log('in', localStorage.getItem("authenticated"))
      }
    }, [navigate]);
    

    const onAddInventoryTextClick = () => {
        console.log('Go to Inventory') 
        // localStorage.setItem("authenticated", true);
        navigate("/inventory") ; 
        };
    const onGenerateInvoiceClick = () => {
        console.log('Go to GI') 
        // localStorage.setItem("authenticated", true);
        navigate("/invoice-gen") ; 
        };

    return(
     <Row> 
        <Col md={4} lg={3}> <LeftPane /> </Col>
        <Col md={8} lg={9}>
            <PageHeader pageName='Home' />
            <Col className="d-flex justify-content-center  mt-5"> 
              <Button variant="primary" type="submit" className="justify-content-between align-items-center mb-3" style={{ blockSize: '10%',backgroundColor:'#2148c0', fontSize: 24, width: '25%', color: 'white', alignItems:'center' }}
              onClick={onGenerateInvoiceClick}>
                  <span>
                    Generate Invoice
                  </span>
                  <span>
                  <BiLayout style={{ marginLeft: '5px', alignItems:'center'  }} /> {/* Add your right icon */} 
                </span>
              </Button>
            </Col>
            <Col className="d-flex justify-content-center  mt-2">
              <Button variant="primary" type="submit" className="justify-content-between align-items-center mb-3" style={{ blockSize: '5%', fontSize: 14, width: '15%', color: '#2148c0', backgroundColor:'#F7F8F9', alignItems:'center' }}
                  onClick={onAddInventoryTextClick}>
                  <span>
                    <BiPlusMedical style={{ marginRight: '5px', alignItems:'center'  }} /> {/* Add your left icon */} 
                    Add Inventory
                  </span>
              </Button>
            </Col>
            <MyTable />

        </Col>
      </Row>
    );
};

export default Home;