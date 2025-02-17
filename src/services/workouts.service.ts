import api from './api';

export interface Workout {
    id: string;
    name: string;
    duration: number;
    description?: string;
    color?: string;
}

export interface CreateWorkoutDto {
    name: string;
    duration: number;
    description?: string;
    color?: string;
}

class WorkoutsService {
    async getWorkouts(): Promise<Workout[]> {
        const response = await api.get('/workouts');
        return response.data;
    }

    async createWorkout(workout: CreateWorkoutDto): Promise<Workout> {
        const response = await api.post('/workouts', workout);
        return response.data;
    }

    async deleteWorkout(id: string): Promise<void> {
        await api.delete(`/workouts/${id}`);
    }

    async updateWorkout(id: string, data: Partial<CreateWorkoutDto>): Promise<Workout> {
        const response = await api.patch(`/workouts/${id}`, data);
        return response.data;
    }

    async getWorkoutById(id: string): Promise<Workout> {
        const response = await api.get(`/workouts/${id}`);
        return response.data;
    }
}

export const workoutsService = new WorkoutsService();
