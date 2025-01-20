// src/pages/GraphDataPage.js
import React, { useEffect, useRef, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import cytoscape from 'cytoscape';
import { EXPORT_GRAPH_DATA } from '../services_graphql/queriesFraudDetection';
import '../assets/styles/GraphDataPage.css';
import { RingLoader } from 'react-spinners';

// Fonction de validation et de transformation des données
const loadGraphData = (data) => {
  const nodes = data.nodes.map((node) => ({
    data: {
      id: node.id,
      name: node.properties?.name || `Client ${node.id}`,  // Utilisation du champ 'name' pour le client
      type: node.labels[0], // Le label du nœud détermine son type
    },
  }));

  const validNodeIds = new Set(nodes.map((node) => node.data.id));

  const edges = data.edges
    .filter((edge) => validNodeIds.has(edge.source) && validNodeIds.has(edge.target))
    .map((edge) => ({
      data: {
        id: `${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        relationship: edge.relationship || 'Unknown',
      },
    }));

  return { nodes, edges };
};

const GraphDataPage = () => {
  const { data, loading, error } = useQuery(EXPORT_GRAPH_DATA);
  const cyRef = useRef(null);

  // Utiliser useMemo pour mémoriser les objets nodeColors et nodeLabels
  const nodeColors = useMemo(() => ({
    Bank: '#3498db',        // Bleu
    CashIn: '#1abc9c',      // Vert clair
    CashOut: '#e74c3c',     // Rouge
    Client: '#9b59b6',      // Violet
    Debit: '#f39c12',       // Jaune
    Email: '#2ecc71',       // Vert
    Merchant: '#34495e',    // Gris foncé
    Mule: '#e67e22',        // Orange
    Payment: '#95a5a6',     // Gris
    Phone: '#f1c40f',       // Jaune vif
    SSN: '#7f8c8d',         // Gris
    Transaction: '#d35400', // Orange foncé
    Transfer: '#16a085',    // Vert foncé
  }), []);

  const nodeLabels = useMemo(() => ({
    Bank: 'Banque',
    CashIn: 'Entrée de Cash',
    CashOut: 'Sortie de Cash',
    Client: 'Client',
    Debit: 'Débit',
    Email: 'Email',
    Merchant: 'Marchand',
    Mule: 'Mule',
    Payment: 'Paiement',
    Phone: 'Téléphone',
    SSN: 'Numéro de Sécurité Sociale',
    Transaction: 'Transaction',
    Transfer: 'Transfert',
  }), []);

  useEffect(() => {
    if (data) {
      const graphElements = loadGraphData(data.exportGraphData);
  
      const cyContainer = document.getElementById('cy');
      if (!cyContainer) {
        console.error('Conteneur Cytoscape introuvable');
        return;
      }
  
      if (!cyRef.current) {
        // Initialisation de Cytoscape si cyRef.current est nul
        cyRef.current = cytoscape({
          container: cyContainer,
          elements: [...graphElements.nodes, ...graphElements.edges],
          style: [
            {
              selector: 'node',
              style: {
                'background-color': (ele) => nodeColors[ele.data('type')] || '#666',
                label: (ele) => {
                  if (ele.data('type') === 'Client' && ele.data('name')) {
                    return ele.data('name');
                  } else {
                    return nodeLabels[ele.data('type')] || 'Client';
                  }
                },
                'text-halign': 'center',
                'text-valign': 'center',
                color: '#fff',
                'font-size': '12px',
                'text-outline-color': '#000',
                'text-outline-width': 2,
              },
            },
            {
              selector: 'edge',
              style: {
                width: 2,
                'line-color': '#ccc',
                'target-arrow-color': '#ccc',
                'target-arrow-shape': 'triangle',
                'curve-style': 'bezier',
                label: 'data(relationship)',
                'text-rotation': 'autorotate',
                color: '#333',
                'font-size': '10px',
              },
            },
          ],
          layout: {
            name: 'cose',
          },
        });
      } else {
        // Si cyRef.current existe déjà, on peut mettre à jour les éléments
        cyRef.current.json({ elements: [...graphElements.nodes, ...graphElements.edges] });
        cyRef.current.layout({ name: 'cose' }).run();
      }
    }
  }, [data, nodeColors, nodeLabels]);
  
  if (loading) return (
    <div className="loading">
      <RingLoader color="#4CAF50" size={300} />
    </div>);


  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="graph-data-container">
      <h1>Graphe des Transactions limité à 200</h1>
      <div id="cy" style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default GraphDataPage;
