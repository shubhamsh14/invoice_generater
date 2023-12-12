import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelector from '../../single_components/DateSelector';
import ChartTypeSelector from '../../single_components/ChartTypeSelector';
import { BiCalendar } from 'react-icons/bi';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

function getRandomData(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min) + min));
  }
  
  
  
function getLabels(dateRange, type) {
    const [start, end] = dateRange;
    const labels = [];
    let date = start;

    while (date <= end) {
        labels.push(date.toDateString());
        date = new Date(date.setDate(date.getDate() + (type === 'weekly' ? 7 : 1)));
    }

    return labels;
    }

function LineChart() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setShowCalendar(false);
    console.log(' S ', start, ' E ', end);
  };

  const products = [
    { name: 'Weekly' },
    { name: 'Daily' },
    // Add more products and their HSN codes
  ];

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const data = {
    labels: getLabels(dateRange, selectedProduct),
    datasets: [
      {
        label: 'Sample Data',
        data: getRandomData(getLabels(dateRange, selectedProduct).length, 50, 100),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  return (
    <Row>
      <Col md={1} lg={3}></Col>
      <Col md={4} lg={3}>
        <DateSelector
          startDate={startDate}
          endDate={endDate}
          handleDateChange={handleDateChange}
          showCalendar={showCalendar}
          toggleCalendar={toggleCalendar}
        />
      </Col>
      <Col md={1} lg={1}></Col>
      <Col md={2} lg={2}>
        <ChartTypeSelector
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          products={products}
        />
      </Col>
      <Col md={4} lg={3}></Col>
      <Row>
        <Line data={data} />
      </Row>
    </Row>
  );
}

export default LineChart;
