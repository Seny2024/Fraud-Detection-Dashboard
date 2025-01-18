// TransactionsPage.js
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_USER_TRANSACTIONS } from '../services_graphql/queriesUserTransactions';
import { GET_TRANSACTION_BY_ID, GET_TRANSACTION_CHAIN } from '../services_graphql/queries_transactions';
import '../assets/styles/TransactionsPage.css';

const TransactionsPage = () => {
  const [userId, setUserId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [option, setOption] = useState('getUser'); // Par défaut, récupérer les informations de l'utilisateur
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [transactionChain, setTransactionChain] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false); // État pour gérer l'affichage des résultats

  const { data: userData, error: userError, refetch: refetchUser } = useQuery(GET_USER, {
    variables: { userId },
    skip: !userId || option !== 'getUser'
  });

  const { data: transactionsData, error: transactionsError, refetch: refetchTransactions } = useQuery(GET_USER_TRANSACTIONS, {
    variables: { userId },
    skip: !userId || option !== 'getUserTransactions'
  });

  const { data: transactionData, error: transactionError, refetch: refetchTransactionById } = useQuery(GET_TRANSACTION_BY_ID, {
    variables: { transactionId },
    skip: !transactionId || option !== 'getTransactionById'
  });

  const { data: transactionChainData, error: transactionChainError, refetch: refetchTransactionChain } = useQuery(GET_TRANSACTION_CHAIN, {
    variables: { transactionId },
    skip: !transactionId || option !== 'getTransactionChain'
  });

  useEffect(() => {
    if (userError || transactionsError || transactionError || transactionChainError) {
      console.error('Error fetching data:', userError || transactionsError || transactionError || transactionChainError);
      setError('Error fetching data');
      setLoading(false);
    } else if (userData && option === 'getUser') {
      setUser(userData.getUser);
      setLoading(false);
    } else if (transactionsData && option === 'getUserTransactions') {
      setTransactions(transactionsData.getUserTransactions);
      setLoading(false);
    } else if (transactionData && option === 'getTransactionById') {
      setTransaction(transactionData.getTransactionById);
      setLoading(false);
    } else if (transactionChainData && option === 'getTransactionChain') {
      setTransactionChain(transactionChainData.getTransactionChain);
      setLoading(false);
    }
  }, [userData, transactionsData, transactionData, transactionChainData, userError, transactionsError, transactionError, transactionChainError, option]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowResults(false); // Réinitialiser l'affichage des résultats
    try {
      if (option === 'getUser') {
        await refetchUser();
      } else if (option === 'getUserTransactions') {
        await refetchTransactions();
      } else if (option === 'getTransactionById') {
        await refetchTransactionById();
      } else if (option === 'getTransactionChain') {
        await refetchTransactionChain();
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
      <form onSubmit={handleSubmit}>
        {option === 'getUser' || option === 'getUserTransactions' ? (
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter User ID"
          />
        ) : (
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter Transaction ID"
          />
        )}
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="getUser">Get User Info</option>
          <option value="getUserTransactions">Get User Transactions</option>
          <option value="getTransactionById">Get Transaction by ID</option>
          <option value="getTransactionChain">Get Transaction Chain</option>
        </select>
        <button type="submit">Fetch Data</button>
      </form>
      {showResults && option === 'getUser' && user && (
        <div>
          <h1>User Information</h1>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>SSN: {user.ssn}</p>
        </div>
      )}
      {showResults && option === 'getUserTransactions' && transactions.length > 0 && (
        <div>
          <h1>Transactions for {user?.name}</h1>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.identity}>
                <p>Identity: {transaction.identity}</p>
                <p>Labels: {transaction.labels.join(', ')}</p>
                <p>Amount: {transaction.properties.amount}</p>
                <p>Fraud: {transaction.properties.fraud ? 'Yes' : 'No'}</p>
                <p>Element ID: {transaction.elementId}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showResults && option === 'getTransactionById' && transaction && (
        <div>
          <h1>Transaction Information</h1>
          <p>ID: {transaction.id}</p>
          <p>Amount: {transaction.amount}</p>
          <p>Fraud: {transaction.fraud ? 'Yes' : 'No'}</p>
          <p>Step: {transaction.step}</p>
          <p>Global Step: {transaction.globalStep}</p>
          <p>Timestamp: {transaction.ts}</p>
          <p>Labels: {transaction.labels.join(', ')}</p>
        </div>
      )}
      {showResults && option === 'getTransactionChain' && transactionChain.length > 0 && (
        <div>
          <h1>Transaction Chain</h1>
          <ul>
            {transactionChain.map(tx => (
              <li key={tx.id}>
                <p>ID: {tx.id}</p>
                <p>Amount: {tx.amount}</p>
                <p>Fraud: {tx.fraud ? 'Yes' : 'No'}</p>
                <p>Step: {tx.step}</p>
                <p>Global Step: {tx.globalStep}</p>
                <p>Timestamp: {tx.ts}</p>
                <p>Labels: {tx.labels.join(', ')}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
