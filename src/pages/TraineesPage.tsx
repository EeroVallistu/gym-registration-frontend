import React from 'react';
import { TraineeForm } from '../components/TraineeForm';
import { TraineeList } from '../components/TraineeList';
import '../styles/TraineesPage.css';

export const TraineesPage: React.FC = () => {
    const handleTraineeAdded = () => {
        // We'll use a ref to TraineeList to refresh instead of page reload
        window.location.reload();
    };

    return (
        <div className="trainees-page">
            <h1>Trainees Management</h1>
            <div className="trainees-content">
                <div className="trainees-left">
                    <h2>Add New Trainee</h2>
                    <TraineeForm onSuccess={handleTraineeAdded} />
                </div>
                <div className="trainees-right">
                    <h2>Trainee List</h2>
                    <TraineeList />
                </div>
            </div>
        </div>
    );
};
