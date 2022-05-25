
import { useAuth } from '@/common/auth';

const ProfilePage = () => {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div>
            <h1>Profile Page</h1>
        </div>
    );
};

export default ProfilePage;
