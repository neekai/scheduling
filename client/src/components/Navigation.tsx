import { NavLink, useLocation } from "react-router-dom";
import { useState } from 'react';
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { User } from "../types";

interface NavigationProps {
    user: User;
}

const Navigation: React.FC<NavigationProps> = ({ user }) => {
    const { role, id } = user;

    const location = useLocation();


    const baseUrl = user.role === 'student' ? '/learning' : '/coaching';

    if (location.pathname.includes('reserve')) return null;

    return (
        <nav>
            <Tabs>
                <TabList>
                    <Tab as={NavLink} to={`${baseUrl}`}>
                        Home
                    </Tab>
                    <Tab as={NavLink} to={`${baseUrl}/${id}/appointments`}>
                        Appointments
                    </Tab> 
                    {
                        role === 'coach' && (
                            <Tab as={NavLink} to={`${baseUrl}/slots/completed`}>
                                Completed
                            </Tab>
                        )
                    }
                    {
                        role === 'coach' && (
                            <Tab as={NavLink} to={`${baseUrl}/slots/create`}>
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