import api from './api';

export interface Trainee {
    id: string;
    name: string;
    email: string;
    timezone?: string;
}

export interface CreateTraineeDto {
    name: string;
    email: string;
    password: string;
    timezone?: string;  // Make timezone optional
}

class TraineesService {
    async getTrainees(): Promise<{ data: Trainee[] }> {
        const response = await api.get('/trainees', {
            params: {
                page: 1,
                pageSize: 100
            }
        });
        return response.data;
    }

    async createTrainee(trainee: CreateTraineeDto): Promise<Trainee> {
        console.log('Sending trainee data:', trainee);
        const response = await api.post('/trainees', trainee);
        console.log('Received response:', response);
        return response.data;
    }

    async deleteTrainee(id: string): Promise<void> {
        await api.delete(`/trainees/${id}`);
    }

    async updateTrainee(id: string, data: Partial<CreateTraineeDto>): Promise<Trainee> {
        const response = await api.patch(`/trainees/${id}`, data);
        return response.data;
    }

    async getTraineeById(id: string): Promise<Trainee> {
        const response = await api.get(`/trainees/${id}`);
        return response.data;
    }
}

export const traineesService = new TraineesService();
