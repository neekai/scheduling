import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import config from "../config";
import useUser from "../hooks/useUser";
import CoachInfoCard from "./CoachInfoCard";
import { CoachType } from "../types";


const Coaches: React.FC = () => {
    const [coaches, setCoaches] = useState<CoachType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // we can add pagination here

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
        getCoaches();
    }, [])

    if (isLoading) return <Text>Loading Coaches...</Text>

    if (coaches.length === 0) return <Text>No Coaches Found</Text>

    return (
        <>
            {
                coaches.map((coach) => <CoachInfoCard coach={coach} key={coach.id}/>)
            }
        </>
    )

};

export default Coaches;