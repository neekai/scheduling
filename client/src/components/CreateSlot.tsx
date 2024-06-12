import { useState, useEffect, ChangeEvent } from 'react';
import { Container, Button, Stack, Text } from "@chakra-ui/react";
import moment from 'moment';
import { useParams, useNavigate } from "react-router";
import config from "../config";


interface CreateSlotProps {
    userId: number;
};

const CreateSlot: React.FC<CreateSlotProps> = ({ userId }) => {
    const [time, setTime] = useState<string>('');
    const [minTime, setMinTime] = useState<string>();
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setIsSending(true);

            const startTime = new Date(time);
            const endTime = new Date(startTime.getTime() + (2 * 60 * 60 * 1000)); 
            console.log('userId', userId)
            const response = await fetch(`${config.COACH_API_URL}/${userId}/slots`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    startTime: startTime.toISOString(),
                    endTime: endTime.toISOString()
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            };

            navigate('/coaching', { replace: true })

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                console.log('Error reserving slot', err);
            }
        } finally {
            setIsSending(false);
        }
    }

    useEffect(() => {
        const currentDate = moment();

        // Set the time to next day at 8 AM
        const nextDay = currentDate.add(1, 'day').startOf('day').hour(8);
    
        // Format the date to the required format "yyyy-MM-ddThh:mm"
        const formattedTime = nextDay.format('YYYY-MM-DDTHH:mm');
    
        // Update the state with the formatted time
        setTime(formattedTime);
        setMinTime(formattedTime);
    }, []); 


    return (
        <Container padding='5'>
            <Text color='tomato'>{error}</Text>
            <form onSubmit={handleSubmit}>
                <Stack spacing='10'>
                    <input type='datetime-local' value={time} onChange={handleChange} min={minTime}/>
                    <Button disabled={isSending} type='submit'>{isSending ? 'Creating': 'Create'}</Button>
                </Stack>
            </form>
        </Container>
    )

};

export default CreateSlot;