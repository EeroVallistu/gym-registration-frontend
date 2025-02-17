export const saveLastLocation = (path: string) => {
    if (path !== '/login' && path !== '/register') {
        localStorage.setItem('lastLocation', path);
    }
};

export const getLastLocation = () => {
    return localStorage.getItem('lastLocation') || '/trainees';
};
