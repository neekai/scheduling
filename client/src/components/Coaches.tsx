import { useEffect, useState } from "react";
import config from "../config";
import useUser from "../hooks/useUser";
import CoachInfoCard from "./CoachInfoCard";

interface Coach {
    id: number;
    name: string;
    phoneNumber: string;
    coachSlots: [];
}

const Coaches: React.FC = () => {
    const [coaches, setCoaches] = useState<Coach[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = useUser();

    const getCoaches = async () => {
        try {
            const data = await fetch(`${config.STUDENT_API_URL}/${user?.id}`);
            const coaches = await data.json();
            console.log('get coaches', coaches);
            setCoaches(coaches.rows);
        } catch (err) {
            console.log('err', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!coaches) {
            getCoaches();
        };
    }, [])

    return (
        <>
            {
                isLoading ? 
                    <h1>Loading Coaches...</h1> :
                    coaches?.map((coach) => <CoachInfoCard coach={coach} key={coach.id}/>)
            }
        </>
    )

};

export default Coaches;