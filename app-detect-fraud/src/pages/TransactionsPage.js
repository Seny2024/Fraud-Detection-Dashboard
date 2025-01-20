import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_USER_TRANSACTIONS } from '../services_graphql/queriesUserTransactions';
import { GET_TRANSACTION_BY_ID, GET_TRANSACTION_CHAIN } from '../services_graphql/queries_transactions';
import '../assets/styles/TransactionsPage.css';
import { RingLoader } from 'react-spinners';

const TransactionsPage = () => {
  const [userId, setUserId] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [option, setOption] = useState('getUser');
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null);
  const [transactionChain, setTransactionChain] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);

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
      console.error('Erreur lors de la récupération des données:', userError || transactionsError || transactionError || transactionChainError);
      setError('Erreur lors de la récupération des données');
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
    setShowResults(false);
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
      setShowResults(true);
    } catch (err) {
      console.error('Erreur lors du refetch des données:', err);
      setError('Erreur lors du refetch des données');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="loading">
      <RingLoader color="#4CAF50" size={300} />
    </div>);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {option === 'getUser' || option === 'getUserTransactions' ? (
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Entrez l'ID de l'utilisateur"
          />
        ) : (
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Entrez l'ID de la transaction"
          />
        )}
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="getUser">Obtenir les informations de l'utilisateur</option>
          <option value="getUserTransactions">Obtenir les transactions de l'utilisateur</option>
          <option value="getTransactionById">Obtenir la transaction par ID</option>
          <option value="getTransactionChain">Obtenir la chaîne de transactions</option>
        </select>
        <button type="submit">Récupérer les données</button>
      </form>

      {showResults && option === 'getUser' && user && (
        <div>
          <h1>Informations de l'utilisateur</h1>
          <table>
            <tr><td>ID:</td><td>{user.id}</td></tr>
            <tr><td>Nom:</td><td>{user.name}</td></tr>
            <tr><td>Email:</td><td>{user.email}</td></tr>
            <tr><td>Téléphone:</td><td>{user.phoneNumber}</td></tr>
            <tr><td>SSN:</td><td>{user.ssn}</td></tr>
          </table>
        </div>
      )}

      {showResults && option === 'getUserTransactions' && transactions.length > 0 && (
        <div>
          <h1>Transactions pour {user?.name}</h1>
          <table>
            <thead>
              <tr>
                <th>Identity</th>
                <th>Labels</th>
                <th>Montant</th>
                <th>Fraude</th>
                <th>ID Élément</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.identity}>
                  <td>{transaction.identity}</td>
                  <td>{transaction.labels.join(', ')}</td>
                  <td>{transaction.properties.amount}</td>
                  <td>{transaction.properties.fraud ? 'Oui' : 'Non'}</td>
                  <td>{transaction.elementId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showResults && option === 'getTransactionById' && transaction && (
        <div>
          <h1>Informations de la transaction</h1>
          <table>
            <tr><td>ID:</td><td>{transaction.id}</td></tr>
            <tr><td>Montant:</td><td>{transaction.amount}</td></tr>
            <tr><td>Fraude:</td><td>{transaction.fraud ? 'Oui' : 'Non'}</td></tr>
            <tr><td>Étape:</td><td>{transaction.step}</td></tr>
            <tr><td>Global Step:</td><td>{transaction.globalStep}</td></tr>
            <tr><td>Timestamp:</td><td>{transaction.ts}</td></tr>
            <tr><td>Labels:</td><td>{transaction.labels.join(', ')}</td></tr>
          </table>
        </div>
      )}

      {showResults && option === 'getTransactionChain' && transactionChain.length > 0 && (
        <div>
          <h1>Chaîne de transactions</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Montant</th>
                <th>Fraude</th>
                <th>Étape</th>
                <th>Global Step</th>
                <th>Timestamp</th>
                <th>Labels</th>
              </tr>
            </thead>
            <tbody>
              {transactionChain.map(tx => (
                <tr key={tx.id}>
                  <td>{tx.id}</td>
                  <td>{tx.amount}</td>
                  <td>{tx.fraud ? 'Oui' : 'Non'}</td>
                  <td>{tx.step}</td>
                  <td>{tx.globalStep}</td>
                  <td>{tx.ts}</td>
                  <td>{tx.labels.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionsPage;
