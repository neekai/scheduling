import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Container, VStack, Text } from "@chakra-ui/react";
import { getFormattedTimeString } from "../utils/getFormattedTimeString";

import config from "../config";

interface Coach {
    id: number;
    name: string;
    phoneNumber: string;
}

interface Slot {
    startTime: Date;
    endTime: Date;
    coach: Coach;
}


const ReserveSlot: React.FC = () => {
    const [slot, setSlot] = useState<Slot | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isReserving, setIsReserving] = useState(false);

    const { studentId, slotId } = useParams();
    const navigate = useNavigate();

    const getSlot = async () => {
        try {
            const data = await fetch(`${config.STUDENT_API_URL}/${studentId}/reserve/${slotId}`);
            console.log('data', data)
            const slot = await data.json();

            console.log('slot', slot);
            setSlot(slot);

        } catch (err) {
            console.log('err getting slots', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReserveSlot = async () => {
        try {
            setIsReserving(true);
            await fetch(`${config.STUDENT_API_URL}/${studentId}/reserve/${slotId}`, {
                method: 'PATCH',
            });

            console.log('reserve slot success')
            navigate(`/learning/${studentId}/appointments`, { replace: true })

        } catch (err) {
            console.log('Error reserving slot', err);
        } finally {
            setIsReserving(false);
        }
    }

    useEffect(() => {
        getSlot();
    }, [])

    return (
        <>
            {
                isLoading ?
                    <h1>Fetching Slot...</h1> :
                    <Container maxW='md' centerContent>
                        <VStack>
                            <Text>{slot?.coach.name}</Text>
                            <Text>{slot?.coach.phoneNumber}</Text>
                            <Text>{`Start Time: ${getFormattedTimeString(slot?.startTime as Date)}`}</Text>
                            <Text>{`End Time: ${getFormattedTimeString(slot?.endTime as Date)}`}</Text>
                            <Button colorScheme="yellow" variant='solid' size='sm' w='150px' disabled={isReserving} onClick={handleReserveSlot}>Reserve</Button>
                        </VStack>
                    </Container>
            }
        </>
    )

};

export default ReserveSlot;