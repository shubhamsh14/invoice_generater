import React, { useState, useEffect  } from 'react';
import { Line } from 'react-chartjs-2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DateSelector from '../single_components/DateSelector'
import ChartTypeSelector from '../single_components/ChartTypeSelector'

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
    TimeScale,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
  );

function getRandomData(length, min, max) {
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min) + min));
  }
  
  
function getLabels(dateRange, type) {
  const [start, end] = dateRange;
  const labels = [];
  let date = new Date(start);

  while (date <= end) {
    labels.push(date.toDateString());
    if (type === 'weekly') {
      date = new Date(date.setDate(date.getDate() + 6)); // Move to the next week
    } else {
      date = new Date(date.setDate(date.getDate() + 1)); // Move to the next day
    }
  }

  return labels;
}

  
function generateSampleData(dateRange, type) {
  const labels = getLabels(dateRange, type);
  const data = getRandomData(labels.length, 50, 100);
  return {
    labels: labels,
    datasets: [
      {
        label: 'Sample Data',
        data: data,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(75, 192, 192, 1)',
        pointBorderColor: 'rgba(75, 192, 192, 1)',
        
      },
    ],
  };
}




function LineChart() {
  const [dateRange, setDateRange] = useState([new Date('2023-01-01'), new Date('2023-01-31')]);
  const [startDate, setStartDate] = useState(dateRange[0]);
  const [endDate, setEndDate] = useState(dateRange[1]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('weekly');
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Generate initial sample data
    const initialData = generateSampleData(dateRange, selectedProduct);
    setChartData(initialData);
  }, [dateRange, selectedProduct]);

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: selectedProduct === 'weekly' ? 'week' : 'day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales',
        },
      },
    },
  };
  
   
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setDateRange(dates)
    setStartDate(start);
    setEndDate(end);
    setShowCalendar(false);

  };

  const products = [
    { name: 'Weekly' },
    { name: 'Daily' },
    // Add more products and their HSN codes
  ];

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  console.log(' S ', startDate, ' E ', endDate);
  console.log('select', selectedProduct)
  return (
    <div className="container-fluid">
      <Row>    
      <Col md={9} lg={9}>
        <DateSelector
          startDate={startDate}
          endDate={endDate}
          handleDateChange={handleDateChange}
          showCalendar={showCalendar}
          toggleCalendar={toggleCalendar}
        />
      </Col>
      <Col md={3} lg={3}>
        <ChartTypeSelector
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          products={products}
        />
      </Col>
      </Row>  
      <Row>
        {chartData && <Line data={chartData}  options={options} />}
      </Row>
      </div>
  );
}

export default LineChart;
