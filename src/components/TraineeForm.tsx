import React, { useState } from 'react';
import { CreateTraineeDto, traineesService } from '../services/trainees.service';
import '../styles/TraineeForm.css';

export const TraineeForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<CreateTraineeDto>({
        name: '',
        email: '',
        password: '',
        timezone: ''
    });
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        const trimmedName = formData.name.trim();
        if (!trimmedName) {
            setError('Name cannot be empty or only spaces.');
            return;
        }
        try {
            await traineesService.createTrainee({ ...formData, name: trimmedName });
            setFormData({ name: '', email: '', password: '', timezone: '' });
            if (onSuccess) onSuccess();
        } catch (error) {
            setError('Failed to create trainee.');
            console.error('Failed to create trainee:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="trainee-form">
            <h3>Add New Trainee</h3>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            <div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    placeholder="Timezone (optional)"
                />
            </div>
            <button type="submit">Add Trainee</button>
        </form>
    );
};
