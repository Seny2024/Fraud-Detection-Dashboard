import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import '../assets/styles/HelpPage.css';

const HelpPage = () => {
  const [loading, setLoading] = useState(true);

  // Simuler un chargement pour l'exemple
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Après 3 secondes, l'indicateur de chargement disparaît
    }, 3000);
  }, []);

  if (loading) return <div className="loading"><RingLoader color="#4CAF50" size={300} /></div>;

  return (
    <div className="help-page">
      <h1>Aide et Manuel des Fonctionnalités du Système</h1>

      <section>
        <h2>Détection de Transactions Frauduleuses</h2>
        <p>
          Cette fonctionnalité sert à détecter des transactions potentiellement frauduleuses en analysant les transactions réalisées en moins de 10 minutes. Elle identifie celles qui sont suivies par plus de 100 autres transactions rapides. Si une transaction est associée à un nombre élevé de transactions successives en peu de temps, elle peut être considérée comme suspecte.
        </p>
      </section>

      <section>
        <h2>Visualisation des Réseaux de Transactions</h2>
        <p>
          Cette fonctionnalité récupère des données pour visualiser un réseau de transactions ou de relations. La première partie extrait les informations des nœuds (entités) du réseau, incluant leur identifiant, leurs labels (catégories) et leurs propriétés, limitées à 200 nœuds. La deuxième partie récupère les informations sur les relations (arêtes) entre les nœuds, incluant les identifiants des nœuds source et cible, ainsi que le type de relation, limité également à 200 relations. Cela permet de cartographier les liens entre entités et d'analyser des comportements suspects dans un contexte de détection de fraude.
        </p>
      </section>

      <section>
        <h2>Détection de Communautés avec l'Algorithme Louvain</h2>
        <p>
          Cette fonctionnalité utilise l'algorithme Louvain pour détecter des communautés au sein d'un graphe, en identifiant des groupes de clients ayant des comportements similaires. Le premier bloc de code applique l'algorithme Louvain sur le graphe appelé "suspiciousGraph" et assigne un identifiant de communauté à chaque client (le "communityId"), avec un maximum de 10 itérations pour optimiser les résultats. Le deuxième bloc récupère ensuite les clients ayant un "communityId" attribué, permettant d'analyser les groupes de clients susceptibles d'agir de manière suspecte ou frauduleuse.
        </p>
      </section>

      <section>
        <h2>Analyse des Transactions Anormales</h2>
        <p>
          Cette fonctionnalité compare le montant de chaque transaction avec le montant moyen de toutes les transactions. Elle commence par calculer la moyenne des montants des transactions, puis sélectionne celles dont le montant est supérieur à cette moyenne. Elle retourne ensuite l'identifiant de chaque transaction, son montant et la moyenne calculée. Ce type d'analyse permet de repérer des transactions anormalement élevées, qui pourraient être suspectes dans un contexte de détection de fraude.
        </p>
      </section>

      <section>
        <h2>Création et Analyse du Graphe "suspiciousGraph"</h2>
        <p>
          Cette fonctionnalité vérifie d'abord si un graphe appelé "suspiciousGraph" existe. Si ce n'est pas le cas, elle le crée en projetant les nœuds des entités "Client", "Email", "Phone" et "SSN", ainsi que les relations entre elles. Ensuite, l'algorithme PageRank est appliqué pour mesurer l'importance relative de chaque client dans le graphe, en utilisant un facteur d'amortissement de 0,85 et un maximum de 20 itérations. Enfin, la requête récupère les clients dont le score PageRank est supérieur à 0,01, et pour chacun, elle extrait les informations liées à leur email, numéro de téléphone et numéro de sécurité sociale. Cette approche permet d'identifier des clients potentiellement suspects en fonction de leur centralité dans le réseau.
        </p>
      </section>

      <section>
        <h2>Détection des Transactions Suspectes</h2>
        <p>
          Cette fonctionnalité cherche à identifier les transactions suspectes liées à une transaction donnée, en suivant une chaîne de transactions liées par la relation "NEXT". Elle récupère pour chaque transaction suspecte son identifiant, son étape globale, son montant, son état de fraude, son étape dans le processus, ainsi que son horodatage. Cela permet de suivre l'évolution de la transaction originale et de détecter des patterns ou des comportements frauduleux associés à cette transaction dans un réseau de transactions.
        </p>
      </section>

      <section>
        <h2>Analyse des Transactions sous Différents Angles</h2>
        <p>
          Cette fonctionnalité analyse les transactions sous plusieurs angles pour détecter des anomalies ou des comportements suspects.
          <ol>
            <li><strong>Analyse des transactions globales</strong> : Elle récupère les statistiques globales sur toutes les transactions, telles que le nombre total de transactions, le montant moyen, maximal, minimal et total.</li>
            <li><strong>Analyse des transactions frauduleuses</strong> : Elle examine les transactions marquées comme frauduleuses, en extrayant les mêmes statistiques pour ce sous-ensemble.</li>
            <li><strong>Détection des transactions à montant élevé</strong> : Elle identifie les transactions dont le montant est supérieur à 10 fois la moyenne des montants, afin de repérer les transactions anormalement élevées.</li>
            <li><strong>Détection des transactions répétées</strong> : Elle analyse les transactions successives ayant le même montant, ce qui pourrait indiquer des comportements suspects ou des tentatives de fraude.</li>
          </ol>
          Ces analyses permettent d'identifier différents types de fraudes ou d'anomalies en fonction des comportements des transactions.
        </p>
      </section>

      <section>
        <h2>Analyse des Éléments Clés et des Anomalies dans le Graphe</h2>
        <p>
          Cette fonctionnalité analyse différents aspects du graphe pour identifier des éléments clés et des anomalies :
          <ol>
            <li><strong>Analyse des nœuds et des labels</strong> : Elle examine tous les nœuds du graphe, comptabilise leur nombre et récupère les labels distincts associés à chaque type de nœud, fournissant ainsi un aperçu de la diversité des entités.</li>
            <li><strong>Analyse des types de relations</strong> : Elle analyse les relations entre les nœuds, comptabilise leur nombre et collecte les types de relations distincts pour mieux comprendre les interactions dans le graphe.</li>
            <li><strong>Analyse des nœuds frauduleux</strong> : Elle identifie les nœuds marqués comme frauduleux et fournit des informations sur le nombre de ces nœuds et leurs labels, afin de repérer des entités suspectes.</li>
            <li><strong>Détection des transactions suspectes</strong> : Elle détecte les transactions dont le montant est anormalement élevé (supérieur à 10 fois la moyenne), en fournissant un compte des transactions suspectes et leurs identifiants.</li>
          </ol>
          Ces analyses permettent de repérer les anomalies, les comportements frauduleux et de mieux comprendre les structures du graphe.
        </p>
      </section>

      <section>
        <h2>Récupération des Transactions Suivantes</h2>
        <p>
          Cette fonctionnalité récupère toutes les transactions suivantes liées à une transaction spécifique (identifiée par `$transactionId`). Elle suit les relations "NEXT" entre les transactions pour obtenir toutes celles qui succèdent à la transaction donnée, permettant ainsi d'analyser les transactions suivantes dans une séquence, ce qui peut être utile pour détecter des comportements suspects ou des fraudes en chaîne.
        </p>
      </section>

      <section>
        <h2>Récupération des Détails d'une Transaction Spécifique</h2>
        <p>
          Cette fonctionnalité récupère la transaction spécifiée par son identifiant (`$transactionId`). Elle permet d'extraire toutes les informations associées à cette transaction, telles que son montant, sa date, son statut de fraude, etc. Cela permet d'analyser les détails de la transaction spécifique pour vérifier sa validité ou détecter des comportements suspects.
        </p>
      </section>

      <section>
        <h2>Récupération des Informations Détailées d'un Client</h2>
        <p>
          Cette fonctionnalité récupère les informations détaillées d'un client spécifié par son identifiant (`$userId`). Elle extrait les données du client, y compris son nom, ainsi que ses informations de contact (email, numéro de téléphone et numéro de sécurité sociale) s'il en possède, en utilisant des relations optionnelles. Cela permet de vérifier les données associées à un client spécifique, ce qui peut être utile pour l'analyse des comportements ou la détection de fraudes.
        </p>
      </section>

      <section>
        <h2>Récupération des Transactions d'un Client Spécifique</h2>
        <p>
          Cette fonctionnalité récupère toutes les transactions effectuées par un client spécifique identifié par son identifiant (`$userId`). Elle suit la relation "PERFORMED" entre le client et les transactions associées pour extraire toutes les informations relatives à ces transactions. Cela permet d'analyser les transactions passées d'un client afin de détecter des comportements inhabituels ou suspects.
        </p>
      </section>

      <section>
        <h2>Analyse des Transactions des Clients</h2>
        <p>
          Cette fonctionnalité analyse les transactions des clients sous différents aspects pour détecter des comportements suspects :
          <ol>
            <li><strong>Analyse des transactions par client</strong> : Elle calcule des statistiques globales sur les transactions de chaque client, incluant le nombre total de transactions, le montant total, moyen, maximal et minimal, ainsi que les indicateurs de fraude associés.</li>
            <li><strong>Analyse des clients avec transactions frauduleuses</strong> : Elle se concentre sur les clients ayant effectué des transactions frauduleuses, en extrayant des informations similaires, pour détecter ceux qui sont impliqués dans des comportements suspects.</li>
            <li><strong>Détection des clients avec des transactions à haute valeur</strong> : Elle identifie les clients ayant effectué des transactions dont le montant est supérieur à dix fois la moyenne des montants, afin de repérer des transactions anormalement élevées, qui peuvent indiquer une fraude ou un comportement inhabituel.</li>
          </ol>
          Cette analyse permet de repérer des clients avec des activités potentiellement frauduleuses ou des transactions à risque.
        </p>
      </section>

      <section>
        <h2>Création d'Index pour Améliorer les Performances</h2>
        <p>
          Cette fonctionnalité crée des index pour améliorer la performance des recherches dans la base de données. Le premier index optimise l'accès aux transactions en fonction de leur identifiant, tandis que le second index facilite la recherche des clients en fonction de leur "pageRank", un indicateur de leur importance ou activité. Cela permet de détecter plus rapidement des comportements suspects ou des patterns frauduleux.
        </p>
      </section>

      <section>
        <h2>Outils Utilisés</h2>
        <p>
          Le système utilise une combinaison de technologies pour assurer une détection efficace des fraudes et une analyse approfondie des données. Voici les principaux outils utilisés :
        </p>
        <ul>
          <li><strong>Neo4j</strong> : Une base de données graphique qui permet de stocker et de manipuler des données complexes et interconnectées. Elle est idéale pour la détection de fraudes grâce à ses capacités de modélisation de graphes.</li>
          <li><strong>API GraphQL</strong> : Une interface de programmation d'applications qui permet de requêter des données de manière flexible et efficace. Elle est utilisée pour interagir avec la base de données Neo4j.</li>
          <li><strong>ReactJS</strong> : Une bibliothèque JavaScript pour construire des interfaces utilisateur. Elle est utilisée pour créer des composants réutilisables et interactifs dans l'application.</li>
          <li><strong>JavaScript</strong> : Le langage de programmation principal utilisé pour développer les fonctionnalités de l'application.</li>
          <li><strong>Cypher</strong> : Le langage de requête utilisé pour interagir avec la base de données Neo4j. Il permet d'effectuer des opérations complexes sur les graphes, telles que la création de nœuds, de relations et l'exécution d'algorithmes de graphes.</li>
        </ul>
      </section>
    </div>
  );
};

export default HelpPage;
