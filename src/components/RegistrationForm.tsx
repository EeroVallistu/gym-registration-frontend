import React, { useState, useEffect } from 'react';
import { CreateRegistrationDto, registrationsService } from '../services/registrations.service';
import { Workout, workoutsService } from '../services/workouts.service';

interface RegistrationFormProps {
    onSuccess?: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [formData, setFormData] = useState<CreateRegistrationDto>({
        eventId: '',
        userId: '',
        inviteeEmail: '',
        startTime: '',
        endTime: '',
        status: 'scheduled'
    });

    useEffect(() => {
        // Load available workouts when component mounts
        const loadWorkouts = async () => {
            try {
                const response = await workoutsService.getWorkouts();
                setWorkouts(response);
            } catch (error) {
                console.error('Failed to load workouts:', error);
            }
        };
        loadWorkouts();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registrationsService.createRegistration(formData);
            setFormData({
                eventId: '',
                userId: '',
                inviteeEmail: '',
                startTime: '',
                endTime: '',
                status: 'scheduled'
            });
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Failed to create registration:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="registration-form">
            <h3>Add New Registration</h3>
            <div>
                <label>Workout:</label>
                <select
                    name="eventId"
                    value={formData.eventId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a workout</option>
                    {workouts.map(workout => (
                        <option key={workout.id} value={workout.id}>
                            {workout.name} ({workout.duration} minutes)
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>User ID:</label>
                <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Invitee Email:</label>
                <input
                    type="email"
                    name="inviteeEmail"
                    value={formData.inviteeEmail}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Start Time:</label>
                <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>End Time:</label>
                <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Status:</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="scheduled">Scheduled</option>
                    <option value="canceled">Canceled</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <button type="submit">Create Registration</button>
        </form>
    );
};
