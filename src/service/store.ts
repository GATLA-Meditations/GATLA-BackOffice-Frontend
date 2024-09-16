export const setToken = (token: string) => {
    localStorage.setItem('token', token);
};

export const removeToken = () => {
    localStorage.removeItem('token');
    console.log('Token removed');
};

export const getToken = () => {
    return localStorage.getItem('token');
};
