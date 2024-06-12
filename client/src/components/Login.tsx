import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Stack, Text } from "@chakra-ui/react";

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
            navigate(`${path}`);

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
                    <Text> Loading... </Text> : 
                    <Container p='20'>
                        <Stack>
                            <Text textAlign='center' fontSize='large'>Pick a user</Text>
                            <Button onClick={() => getUser('student')}>Continue as student</Button>
                            <Button onClick={() => getUser('coach')}>Continue as coach</Button>
                        </Stack>
                    </Container>
            }
        </div>
    )
}

export default Login;