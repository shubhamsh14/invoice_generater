import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState , useEffect} from "react";
import { BiPlusMedical } from "react-icons/bi";
import { InventoryModal } from './CreateInventory'
import { MyTable } from './Inventory_table'
import LeftPane from '../single_components/Left_Pane';
import { useNavigate } from "react-router-dom";
import PageHeader from '../single_components/header';

const InventoryHome = () => {
  let navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("authenticated") === "false") {
      // Redirect to the home page
      console.log('o', localStorage.getItem("authenticated"))
      navigate("/");
    } else {
      console.log('in', localStorage.getItem("authenticated"))
    }
  }, [navigate]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload()
  };

  return (

    <Row>
      <Col md={4} lg={3}> <LeftPane /> </Col>
      <Col md={8} lg={9}>
        <PageHeader pageName='Inventory' />
        <Col className="d-flex justify-content-center  mt-2">
          <Button variant="primary" type="submit" className="justify-content-between align-items-center mb-3" style={{ blockSize: '5%', fontSize: 14, width: '15%', color: '#2148c0', backgroundColor: '#F7F8F9', alignItems: 'center' }}
            onClick={handleOpenModal}>
            <span>
              <BiPlusMedical style={{ marginRight: '5px', alignItems: 'center' }} /> {/* Add your left icon */}
              Add Inventory
            </span>
          </Button>
          <InventoryModal showModal={showModal} closeModal={handleCloseModal} />
        </Col>
        <MyTable />
      </Col>
    </Row>
  );
};

export default InventoryHome;