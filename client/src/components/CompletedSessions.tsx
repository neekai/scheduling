import { useState, useEffect } from 'react';
import { Button, Container, Stack, Text } from '@chakra-ui/react';
import config from '../config';
import { CompletedSessionType } from '../types';
import CompletedSession from './CompletedSession';

interface CompletedSessionsProps {
    userId: number;
};


const CompletedSessions: React.FC<CompletedSessionsProps> = ({ userId }) => {
    const [completedSessions, setCompletedSessions] = useState<CompletedSessionType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);


    const getCompletedSessions = async (page: number) => {
        try {
            const response = await fetch(`${config.COACH_API_URL}/${userId}/slots/completed?page=${page}`);
            const data = await response.json();
            setCount(data.count);
            setCompletedSessions([...completedSessions, ...data.rows]);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                console.log('err getting completed sessions', err);
            }
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        getCompletedSessions(currentPage);
    }, [currentPage])


    if (isLoading) return <Text>Loading sessions...</Text>

    if (error) return <Text color='tomato'>{error}</Text>

    return (
        <Container mt='4'>
            <Stack spacing='4'>
                {
                    completedSessions.map((session, index) => <CompletedSession session={session} key={index}/>)
                }
            </Stack>
            {
                count && completedSessions.length < count ?
                <Button onClick={() => setCurrentPage(prev => prev + 1)}>Load more sessions</Button> :
                null
            }
        </Container>
    )
};

export default CompletedSessions;