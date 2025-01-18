// FraudPage.js
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_FRAUD_DETECTION,
  GET_SUSPICIOUS_ENTITIES,
  GET_HIGH_RISK_COMMUNITIES,
  GET_ANOMALOUS_TRANSACTIONS,
  EXPORT_GRAPH_DATA,
  GET_RAPID_TRANSACTIONS,
  CREATE_INDEXES
} from '../services_graphql/queriesFraudDetection';
import '../assets/styles/FraudPage.css';

const FraudPage = () => {
  const [transactionId, setTransactionId] = useState('');
  const [option, setOption] = useState('detectFraud'); // Par défaut, détection de fraude
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false); // État pour gérer l'affichage des résultats

  const { data: fraudData, error: fraudError, refetch: refetchFraud } = useQuery(GET_FRAUD_DETECTION, {
    variables: { transactionId },
    skip: !transactionId || option !== 'detectFraud'
  });

  const { data: suspiciousEntitiesData, error: suspiciousEntitiesError, refetch: refetchSuspiciousEntities } = useQuery(GET_SUSPICIOUS_ENTITIES, {
    skip: option !== 'detectSuspiciousEntities'
  });

  const { data: highRiskCommunitiesData, error: highRiskCommunitiesError, refetch: refetchHighRiskCommunities } = useQuery(GET_HIGH_RISK_COMMUNITIES, {
    skip: option !== 'detectHighRiskCommunities'
  });

  const { data: anomalousTransactionsData, error: anomalousTransactionsError, refetch: refetchAnomalousTransactions } = useQuery(GET_ANOMALOUS_TRANSACTIONS, {
    skip: option !== 'detectAnomalousTransactions'
  });

  const { data: graphData, error: graphDataError, refetch: refetchGraphData } = useQuery(EXPORT_GRAPH_DATA, {
    skip: option !== 'exportGraphData'
  });

  const { data: rapidTransactionsData, error: rapidTransactionsError, refetch: refetchRapidTransactions } = useQuery(GET_RAPID_TRANSACTIONS, {
    skip: option !== 'detectRapidTransactions'
  });

  const [createIndexes] = useMutation(CREATE_INDEXES);

  useEffect(() => {
    if (fraudError || suspiciousEntitiesError || highRiskCommunitiesError || anomalousTransactionsError || graphDataError || rapidTransactionsError) {
      console.error('Error fetching data:', fraudError || suspiciousEntitiesError || highRiskCommunitiesError || anomalousTransactionsError || graphDataError || rapidTransactionsError);
      setError('Error fetching data');
      setLoading(false);
    } else if (fraudData && option === 'detectFraud') {
      setData(fraudData.detectFraud);
      setLoading(false);
    } else if (suspiciousEntitiesData && option === 'detectSuspiciousEntities') {
      setData(suspiciousEntitiesData.detectSuspiciousEntities);
      setLoading(false);
    } else if (highRiskCommunitiesData && option === 'detectHighRiskCommunities') {
      setData(highRiskCommunitiesData.detectHighRiskCommunities);
      setLoading(false);
    } else if (anomalousTransactionsData && option === 'detectAnomalousTransactions') {
      setData(anomalousTransactionsData.detectAnomalousTransactions);
      setLoading(false);
    } else if (graphData && option === 'exportGraphData') {
      setData(graphData.exportGraphData);
      setLoading(false);
    } else if (rapidTransactionsData && option === 'detectRapidTransactions') {
      setData(rapidTransactionsData.detectRapidTransactions);
      setLoading(false);
    }
  }, [fraudData, suspiciousEntitiesData, highRiskCommunitiesData, anomalousTransactionsData, graphData, rapidTransactionsData, fraudError, suspiciousEntitiesError, highRiskCommunitiesError, anomalousTransactionsError, graphDataError, rapidTransactionsError, option]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowResults(false); // Réinitialiser l'affichage des résultats
    try {
      if (option === 'detectFraud') {
        await refetchFraud();
      } else if (option === 'detectSuspiciousEntities') {
        await refetchSuspiciousEntities();
      } else if (option === 'detectHighRiskCommunities') {
        await refetchHighRiskCommunities();
      } else if (option === 'detectAnomalousTransactions') {
        await refetchAnomalousTransactions();
      } else if (option === 'exportGraphData') {
        await refetchGraphData();
      } else if (option === 'detectRapidTransactions') {
        await refetchRapidTransactions();
      } else if (option === 'createIndexes') {
        await createIndexes();
      }
      setShowResults(true); // Afficher les résultats après la récupération des données
    } catch (err) {
      console.error('Error refetching data:', err);
      setError('Error refetching data');
    } finally {
      setLoading(false); // Assurez-vous de mettre à jour l'état de chargement
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Détection de Fraude</h1>
      <form onSubmit={handleSubmit}>
        {option === 'detectFraud' && (
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter Transaction ID"
          />
        )}
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="detectFraud">Detect Fraud</option>
          <option value="detectSuspiciousEntities">Detect Suspicious Entities</option>
          <option value="detectHighRiskCommunities">Detect High Risk Communities</option>
          <option value="detectAnomalousTransactions">Detect Anomalous Transactions</option>
          <option value="exportGraphData">Export Graph Data</option>
          <option value="detectRapidTransactions">Detect Rapid Transactions</option>
          <option value="createIndexes">Create Indexes</option>
        </select>
        <button type="submit">Execute</button>
      </form>
      {showResults && data && (
        <div>
          <h2>Results</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FraudPage;
