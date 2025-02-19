import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [flowerStatistics, setFlowerStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch flower statistics from the backend
  const fetchFlowerStatistics = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8080/flowerShop/statistics', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFlowerStatistics(response.data);
    } catch (error) {
      console.error('Error fetching flower statistics:', error);
      setError('Failed to load flower statistics. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlowerStatistics();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(flowerStatistics), // Flower names
    datasets: [
      {
        label: 'Number of Flowers',
        data: Object.values(flowerStatistics), // Flower quantities
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 50, 
        title: {
          display: true,
          text: 'Quantity',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Flower Name',
        },
      },
    },
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h1>Flower Dashboard</h1>
      <div className="chart-container" style={{ height: '400px', width: '100%' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
