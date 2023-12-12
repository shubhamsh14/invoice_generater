import React, { useState , useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelector from '../single_components/DateSelector';
// import Card from 'react-bootstrap/Card';
import LeftPane from '../single_components/Left_Pane'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import PageHeader from '../single_components/header'



function GST1Report() {
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
                <PageHeader pageName='GSTR-1 (Sales)' />
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
                            <th rowSpan="2" style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>GSTIN</th>
                            <th rowSpan="2" style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Customer Name</th>
                            <th colSpan="2" style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Place of Supply</th>
                            <th colSpan="3" style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Invoice Details</th>
                            <th rowSpan="2" style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Total Tax %</th>
                            <th rowSpan="2" style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Taxable Value</th>
                            <th colSpan="4" style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Invoice Details</th>
                        </tr>
                        <tr>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>State Code</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>State Name</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Invoice No.</th>
                            <th style={{ border: '2px solid black', width: '100px', padding: '8px', textAlign: 'center' }}>Invoice Date</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Invoice Value</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>CGST</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>SGST</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>IGST</th>
                            <th style={{ border: '2px solid black', padding: '8px', textAlign: 'center' }}>Total Tax</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map((item) => ( */}
                        {/* <tr key={item.id}> */}
                        <tr>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'XXXX'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'Customer 1'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'27'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'MH'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'1'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'28-11-2023'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'12,800'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'18%'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'847.46'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'76.27'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'76.27'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'0'}</td>
                            <td style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>{'152.54'}</td>
                        </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </Col>
        </Row>
    );
}

export default GST1Report;
