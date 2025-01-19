import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/styles/Sidebar.css'; 

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Dashboard</h2>
            <nav className="sidebar-nav">
                <NavLink to="/" className="sidebar-link" activeClassName="active" exact>
                    Accueil
                </NavLink>
                <NavLink to="/transactions" className="sidebar-link" activeClassName="active">
                    Transactions
                </NavLink>
                <NavLink to="/fraud-detection" className="sidebar-link" activeClassName="active">
                    Détection de Fraude
                </NavLink>
                <NavLink to="/VisualizationData" className="sidebar-link" activeClassName="active">
                   Visualization Data Page
                </NavLink>

                <NavLink to="/GraphData" className="sidebar-link" activeClassName="active">
                    Graphe de transactions 
                </NavLink>

                <NavLink to="/help" className="sidebar-link" activeClassName="active">
                    Aide
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;
