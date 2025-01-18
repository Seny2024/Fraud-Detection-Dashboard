const server = require('./config/graphql');
const { driver } = require('./config/neo4j');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

server
    .listen(PORT)
    .then(({ url }) => {
        console.log(`🚀 Serveur demarré au ${url}`);
    })
    .catch((error) => {
        console.error("Error starting server:", error.message);
        process.exit(1);
    });

// Gracefully close Neo4j connection
process.on('SIGINT', () => {
    driver.close();
    console.log("Neo4j connection fermée.");
    process.exit(0);
});
