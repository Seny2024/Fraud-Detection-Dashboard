// src/components/VisualizationDataPage.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_VISUALIZATION_DATA } from '../services_graphql/queriesVisualizationData';
import '../assets/styles/VisualizationDataPage.css';

const VisualizationDataPage = () => {
  const { data, loading, error } = useQuery(GET_VISUALIZATION_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="visualization-data-container">
      <h1>Resumé des transactions superieur à 10 fois la moyenne par personne </h1>
      <div className="visualization-data-section">
        {data?.getVisualizationData.map((visualizationData, index) => (
          <div key={index} className="visualization-data-item">
            <h2>{visualizationData.clientName}</h2>
            <p>Client ID: {visualizationData.clientId}</p>
            <p>Total Transactions: {visualizationData.totalTransactions}</p>
            <p>Total Transaction Amount: {visualizationData.totalTransactionAmount}</p>
            <p>Average Transaction Amount: {visualizationData.avgTransactionAmount}</p>
            <p>Max Transaction Amount: {visualizationData.maxTransactionAmount}</p>
            <p>Min Transaction Amount: {visualizationData.minTransactionAmount}</p>
            <p>Fraud Flags: {visualizationData.fraudFlags.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizationDataPage;
