import React, { useEffect, useState } from 'react';
import { Workout, workoutsService } from '../services/workouts.service';
import '../styles/shared.css';

export const WorkoutList: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Workout>>({});
    const [error, setError] = useState<string>('');

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

    const handleEdit = (workout: Workout) => {
        setEditingId(workout.id);
        setEditForm({
            name: workout.name,
            duration: workout.duration,
            description: workout.description,
            color: workout.color
        });
        setError('');
    };

    const handleUpdate = async (id: string) => {
        setError('');
        const trimmedName = (editForm.name || '').trim();
        if (!trimmedName) {
            setError('Name cannot be empty or only spaces.');
            return;
        }
        try {
            const updated = await workoutsService.updateWorkout(id, { ...editForm, name: trimmedName });
            setWorkouts(workouts.map(workout => 
                workout.id === id ? updated : workout
            ));
            setEditingId(null);
            setEditForm({});
        } catch (error) {
            setError('Failed to update workout.');
            console.error('Failed to update workout:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
        setError('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: name === 'duration' ? parseInt(value) : value
        }));
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
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Duration (min)</th>
                        <th>Description</th>
                        <th>Color</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map(workout => (
                        <tr key={workout.id}>
                            {editingId === workout.id ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="number"
                                            name="duration"
                                            value={editForm.duration || ''}
                                            onChange={handleChange}
                                            required
                                            min="1"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="description"
                                            value={editForm.description || ''}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="color"
                                            name="color"
                                            value={editForm.color || '#000000'}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="edit-button" 
                                                onClick={() => handleUpdate(workout.id)}
                                                style={{ backgroundColor: '#28a745' }}
                                            >
                                                Save
                                            </button>
                                            <button 
                                                className="delete-button" 
                                                onClick={handleCancelEdit}
                                                style={{ backgroundColor: '#dc3545' }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{workout.name}</td>
                                    <td>{workout.duration}</td>
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
                                        <div className="action-buttons">
                                            <button className="edit-button" onClick={() => handleEdit(workout)}>
                                                Edit
                                            </button>
                                            <button className="delete-button" onClick={() => handleDelete(workout.id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
