import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
    name: string;
    id: number;
    role: 'student' | 'coach';
    phoneNumber: string;
};


interface LoginProps {
    switchUser: (useUser: 'student' | 'coach') => Promise<User>; 
}

const Login: React.FC<LoginProps> = ({ switchUser }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const getUser = async (user: 'student' | 'coach') => {
        try {
            setIsLoading(true);

            const currentUser = await switchUser(user);
            
            const path = currentUser.role === 'student' ? '/learning' : '/coaching'
            console.log('currentUser', currentUser)
            navigate(`${path}/${currentUser.id}`);

        } catch (err) {
            console.log('err', err);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div>
            {
                isLoading ? 
                    <div> Loading... </div> : 
                    <div>
                        <button onClick={() => getUser('student')}>Continue as student</button>
                        <button onClick={() => getUser('coach')}>Continue as coach</button>
                    </div>
            }
        </div>
    )
}

export default Login;