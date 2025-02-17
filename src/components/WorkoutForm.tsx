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
        duration: 60
    });
    const [useDescription, setUseDescription] = useState(false);
    const [useColor, setUseColor] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const submitData = {
                name: formData.name,
                duration: formData.duration,
                ...(useDescription && formData.description && { description: formData.description }),
                ...(useColor && formData.color && { color: formData.color })
            };
            await workoutsService.createWorkout(submitData);
            setFormData({ name: '', duration: 60 });
            setUseDescription(false);
            setUseColor(false);
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
            
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
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

            <div className="form-group checkbox-group">
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="useDescription"
                        checked={useDescription}
                        onChange={(e) => {
                            setUseDescription(e.target.checked);
                            if (!e.target.checked) {
                                setFormData(prev => ({ ...prev, description: undefined }));
                            }
                        }}
                    />
                    <label htmlFor="useDescription">Add Description</label>
                </div>
                {useDescription && (
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        placeholder="Enter workout description..."
                    />
                )}
            </div>

            <div className="form-group checkbox-group">
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="useColor"
                        checked={useColor}
                        onChange={(e) => {
                            setUseColor(e.target.checked);
                            if (!e.target.checked) {
                                setFormData(prev => ({ ...prev, color: undefined }));
                            } else {
                                setFormData(prev => ({ ...prev, color: '#000000' }));
                            }
                        }}
                    />
                    <label htmlFor="useColor">Set Color</label>
                </div>
                {useColor && (
                    <div className="color-input-container">
                        <input
                            type="color"
                            name="color"
                            value={formData.color || '#000000'}
                            onChange={handleChange}
                        />
                        <span>{formData.color || '#000000'}</span>
                    </div>
                )}
            </div>

            <button type="submit">Create Workout</button>
        </form>
    );
};
