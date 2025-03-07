import React, { useEffect, useState } from 'react';
import { Routine, routinesService } from '../services/routines.service';
import { authService } from '../services/auth.service';
import '../styles/RoutinesPage.css';

export const MyRoutinesPage: React.FC = () => {
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | undefined>();

    useEffect(() => {
        const init = async () => {
            try {
                const session = await authService.checkAuth();
                if (session.authenticated && session.userId) {
                    setUserId(session.userId);
                    const response = await routinesService.getRoutines();
                    setRoutines(response.filter(r => r.userId === session.userId));
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
    if (!userId) return <div>Please log in to view your routines.</div>;
    if (routines.length === 0) return <div>No routines found.</div>;

    return (
        <div className="routines-page">
            <h1>My Routines</h1>
            <div className="routines-list">
                {routines.map(routine => (
                    <div key={routine.id} className="routine-card">
                        <h3>Weekly Schedule</h3>
                        <div className="availability">
                            {routine.availability.map((slot, index) => (
                                <div key={index} className="time-slot">
                                    {slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}: {slot.startTime} - {slot.endTime}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
