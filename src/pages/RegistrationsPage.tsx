import React from 'react';
import { RegistrationForm } from '../components/RegistrationForm';
import { RegistrationList } from '../components/RegistrationList';
import '../styles/RegistrationsPage.css';

export const RegistrationsPage: React.FC = () => {
    const handleRegistrationAdded = () => {
        window.location.reload();
    };

    return (
        <div className="registrations-page">
            <h1>Registrations Management</h1>
            <div className="registrations-content">
                <div className="registrations-left">
                    <h2>Add New Registration</h2>
                    <RegistrationForm onSuccess={handleRegistrationAdded} />
                </div>
                <div className="registrations-right">
                    <h2>Registration List</h2>
                    <RegistrationList />
                </div>
            </div>
        </div>
    );
};
