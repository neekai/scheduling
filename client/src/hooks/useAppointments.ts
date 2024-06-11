import { useState, useEffect } from "react";
import config from "../config";
import useUser from "./useUser";

const useAppointments = () => {
    const { user }= useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    
    const getAppointments = async () => {
        const baseUrl = user?.role === 'student' ? config.STUDENT_API_URL : config.COACH_API_URL;
        try {
            setIsLoading(true);
            const data = await fetch(`${baseUrl}/${user?.id}/appointments`);
            const appointments = await data.json();
            console.log('appointments', appointments);
            setAppointments(appointments);

        } catch (err) {
            console.log('err fetching appointments', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAppointments();
    }, []);

    return { appointments, isLoading };

};

export default useAppointments;