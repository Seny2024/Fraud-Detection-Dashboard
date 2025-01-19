// src/components/Home.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SUMMARY, GET_STATISTICS } from '../services_graphql/queriesHome';
import '../assets/styles/Home.css';

const Home = () => {
  const { data: summaryData, loading: summaryLoading, error: summaryError } = useQuery(GET_SUMMARY);
  const { data: statisticsData, loading: statisticsLoading, error: statisticsError } = useQuery(GET_STATISTICS);

  if (summaryLoading || statisticsLoading) return <p>Loading...</p>;
  if (summaryError || statisticsError) return <p>Error: {summaryError?.message || statisticsError?.message}</p>;

  return (
    <div className="home-container">
      <h1>Bienvenue sur le Tableau de Bord</h1>
      <p>Gérez les transactions et détectez les fraudes efficacement.</p>

      <div className="summary-section">
        <h2>Résumé</h2>
        {summaryData?.getSummary.map((summary, index) => (
          <div key={index} className="summary-item">
            <h3>{summary.queryType}</h3>
            <p>Count: {summary.count}</p>
            <p>Details: {summary.details.join(', ')}</p>
          </div>
        ))}
      </div>

      <div className="statistics-section">
        <h2>Statistiques</h2>
        {statisticsData?.getStatistics.map((stat, index) => (
          <div key={index} className="statistics-item">
            <h3>{stat.queryLabel}</h3>
            <p>Total Transactions: {stat.totalTransactions}</p>
            <p>Average Transaction Amount: {stat.avgTransactionAmount}</p>
            <p>Max Transaction Amount: {stat.maxTransactionAmount}</p>
            <p>Min Transaction Amount: {stat.minTransactionAmount}</p>
            <p>Total Amount: {stat.totalAmount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
