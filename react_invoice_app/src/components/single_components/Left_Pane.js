import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { BiChevronRight, BiLayout, BiSolidReport, BiLogOut } from "react-icons/bi";
import { MdInventory } from "react-icons/md";
import { useNavigate } from "react-router-dom";


const LeftPane = () => {
  let navigate = useNavigate();
  const onAddInventoryTextClick = () => {
    console.log('Go to Inventory')
    // localStorage.setItem("authenticated", true);
    navigate("/inventory");
  };

  const onDashboardClick = () => {
    console.log('Go to Home')
    // localStorage.setItem("authenticated", true);
    navigate("/home");
  };
  const onReportClick = () => {
    console.log('Go to Home')
    // localStorage.setItem("authenticated", true);
    navigate("/reports")
  };

  const onLogoutClick = () => {
    console.log('Logged Out')
    localStorage.setItem("authenticated", false);
    sessionStorage.removeItem('user');
    sessionStorage.clear();
    navigate("/")
  };

  return (
        <Card className="p-1 p-xl-1 my-1 my-xl-1 " style={{ height: '100%', backgroundColor: '#2148c0', alignItems:'center'}}>
        <div className="sticky-top pt-md-3 pt-xl-4 ">
            <Button variant="primary" type="submit" className="justify-content-between align-items-center mb-3" style={{ blockSize: '10%', fontSize: 28, width: '100%', color: 'black', backgroundColor: 'white', alignItems: 'center' }}
              onClick={onDashboardClick}>
              <span>
                <BiLayout style={{ marginRight: '5px', alignItems: 'center' }} /> {/* Add your left icon */}
                Dashboard
              </span>
              <span>
                <BiChevronRight style={{ marginLeft: '5px', alignItems: 'center' }} /> {/* Add your right icon */}
              </span>
            </Button>
            <Button variant="primary" type="submit" className="d-flex justify-content-between align-items-center mb-3" style={{ blockSize: '10%', fontSize: 28, width: '100%', color: 'black', backgroundColor: 'white', alignItems: 'center' }}
              onClick={onAddInventoryTextClick}>
              <span>
                <MdInventory style={{ marginRight: '5px', alignItems: 'center' }} /> {/* Add your left icon */}
                Inventory
              </span>
              <span>
                <BiChevronRight style={{ marginLeft: '5px', alignItems: 'center' }} /> {/* Add your right icon */}
              </span>
            </Button>
            <Button variant="primary" type="submit" className="d-flex justify-content-between align-items-center mb-3" style={{ blockSize: '10%', fontSize: 28, width: '100%', color: 'black', backgroundColor: 'white', alignItems: 'center' }}
              onClick={onReportClick}>
              <span>
                <BiSolidReport style={{ marginRight: '5px', alignItems: 'center' }} /> {/* Add your left icon */}
                Report
              </span>
              <span>
                <BiChevronRight style={{ marginLeft: '5px', alignItems: 'center' }} /> {/* Add your right icon */}
              </span>
            </Button>
            <div style={{ margin: '120%' }}></div>
            <Button variant="primary" type="submit" className="d-flex justify-content-between align-items-center mb-3" style={{ blockSize: '10%', fontSize: 28, width: '100%', color: 'black', backgroundColor: 'white', alignItems: 'center' }}
              onClick={onLogoutClick}>
              <span>
                <BiLogOut style={{ marginRight: '5px', alignItems: 'center' }} /> {/* Add your left icon */}
                Logout
              </span>
            </Button>
          </div>
        </Card>
  );
};

export default LeftPane;



