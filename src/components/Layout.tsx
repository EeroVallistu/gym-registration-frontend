import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../services/auth.service';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const handleLogout = async () => {
        await authService.logout();
        window.location.reload();
    };

    return (
        <div className="layout">
            <nav className="navigation">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/trainees">Trainees</Link></li>
                    <li><Link to="/workouts">Workouts</Link></li>
                    <li><Link to="/routines">Routines</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};
