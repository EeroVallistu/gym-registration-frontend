import React, { useEffect, useState } from 'react';
import { Trainee, traineesService } from '../services/trainees.service';

export const TraineeList: React.FC = () => {
    const [trainees, setTrainees] = useState<Trainee[]>([]);
    const [loading, setLoading] = useState(true);

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
                                <button onClick={() => handleDelete(trainee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
