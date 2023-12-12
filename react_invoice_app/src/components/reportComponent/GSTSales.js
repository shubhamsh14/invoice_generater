import React, { useState , useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelector from '../single_components/DateSelector';
// import Card from 'react-bootstrap/Card';
import LeftPane from '../single_components/Left_Pane'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import PageHeader from '../single_components/header'
import { useNavigate } from "react-router-dom";


function GSTSales() {
    let navigate = useNavigate();
    const [dateRange, setDateRange] = useState([new Date(), new Date()]);
    const [startDate, setStartDate] = useState(dateRange[0]);
    const [endDate, setEndDate] = useState(dateRange[1]);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("authenticated") === "false") {
          // Redirect to the home page
          console.log('o', localStorage.getItem("authenticated"))
          navigate("/");
        } else {
          console.log('in', localStorage.getItem("authenticated"))
        }
      }, [navigate]);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setDateRange(dates)
        setStartDate(start);
        setEndDate(end);
        setShowCalendar(false);

    };

    const onFetchReportClick = () => {
        console.log('Go GST 1R')
        setIsButtonClicked(true)

    }
    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };
    return (
        <Row>
            <Col md={4} lg={3}>
                <LeftPane />
            </Col>
            <Col md={8} lg={9}>
                <PageHeader pageName='GST Sales (with HSN)' />
                <Row>
                    <Col md={5} lg={4}>
                        <DateSelector
                            startDate={startDate}
                            endDate={endDate}
                            handleDateChange={handleDateChange}
                            showCalendar={showCalendar}
                            toggleCalendar={toggleCalendar}
                        />
                    </Col>
                    <Col md={3} lg={2}>
                        <Button variant="primary"
                            type="submit"
                            className="d-flex justify-content-between align-items-center mb-3"
                            style={{
                                blockSize: '10%',
                                fontSize: 18,
                                width: '100%',
                                height: '75%',
                                color: 'black',
                                backgroundColor: isButtonClicked ? '#d7e6f5' : 'white',
                                alignItems: 'center',
                                border: '1px solid grey',
                                transition: 'backgroundColor 0.3s ease'
                            }}
                            onClick={onFetchReportClick}>
                            <span>
                                Fetch Report
                            </span>
                        </Button>
                    </Col>
                </Row>
                <div style={{ margin: '2%' }}></div>
                <table border="1">
                    <thead>
                        <tr>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center',width:'100px' }}>Date</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Invoice No.</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Party GSTIN</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Party Name</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Item Name</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>HSN Code</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>QTY</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Price/Unit</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>CGST</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>SGST</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>IGST</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map((item) => ( */}
                        {/* <tr key={item.id}> */}
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'28-11-2023'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'1'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'XXXX XXXX'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'Supplier 1'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'TRANSPORTATION'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'8704'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'10'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'1000'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'90'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'90'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'0'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'10000'}</td>
                        </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </Col>
        </Row>
    );
}

export default GSTSales;
