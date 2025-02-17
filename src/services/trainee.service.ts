import { api } from './api.config';
import { Trainee } from '../types/api.types';

export const traineeService = {
    async getTrainees(): Promise<Trainee[]> {
        const response = await api.get<{ data: Trainee[] }>('/trainees');
        return response.data.data;
    },

    async getTraineeById(id: string): Promise<Trainee> {
        const response = await api.get<Trainee>(`/trainees/${id}`);
        return response.data;
    },

    async createTrainee(trainee: Omit<Trainee, 'id'>): Promise<Trainee> {
        const response = await api.post<Trainee>('/trainees', trainee);
        return response.data;
    }
};
