import { useState, useEffect } from "react";
import config from "../config";
import useUser from "./useUser";
import { Appointment } from "../types";


const useAppointments = (page: number) => {
    const { user }= useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [count, setCount] = useState(null);
    const [error, setError] = useState<string | null>(null);
    
    const getAppointments = async (currentPage: number) => {
        const baseUrl = user?.role === 'student' ? config.STUDENT_API_URL : config.COACH_API_URL;
        try {
            // setIsLoading(true);
            const data = await fetch(`${baseUrl}/${user?.id}/appointments?page=${currentPage}`);
            const result = await data.json();
            setCount(result.count);
            setAppointments([...appointments, ...result.rows]);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
                console.log('err fetching appointments', err);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAppointments(page);
    }, [page]);

    return { appointments, isLoading, count, error };

};

export default useAppointments;