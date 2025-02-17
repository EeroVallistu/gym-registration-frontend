import React from 'react';
import { TraineeForm } from '../components/TraineeForm';

export const TraineesPage: React.FC = () => {
    return (
        <div className="container">
            <h2>Trainees Management</h2>
            <TraineeForm />
        </div>
    );
};
