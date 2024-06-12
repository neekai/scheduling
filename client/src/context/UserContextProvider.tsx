import { createContext, useState, useContext, ReactNode } from 'react';
import config from '../config';
import { UserContextType, User } from '../types';


interface UserProviderProps {
    children: ReactNode;
};


export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<UserProviderProps>  = ({ children })=> {
    const [user, setUser] = useState<User | null>(null);

    const switchUser = async (useUser: 'student' | 'coach') => {
        try {
            const data = useUser === 'student' ? await fetch(`${config.API_URL}/login/1`) : await fetch(`${config.API_URL}/login/3`);
            const user = await data.json();
            console.log('data', user);
            setUser(user);
            return user;
        } catch (err) {
            console.log('err', err);
        }
    }

    return (
        <UserContext.Provider value={{ user, switchUser }}>
            {children}
        </UserContext.Provider>
    )
};