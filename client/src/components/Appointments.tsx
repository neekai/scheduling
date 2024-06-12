import { useState } from "react";
import { Button, Container, Stack, Text } from "@chakra-ui/react";
import useAppointments from "../hooks/useAppointments";
import Appointment from "./Appointment";

const Appointments = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { appointments, isLoading, count, error } = useAppointments(currentPage);

    if (isLoading) return <Text>Loading Appointments...</Text>

    if (error) return <Text color='tomato'>{error}</Text>

    return (
        <Container mt='4'>
            <Stack spacing='4'>
                {
                    appointments.map((appointment, index) => <Appointment appointment={appointment} key={index}/>)
                }
            </Stack>
            {
                count && appointments.length < count ?
                <Button onClick={() => setCurrentPage(prev => prev + 1)}>Load more appointments</Button> :
                null
            }
        </Container>
    )
};

export default Appointments;