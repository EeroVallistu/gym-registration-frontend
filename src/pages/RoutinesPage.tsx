import React from 'react';
import { RoutineForm } from '../components/RoutineForm';
import { RoutineList } from '../components/RoutineList';
import '../styles/RoutinesPage.css';

export const RoutinesPage: React.FC = () => {
    const handleRoutineAdded = () => {
        window.location.reload();
    };

    return (
        <div className="routines-page">
            <h1>Routines Management</h1>
            <div className="routines-content">
                <div className="routines-left">
                    <h2>Add New Routine</h2>
                    <RoutineForm onSuccess={handleRoutineAdded} />
                </div>
                <div className="routines-right">
                    <h2>Routine List</h2>
                    <RoutineList />
                </div>
            </div>
        </div>
    );
};
