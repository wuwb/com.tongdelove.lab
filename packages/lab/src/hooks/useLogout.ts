import axios from '@/utils/axios';
import { useAuth } from '@/contexts/auth';

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const response = await axios('/logout', {
                withCredentials: true,
            });
        } catch (err) {
            console.log(err);
        }
    }

    return logout;
}
