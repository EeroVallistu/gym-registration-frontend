import React, { useEffect, useState } from 'react';
import { Registration, registrationsService } from '../services/registrations.service';
import { authService } from '../services/auth.service';
import { Workout, workoutsService } from '../services/workouts.service';
import '../styles/RegistrationsPage.css';

export const MyRegistrationsPage: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | undefined>();

    useEffect(() => {
        const init = async () => {
            try {
                const session = await authService.checkAuth();
                if (session.authenticated && session.userId) {
                    setUserId(session.userId);
                    const [regsResponse, workoutsResponse] = await Promise.all([
                        registrationsService.getRegistrations(),
                        workoutsService.getWorkouts()
                    ]);
                    setWorkouts(workoutsResponse);
                    setRegistrations(regsResponse.filter(r => r.userId === session.userId));
                }
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (!userId) return <div>Please log in to view your registrations.</div>;
    if (registrations.length === 0) return <div>No registrations found.</div>;

    return (
        <div className="registrations-page">
            <h1>My Registrations</h1>
            <div className="registration-list">
                <table>
                    <thead>
                        <tr>
                            <th>Workout</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map(registration => {
                            const workout = workouts.find(w => w.id === registration.eventId);
                            const date = new Date(registration.startTime);
                            return (
                                <tr key={registration.id}>
                                    <td>{workout?.name || 'Unknown Workout'}</td>
                                    <td>{workout?.description || ''}</td>
                                    <td>{date.toLocaleDateString()}</td>
                                    <td>{date.toLocaleTimeString()}</td>
                                    <td>{registration.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
