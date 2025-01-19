import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import TransactionsPage from '../pages/TransactionsPage';
import FraudPage from '../pages/FraudPage';
import VisualizationDataPage from '../pages/VisualizationDataPage'; 
import HelpPage from '../pages/HelpPage';
import NotFound from '../pages/NotFound';
import GraphDataPage from '../pages/GraphDataPage';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/fraud-detection" element={<FraudPage />} />
            <Route path="/VisualizationData" element={<VisualizationDataPage />} />
            <Route path="/GraphData" element={<GraphDataPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
