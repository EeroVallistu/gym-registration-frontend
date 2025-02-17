export interface Trainee {
    id: string;
    name: string;
    email: string;
    timezone?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    token: string;
}

export interface ApiError {
    message: string;
}
