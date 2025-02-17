import api from './api';

export interface TimeSlot {
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    startTime: string;
    endTime: string;
}

export interface Routine {
    id: string;
    userId: string;
    availability: TimeSlot[];
}

export interface CreateRoutineDto {
    userId: string;
    availability: TimeSlot[];
}

class RoutinesService {
    async getRoutines(): Promise<Routine[]> {
        const response = await api.get('/routines');
        return response.data;
    }

    async createRoutine(routine: CreateRoutineDto): Promise<Routine> {
        const response = await api.post('/routines', routine);
        return response.data;
    }

    async deleteRoutine(traineeId: string): Promise<void> {
        await api.delete(`/routines/${traineeId}`);
    }

    async updateRoutine(traineeId: string, data: { availability: TimeSlot[] }): Promise<Routine> {
        const response = await api.patch(`/routines/${traineeId}`, data);
        return response.data;
    }

    async getRoutineByTrainee(traineeId: string): Promise<Routine> {
        const response = await api.get(`/routines/${traineeId}`);
        return response.data;
    }
}

export const routinesService = new RoutinesService();
