import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_FRAUD_DETECTION,
  GET_SUSPICIOUS_ENTITIES,
  GET_HIGH_RISK_COMMUNITIES,
  GET_ANOMALOUS_TRANSACTIONS,
  GET_RAPID_TRANSACTIONS,
  CREATE_INDEXES
} from '../services_graphql/queriesFraudDetection';
import '../assets/styles/FraudPage.css';
import { RingLoader } from 'react-spinners';

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

  const { data: rapidTransactionsData, error: rapidTransactionsError, refetch: refetchRapidTransactions } = useQuery(GET_RAPID_TRANSACTIONS, {
    skip: option !== 'detectRapidTransactions'
  });

  const [createIndexes] = useMutation(CREATE_INDEXES);

  useEffect(() => {
    if (fraudError || suspiciousEntitiesError || highRiskCommunitiesError || anomalousTransactionsError || rapidTransactionsError) {
      console.error('Erreur lors de la récupération des données:', fraudError || suspiciousEntitiesError || highRiskCommunitiesError || anomalousTransactionsError || rapidTransactionsError);
      setError('Erreur lors de la récupération des données');
      setLoading(false);
    } else if (fraudData && option === 'detectFraud') {
      console.log('Données de fraude:', fraudData);
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
    } else if (rapidTransactionsData && option === 'detectRapidTransactions') {
      setData(rapidTransactionsData.detectRapidTransactions);
      setLoading(false);
    }
  }, [fraudData, suspiciousEntitiesData, highRiskCommunitiesData, anomalousTransactionsData, rapidTransactionsData, fraudError, suspiciousEntitiesError, highRiskCommunitiesError, anomalousTransactionsError, rapidTransactionsError, option]);

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
      } else if (option === 'detectRapidTransactions') {
        await refetchRapidTransactions();
      } else if (option === 'createIndexes') {
        await createIndexes();
      }
      setShowResults(true); // Afficher les résultats après la récupération des données
    } catch (err) {
      console.error('Erreur lors de la récupération des données:', err);
      setError('Erreur lors de la récupération des données');
    } finally {
      setLoading(false); // Assurez-vous de mettre à jour l'état de chargement
    }
  };

  if (loading) return <div className="loading"><RingLoader color="#4CAF50" size={300} /></div>;
  if (error) return <p>{error}</p>;

  const renderResults = () => {
    if (!data) {
      return <p>Aucune donnée disponible</p>;
    }

    if (option === 'detectFraud' && data) {
      return (
        <table>
          <thead>
            <tr>
              <th>ID de la Transaction</th>
              <th>Fraude</th>
              <th>Étape</th>
              <th>Étape Globale</th>
              <th>Horodatage</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.fraud ? 'Oui' : 'Non'}</td>
              <td>{data.step}</td>
              <td>{data.globalStep}</td>
              <td>{data.ts}</td>
              <td>{data.amount}</td>
            </tr>
          </tbody>
        </table>
      );
    }
    if (option === 'detectSuspiciousEntities' && Array.isArray(data)) {
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Numéro de téléphone</th>
              <th>Numéro de sécurité sociale</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.ssn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    if (option === 'detectHighRiskCommunities' && Array.isArray(data)) {
      return (
        <table>
          <thead>
            <tr>
              <th>ID Client</th>
              <th>ID Communauté</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.clientId}</td>
                <td>{item.communityId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    if (option === 'detectAnomalousTransactions' && Array.isArray(data)) {
      return (
        <table>
          <thead>
            <tr>
              <th>ID de la Transaction</th>
              <th>Montant</th>
              <th>Montant Moyen</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.transactionId}</td>
                <td>{item.amount}</td>
                <td>{item.avgAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
    if (option === 'detectRapidTransactions' && Array.isArray(data)) {
      return (
        <table>
          <thead>
            <tr>
              <th>ID de la Transaction</th>
              <th>Nombre Rapide</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.transactionId}</td>
                <td>{item.rapidCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div>
      <h1>Détection de Fraude</h1>
      <form onSubmit={handleSubmit}>
        {option === 'detectFraud' && (
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Entrez l'ID de la Transaction"
          />
        )}
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="detectFraud">Détecter la Fraude</option>
          <option value="detectSuspiciousEntities">Détecter les Entités Suspectes</option>
          <option value="detectHighRiskCommunities">Détecter les Communautés à Haut Risque</option>
          <option value="detectAnomalousTransactions">Détecter les Transactions Anormales</option>
          <option value="detectRapidTransactions">Détecter les Transactions Rapides</option>
          <option value="createIndexes">Créer des Index</option>
        </select>
        <button type="submit">Exécuter</button>
      </form>
      {showResults && data && (
        <div>
          <h2>Résultats</h2>
          {renderResults()}
        </div>
      )}
    </div>
  );
};

export default FraudPage;
