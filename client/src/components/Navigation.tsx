import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { User } from "../types";

interface NavigationProps {
    user: User;
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
    const { role, id } = user;

    const location = useLocation();
    const [activeTab, setActiveTab] = useState(getActiveTab(location.pathname));

    function getActiveTab(pathname: string) {
        if (pathname.includes('appointments')) {
            // return 'appointments';
            return 1;
        } else if (pathname.includes('completed')) {
            // return 'completed';
            return 2;
        } else if (pathname.includes('create')) {
            // return 'create'
            return 3;
        };

        return 0;
    };

    const handleTabChange = (index: number) => {
        setActiveTab(index);
    };

    useEffect(() => {
        setActiveTab(getActiveTab(location.pathname));
    }, [location.pathname, activeTab])

    const baseUrl = user.role === 'student' ? '/learning' : '/coaching';

    if (location.pathname.includes('reserve')) return null;

    return (
        <nav>
            <Tabs index={activeTab}>
                <TabList>
                    <Tab as={NavLink} to={`${baseUrl}`} onClick={() => handleTabChange(0)}>
                        Home
                    </Tab>
                    <Tab as={NavLink} to={`${baseUrl}/${id}/appointments`} onClick={() => handleTabChange(1)}>
                        Appointments
                    </Tab> 
                    {
                        role === 'coach' && (
                            <Tab as={NavLink} to={`${baseUrl}/slots/completed`} onClick={() => handleTabChange(2)}>
                                Completed
                            </Tab>
                        )
                    }
                    {
                        role === 'coach' && (
                            <Tab as={NavLink} to={`${baseUrl}/slots/create`} onClick={() => handleTabChange(3)}>
                                Create
                            </Tab>
                        )
                    }
                </TabList>
            </Tabs>
        </nav>
    )
};

export default Navigation;