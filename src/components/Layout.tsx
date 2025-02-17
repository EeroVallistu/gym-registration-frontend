import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { authService } from '../services/auth.service';
import '../styles/Layout.css';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    
    const handleLogout = async () => {
        await authService.logout();
        window.location.reload();
    };

    return (
        <div className="layout">
            <nav className="main-nav">
                <div className="nav-logo">
                    <h1>Gym Registration</h1>
                </div>
                <ul className="nav-links">
                    {[
                        { path: '/trainees', label: 'Trainees' },
                        { path: '/workouts', label: 'Workouts' },
                        { path: '/routines', label: 'Routines' },
                        { path: '/registrations', label: 'Registrations' },
                    ].map(({ path, label }) => (
                        <li key={path}>
                            <Link 
                                to={path} 
                                className={location.pathname === path ? 'active' : ''}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    </li>
                </ul>
            </nav>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};
