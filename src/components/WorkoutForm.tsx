import React, { useState } from 'react';
import { workoutsService } from '../services/workouts.service';

interface WorkoutFormProps {
    onSuccess?: () => void;
}

interface WorkoutFormData {
    name: string;
    duration: number;
    description?: string;
    color?: string;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<WorkoutFormData>({
        name: '',
        duration: 60,
        description: '',
        color: '#000000'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await workoutsService.createWorkout(formData);
            setFormData({ name: '', duration: 60, description: '', color: '#000000' });
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Failed to create workout:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'duration' ? parseInt(value) || 0 : value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="workout-form">
            <h3>Add New Workout</h3>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Duration (minutes):</label>
                <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    min="1"
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Color:</label>
                <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Create Workout</button>
        </form>
    );
};
