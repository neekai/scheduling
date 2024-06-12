import { useEffect, useState } from 'react';
import { Button, Container, Divider, Stack, Text } from '@chakra-ui/react';
import Slot from './Slot';
import config from '../config';
import { User, SlotType } from '../types';

interface UpComingSlotsProps {
    user: User;
}

const UpComingSlots: React.FC<UpComingSlotsProps> = ({ user }) => { 
    const [upComingSlots, setUpcomingSlots] = useState<SlotType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getUpcomingSlots = async (page: number) => {
        try {
            const data = await fetch(`${config.COACH_API_URL}/${user.id}?page=${page}`);
            const result = await data.json();
            setCount(result.count);
            setUpcomingSlots([...upComingSlots, ...result.rows]);
        } catch (err) {
            if (err instanceof Error){
                setError(err.message || 'Failed to fetch upcoming slots');
            }
        } finally {
            setIsLoading(false);
        };
    };

    const handleClick = (id: number) => {
        console.log('Selecting slot', id);
    };

    useEffect(() => {
        getUpcomingSlots(currentPage);
    }, [currentPage]);

    if (isLoading) return <Text>Loading Slots...</Text>;

    if (upComingSlots && upComingSlots.length === 0) return <Text>No Upcoming Slots</Text>

    if (error) return <Text>Error: {error} </Text>

    return (
        <>
            <Stack justifyContent={'space-between'} p='5'>
                {
                    upComingSlots?.map((slot) => <Slot slot={slot} key={slot.id} onClick={() => handleClick(slot.id)}/>)
                }
                <Divider />
            </Stack>
            {
                count && upComingSlots && upComingSlots.length < count ? 
                    <Container>
                        <Button w='150px' onClick={() => setCurrentPage(prev => prev + 1)}>
                            View more slots
                        </Button>
                    </Container> : 
                    null
            }
        </>


    )
};

export default UpComingSlots; 