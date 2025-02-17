import React, { useEffect, useState } from 'react';
import { Registration, registrationsService } from '../services/registrations.service';

export const RegistrationList: React.FC = () => {
    const [registrations, setRegistrations] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRegistrations();
    }, []);

    const loadRegistrations = async () => {
        try {
            const data = await registrationsService.getRegistrations();
            setRegistrations(data);
        } catch (error) {
            console.error('Failed to load registrations:', error);
        } finally {
            setLoading(false);
        }
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
                        <th>Event ID</th>
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
                            <td>{registration.eventId}</td>
                            <td>{registration.userId}</td>
                            <td>{registration.inviteeEmail}</td>
                            <td>{new Date(registration.startTime).toLocaleString()}</td>
                            <td>{registration.endTime ? new Date(registration.endTime).toLocaleString() : 'N/A'}</td>
                            <td>{registration.status}</td>
                            <td>
                                <button onClick={() => handleDelete(registration.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
