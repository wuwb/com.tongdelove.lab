import axios from '@/utils/axios';

class AuthService {
    login(email: string, password: string) {
        return axios.post('/auth/login', {
            email,
            password
        })
            .then(respose => {
                if (respose.status === 200) {
                    localStorage.setItem('user', JSON.stringify(respose.data));
                }
                return respose.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(email: string, name: string, password: string) {
        return axios.post('/auth/register', {
            email,
            name,
            password
        });
    }

    getCurrentUser() {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }
}

export default AuthService;
