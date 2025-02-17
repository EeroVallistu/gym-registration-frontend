import React, { useEffect, useState } from 'react';
import { Routine, routinesService } from '../services/routines.service';

export const RoutineList: React.FC = () => {
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRoutines();
    }, []);

    const loadRoutines = async () => {
        try {
            const data = await routinesService.getRoutines();
            setRoutines(data);
        } catch (error) {
            console.error('Failed to load routines:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (traineeId: string) => {
        if (window.confirm('Are you sure you want to delete this routine?')) {
            try {
                await routinesService.deleteRoutine(traineeId);
                setRoutines(routines.filter(routine => routine.userId !== traineeId));
            } catch (error) {
                console.error('Failed to delete routine:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="routine-list">
            {routines.map(routine => (
                <div key={routine.id} className="routine-card">
                    <h3>Trainee ID: {routine.userId}</h3>
                    <div className="availability">
                        <h4>Availability:</h4>
                        {routine.availability.map((slot, index) => (
                            <div key={index} className="time-slot">
                                {slot.day}: {slot.startTime} - {slot.endTime}
                            </div>
                        ))}
                    </div>
                    <button onClick={() => handleDelete(routine.userId)}>Delete</button>
                </div>
            ))}
        </div>
    );
};
