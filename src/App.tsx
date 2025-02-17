import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { authService } from './services/auth.service';
import { Layout } from './components/Layout';
import { TraineesPage } from './pages/TraineesPage';
import { LoginPage } from './pages/LoginPage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import { RoutinesPage } from './pages/RoutinesPage';
import { RegistrationsPage } from './pages/RegistrationsPage';

const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await authService.checkAuth();
            setIsAuthenticated(authenticated);
        };
        checkAuth();
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/trainees" element={isAuthenticated ? <TraineesPage /> : <Navigate to="/login" />} />
                    <Route path="/workouts" element={isAuthenticated ? <WorkoutsPage /> : <Navigate to="/login" />} />
                    <Route path="/routines" element={isAuthenticated ? <RoutinesPage /> : <Navigate to="/login" />} />
                    <Route path="/registrations" element={isAuthenticated ? <RegistrationsPage /> : <Navigate to="/login" />} />
                    <Route path="/" element={<Navigate to="/trainees" />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;