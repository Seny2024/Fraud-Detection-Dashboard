import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import AppRouter from './router/AppRouter';

const App = () => {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                {/* Barre de navigation */}
                <Sidebar />

                {/* Contenu principal */}
                <div style={{ marginLeft: '300px', padding: '20px', flex: 1 }}>
                    <AppRouter />
                </div>
            </div>
        </Router>
    );
};

export default App;
