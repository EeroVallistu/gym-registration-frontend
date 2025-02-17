import React, { useEffect, useState } from 'react';
import { Registration, registrationsService } from '../services/registrations.service';
import { Workout, workoutsService } from '../services/workouts.service';

export const RegistrationList: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<Partial<Registration>>({});

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [regsResponse, workoutsResponse] = await Promise.all([
                registrationsService.getRegistrations(),
                workoutsService.getWorkouts()
            ]);
            setRegistrations(regsResponse);
            setWorkouts(workoutsResponse);
        } catch (error) {
            console.error('Failed to load data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (registration: Registration) => {
        setEditingId(registration.id);
        setEditForm(registration);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const handleUpdate = async (id: string) => {
        try {
            const updated = await registrationsService.updateRegistration(id, editForm);
            setRegistrations(registrations.map(reg => 
                reg.id === id ? updated : reg
            ));
            setEditingId(null);
            setEditForm({});
        } catch (error) {
            console.error('Failed to update registration:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this registration?')) {
            try {
                await registrationsService.deleteRegistration(id);
                setRegistrations(registrations.filter(reg => reg.id !== id));
            } catch (error) {
                console.error('Failed to delete registration:', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="registration-list">
            <table>
                <thead>
                    <tr>
                        <th>Workout</th>
                        <th>User ID</th>
                        <th>Email</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {registrations.map(registration => (
                        <tr key={registration.id}>
                            {editingId === registration.id ? (
                                <>
                                    <td>
                                        <select
                                            name="eventId"
                                            value={editForm.eventId}
                                            onChange={handleChange}
                                        >
                                            {workouts.map(workout => (
                                                <option key={workout.id} value={workout.id}>
                                                    {workout.name}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="userId"
                                            value={editForm.userId}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="email"
                                            name="inviteeEmail"
                                            value={editForm.inviteeEmail}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            name="startTime"
                                            value={editForm.startTime}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="datetime-local"
                                            name="endTime"
                                            value={editForm.endTime || ''}
                                            onChange={handleChange}
                                        />
                                    </td>
                                    <td>
                                        <select
                                            name="status"
                                            value={editForm.status}
                                            onChange={handleChange}
                                        >
                                            <option value="scheduled">Scheduled</option>
                                            <option value="canceled">Canceled</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(registration.id)}>Save</button>
                                        <button onClick={handleCancelEdit}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{workouts.find(w => w.id === registration.eventId)?.name || registration.eventId}</td>
                                    <td>{registration.userId}</td>
                                    <td>{registration.inviteeEmail}</td>
                                    <td>{new Date(registration.startTime).toLocaleString()}</td>
                                    <td>{registration.endTime ? new Date(registration.endTime).toLocaleString() : 'N/A'}</td>
                                    <td>{registration.status}</td>
                                    <td>
                                        <button onClick={() => handleEdit(registration)}>Edit</button>
                                        <button onClick={() => handleDelete(registration.id)}>Delete</button>
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
