import React, { useEffect, useState } from 'react';
import { Trainee, traineesService } from '../services/trainees.service';

export const TraineeList: React.FC = () => {
    const [trainees, setTrainees] = useState<Trainee[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Trainee>>({});

    useEffect(() => {
        loadTrainees();
    }, []);

    const loadTrainees = async () => {
        try {
            const response = await traineesService.getTrainees();
            setTrainees(response.data);
        } catch (error) {
            console.error('Failed to load trainees:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this trainee?')) {
            try {
                await traineesService.deleteTrainee(id);
                setTrainees(trainees.filter(trainee => trainee.id !== id));
            } catch (error) {
                console.error('Failed to delete trainee:', error);
            }
        }
    };

    const copyToClipboard = (id: string) => {
        navigator.clipboard.writeText(id);
        alert('ID copied to clipboard!');
    };

    const handleEdit = (trainee: Trainee) => {
        setEditingId(trainee.id);
        setEditForm({
            name: trainee.name,
            email: trainee.email,
            timezone: trainee.timezone
        });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleUpdate = async (id: string) => {
        try {
            await traineesService.updateTrainee(id, editForm);
            const updatedTrainees = trainees.map(trainee =>
                trainee.id === id ? { ...trainee, ...editForm } : trainee
            );
            setTrainees(updatedTrainees);
            setEditingId(null);
            setEditForm({});
        } catch (error) {
            console.error('Failed to update trainee:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="trainee-list">
            <h2>Trainees</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Timezone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trainees.map(trainee => (
                        <tr key={trainee.id}>
                            {editingId === trainee.id ? (
                                <>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {trainee.id}
                                            <button 
                                                onClick={() => copyToClipboard(trainee.id)}
                                                style={{ 
                                                    padding: '2px 8px',
                                                    fontSize: '12px',
                                                    backgroundColor: '#6c757d'
                                                }}
                                            >
                                                Copy ID
                                            </button>
                                        </span>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name || ''}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editForm.email || ''}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="timezone"
                                            value={editForm.timezone || ''}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="edit-button" 
                                                onClick={() => handleUpdate(trainee.id)}
                                            >
                                                Save
                                            </button>
                                            <button 
                                                className="delete-button" 
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            {trainee.id}
                                            <button 
                                                onClick={() => copyToClipboard(trainee.id)}
                                                style={{ 
                                                    padding: '2px 8px',
                                                    fontSize: '12px',
                                                    backgroundColor: '#6c757d'
                                                }}
                                            >
                                                Copy ID
                                            </button>
                                        </span>
                                    </td>
                                    <td>{trainee.name}</td>
                                    <td>{trainee.email}</td>
                                    <td>{trainee.timezone || 'N/A'}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button 
                                                className="edit-button"
                                                onClick={() => handleEdit(trainee)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="delete-button"
                                                onClick={() => handleDelete(trainee.id)}
                                            >
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
