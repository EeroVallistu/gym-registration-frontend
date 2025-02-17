import React from 'react';
import { WorkoutForm } from '../components/WorkoutForm';
import { WorkoutList } from '../components/WorkoutList';
import '../styles/WorkoutsPage.css';

export const WorkoutsPage: React.FC = () => {
    const handleWorkoutAdded = () => {
        window.location.reload();
    };

    return (
        <div className="workouts-page">
            <h1>Workouts Management</h1>
            <div className="workouts-content">
                <div className="workouts-left">
                    <h2>Add New Workout</h2>
                    <WorkoutForm onSuccess={handleWorkoutAdded} />
                </div>
                <div className="workouts-right">
                    <h2>Workout List</h2>
                    <WorkoutList />
                </div>
            </div>
        </div>
    );
};
