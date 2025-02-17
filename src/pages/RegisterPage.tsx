import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { traineesService } from '../services/trainees.service';

export const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        timezone: ''
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await traineesService.createTrainee(formData);
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Please try again.');
            console.error(err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="register-page">
            <form onSubmit={handleSubmit} className="register-form">
                <h1>Register</h1>
                {error && <div className="error-message">{error}</div>}
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
