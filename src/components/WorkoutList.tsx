import React, { useEffect, useState } from 'react';
import { Workout, workoutsService } from '../services/workouts.service';

export const WorkoutList: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        try {
            const data = await workoutsService.getWorkouts();
            setWorkouts(data);
        } catch (error) {
            console.error('Failed to load workouts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this workout?')) {
            try {
                await workoutsService.deleteWorkout(id);
                setWorkouts(workouts.filter(workout => workout.id !== id));
            } catch (error) {
                console.error('Failed to delete workout:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="workout-list">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Duration</th>
                        <th>Description</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map(workout => (
                        <tr key={workout.id}>
                            <td>{workout.name}</td>
                            <td>{workout.duration} min</td>
                            <td>{workout.description || 'N/A'}</td>
                            <td>
                                <div 
                                    style={{
                                        backgroundColor: workout.color || '#000',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '4px'
                                    }}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleDelete(workout.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
