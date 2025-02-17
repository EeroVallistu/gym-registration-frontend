import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { authService } from './services/auth.service';
import { Layout } from './components/Layout';
import { TraineesPage } from './pages/TraineesPage';
import { LoginPage } from './pages/LoginPage';
import { WorkoutsPage } from './pages/WorkoutsPage';
import { RoutinesPage } from './pages/RoutinesPage';
import { RegistrationsPage } from './pages/RegistrationsPage';
import { RegisterPage } from './pages/RegisterPage';
import { saveLastLocation, getLastLocation } from './utils/navigation';

const AppContent: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkAuthentication = async () => {
            const authenticated = await authService.checkAuth();
            setIsAuthenticated(authenticated);
            setIsLoading(false);
        };
        checkAuthentication();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            saveLastLocation(location.pathname);
        }
    }, [location, isAuthenticated]);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Routes>
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/trainees" element={isAuthenticated ? <TraineesPage /> : <Navigate to="/login" />} />
                <Route path="/workouts" element={isAuthenticated ? <WorkoutsPage /> : <Navigate to="/login" />} />
                <Route path="/routines" element={isAuthenticated ? <RoutinesPage /> : <Navigate to="/login" />} />
                <Route path="/registrations" element={isAuthenticated ? <RegistrationsPage /> : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to={getLastLocation()} />} />
            </Routes>
        </Layout>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;