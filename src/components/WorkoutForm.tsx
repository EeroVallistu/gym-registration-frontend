import React, { useState } from 'react';
import { CreateWorkoutDto, workoutsService } from '../services/workouts.service';

export const WorkoutForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
    const [formData, setFormData] = useState<CreateWorkoutDto>({
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
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="workout-form">
            <h3>Add New Workout</h3>
            <div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Workout Name"
                    required
                />
            </div>
            <div>
                <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Duration (minutes)"
                    required
                    min="1"
                />
            </div>
            <div>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
            </div>
            <div>
                <input
                    type="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Add Workout</button>
        </form>
    );
};
