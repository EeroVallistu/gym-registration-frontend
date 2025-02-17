import React, { useState, useEffect } from 'react';
import { CreateRegistrationDto, registrationsService } from '../services/registrations.service';
import { Workout, workoutsService } from '../services/workouts.service';
import { traineesService } from '../services/trainees.service';

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

    const handleEmailChange = async (email: string) => {
        setFormData(prev => ({ ...prev, inviteeEmail: email }));
        
        if (email) {
            try {
                const trainees = await traineesService.getTrainees();
                const trainee = trainees.data.find(t => t.email.toLowerCase() === email.toLowerCase());
                if (trainee) {
                    setFormData(prev => ({
                        ...prev,
                        userId: trainee.id,
                        inviteeEmail: email
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        userId: '',
                        inviteeEmail: email
                    }));
                }
            } catch (error) {
                console.error('Failed to fetch trainee:', error);
            }
        }
    };

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
        if (name === 'inviteeEmail') {
            handleEmailChange(value);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
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
                <label>Email:</label>
                <input
                    type="email"
                    name="inviteeEmail"
                    value={formData.inviteeEmail}
                    onChange={handleChange}
                    required
                    placeholder="Enter trainee email"
                />
            </div>
            <div>
                <label>User ID:</label>
                <input
                    type="text"
                    value={formData.userId}
                    readOnly
                    placeholder="Will be set automatically"
                    style={{ backgroundColor: '#f5f5f5' }}
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
