import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import TransactionsPage from '../pages/TransactionsPage';
import FraudPage from '../pages/FraudPage';
import SettingsPage from '../pages/SettingsPage';
import HelpPage from '../pages/HelpPage';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/fraud-detection" element={<FraudPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;
