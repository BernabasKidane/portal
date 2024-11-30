// File: src/pages/Dashboard.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserPlus, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CDashboard = () => {
  const [customerData, setCustomerData] = useState({
    total: 0,
    new: 0,
    active: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch customer data from the backend
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/followups/stats');
        setCustomerData({
          total: response.data.total,
          new: response.data.new,
          active: response.data.active,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.response ? err.response.data : err.message);
        setError('Failed to fetch customer data');
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);
  

  // Chart data for customer statistics
  const chartData = {
    labels: ['Total Customers', 'New Customers', 'Active Customers'],
    datasets: [
      {
        label: 'Customer Data',
        data: [customerData.total, customerData.new, customerData.active],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderWidth: 1,
      },
    ],
  };

  // Options for the bar chart
  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Customer Data Overview',
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Layout>
      <div style={styles.container}>
        <h1 style={styles.header}>Customer Service Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : (
          <>
            {/* Cards Section */}
            <div style={styles.cardContainer}>
              <div style={styles.card}>
                <FontAwesomeIcon icon={faUsers} size="3x" />
                <h3>Total Customers</h3>
                <p>{customerData.total}</p>
              </div>
              <div style={styles.card}>
                <FontAwesomeIcon icon={faUserPlus} size="3x" />
                <h3>New Customers</h3>
                <p>{customerData.new}</p>
              </div>
              <div style={styles.card}>
                <FontAwesomeIcon icon={faUserCheck} size="3x" />
                <h3>Active</h3>
                <p>{customerData.active}</p>
              </div>
            </div>

            {/* Chart Section */}
            <div style={styles.chartContainer}>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '20px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '30%',
  },
  chartContainer: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
  },
  error: {
    color: 'red',
    fontSize: '1.2rem',
  },
};

export default CDashboard;
