import api from './api';

export interface Registration {
    id: string;
    eventId: string;
    userId: string;
    inviteeEmail: string;
    startTime: string;
    endTime?: string;
    status: 'scheduled' | 'canceled' | 'completed';
}

export interface CreateRegistrationDto {
    eventId: string;
    userId: string;
    inviteeEmail: string;
    startTime: string;
    endTime?: string;
    status?: 'scheduled' | 'canceled' | 'completed';
}

class RegistrationsService {
    async getRegistrations(): Promise<Registration[]> {
        const response = await api.get('/registrations');
        return response.data;
    }

    async createRegistration(registration: CreateRegistrationDto): Promise<Registration> {
        const response = await api.post('/registrations', registration);
        return response.data;
    }

    async deleteRegistration(id: string): Promise<void> {
        await api.delete(`/registrations/${id}`);
    }

    async updateRegistration(id: string, data: Partial<CreateRegistrationDto>): Promise<Registration> {
        const response = await api.patch(`/registrations/${id}`, data);
        return response.data;
    }

    async getRegistrationById(id: string): Promise<Registration> {
        const response = await api.get(`/registrations/${id}`);
        return response.data;
    }
}

export const registrationsService = new RegistrationsService();
