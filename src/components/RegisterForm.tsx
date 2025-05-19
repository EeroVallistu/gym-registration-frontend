import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { traineesService } from '../services/trainees.service';
import { TimeZoneSelect } from './TimeZoneSelect';

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    timezone?: string;  // Changed to optional
}

export const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        // Name must not be only spaces
        if (!formData.name.trim()) {
            setError('Name cannot be only spaces.');
            return;
        }
        // Password must not be only spaces
        if (!formData.password.trim()) {
            setError('Password cannot be only spaces.');
            return;
        }
        try {
            const submitData: RegisterFormData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                ...(formData.timezone && { timezone: formData.timezone })
            };
            await traineesService.createTrainee(submitData);
            navigate('/login', { state: { message: 'Registration successful. Please log in.' } });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleTimezoneChange = (timezone: string) => {
        setFormData(prev => ({
            ...prev,
            timezone
        }));
    };

    return (
        <div className="auth-form-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Register</h2>
                {error && <div className="error-message">{error}</div>}
                
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
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                </div>

                <div className="form-group">
                    <label>Timezone (optional):</label>
                    <TimeZoneSelect
                        value={formData.timezone || ''}
                        onChange={handleTimezoneChange}
                    />
                </div>

                <button type="submit">Register</button>
                
                <div className="auth-links">
                    <a href="/login">Already have an account? Log in</a>
                </div>
            </form>
        </div>
    );
};
