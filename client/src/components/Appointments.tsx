import { Container, Stack } from "@chakra-ui/react";
import useAppointments from "../hooks/useAppointments";
import Appointment from "./Appointment";

const Appointments = () => {
    const { appointments, isLoading } = useAppointments();

    return (
        <>
            {
                isLoading ? 
                 <h1>Loading Appointments</h1> :
                 <Container mt='4'>
                    <Stack spacing='4'>
                        {
                            appointments.map((appointment, index) => <Appointment appointment={appointment} key={index}/>)
                        }
                    </Stack>
                 </Container>
            }
        </>
    )

};

export default Appointments;