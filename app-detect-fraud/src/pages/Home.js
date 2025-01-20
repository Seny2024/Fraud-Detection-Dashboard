// src/components/Home.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SUMMARY, GET_STATISTICS } from '../services_graphql/queriesHome';
import '../assets/styles/Home.css';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { RingLoader } from 'react-spinners';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Home = () => {
  const { data: summaryData, loading: summaryLoading, error: summaryError } = useQuery(GET_SUMMARY);
  const { data: statisticsData, loading: statisticsLoading, error: statisticsError } = useQuery(GET_STATISTICS);

  if (summaryLoading || statisticsLoading) {
    return (
      <div className="loading">
        <RingLoader color="#4CAF50" size={300} />
      </div>
    );
  }

  if (summaryError || statisticsError) {
    return <div className="error">Erreur : {summaryError?.message || statisticsError?.message}</div>;
  }

  const barChartData = {
    labels: statisticsData?.getStatistics.map(stat => stat.queryLabel),
    datasets: [
      {
        label: 'Total Transactions',
        data: statisticsData?.getStatistics.map(stat => stat.totalTransactions),
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: summaryData?.getSummary.map(summary => summary.queryType),
    datasets: [
      {
        label: 'Distribution des Résumés',
        data: summaryData?.getSummary.map(summary => summary.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="home-container">
      <div className="dashboard-header">
        <h1>Bienvenue sur le Tableau de Bord</h1>
        <p>Surveillez les transactions et détectez les fraudes de manière proactive.</p>
      </div>

      <div className="dashboard-content">
        {/* Graphiques */}
        <div className="charts-section">
          <h2>Visualisations</h2>
          <div className="charts-container">
            <div className="chart-item" style={{ width: '45%', height: '300px' }}>
              <h3>Transactions Totales</h3>
              <Bar data={barChartData} options={chartOptions} />
            </div>
            <div className="chart-item" style={{ width: '45%', height: '300px' }}>
              <h3>Distribution des Résumés</h3>
              <Pie data={pieChartData} options={chartOptions} />
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="statistics-section">
          <h2>Statistiques</h2>
          <table className="statistics-table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Total Transactions</th>
                <th>Moyenne</th>
                <th>Maximum</th>
                <th>Minimum</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {statisticsData?.getStatistics.map((stat, index) => (
                <tr key={index}>
                  <td>{stat.queryLabel}</td>
                  <td>{stat.totalTransactions}</td>
                  <td>{stat.avgTransactionAmount}</td>
                  <td>{stat.maxTransactionAmount}</td>
                  <td>{stat.minTransactionAmount}</td>
                  <td>{stat.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Résumé */}
        <div className="summary-section">
          <h2>Résumé</h2>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Nombre</th>
                <th>Détails</th>
              </tr>
            </thead>
            <tbody>
              {summaryData?.getSummary.map((summary, index) => (
                <tr key={index}>
                  <td>{summary.queryType}</td>
                  <td>{summary.count}</td>
                  <td>{summary.details.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
