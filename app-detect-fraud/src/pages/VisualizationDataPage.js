// src/components/VisualizationDataPage.js
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_VISUALIZATION_DATA } from '../services_graphql/queriesVisualizationData';
import '../assets/styles/VisualizationDataPage.css';
import { RingLoader } from 'react-spinners';

const VisualizationDataPage = () => {
  const { data, loading, error } = useQuery(GET_VISUALIZATION_DATA);

  if (loading) return (
    <div className="loading">
      <RingLoader color="#4CAF50" size={300} />
    </div>);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="visualization-data-container">
      <h1>Transactions supérieures à 10 fois la moyenne par personne</h1>
      <div className="visualization-data-section">
        {/* Tableau des résultats */}
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Client ID</th>
              <th>Total Transactions</th>
              <th>Total Transaction Amount</th>
              <th>Average Transaction Amount</th>
              <th>Max Transaction Amount</th>
              <th>Min Transaction Amount</th>
              <th>Fraud Flags</th>
            </tr>
          </thead>
          <tbody>
            {data?.getVisualizationData.map((visualizationData, index) => (
              <tr key={index}>
                <td>{visualizationData.clientName}</td>
                <td>{visualizationData.clientId}</td>
                <td>{visualizationData.totalTransactions}</td>
                <td>{visualizationData.totalTransactionAmount.toFixed(2)}</td>
                <td>{visualizationData.avgTransactionAmount.toFixed(2)}</td>
                <td>{visualizationData.maxTransactionAmount.toFixed(2)}</td>
                <td>{visualizationData.minTransactionAmount.toFixed(2)}</td>
                <td>{visualizationData.fraudFlags.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VisualizationDataPage;
