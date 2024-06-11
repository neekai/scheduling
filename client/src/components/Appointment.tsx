import { Card, CardBody, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
import useUser from "../hooks/useUser";
import { getFormattedTimeString } from "../utils/getFormattedTimeString";

interface Coach {
    name: string;
    phoneNumber: string;
}
interface Student {
    name: string;
    phoneNumber: string;
}

interface Appointment {
    startTime: Date;
    endTime: Date;
    coach?: Coach;
    student?: Student;
};

interface AppointmentProps {
    appointment: Appointment;
}

const Appointment: React.FC<AppointmentProps> = ({ appointment }) => {
    const { user } = useUser();

    const name = user?.role === 'student' ? appointment.coach?.name : appointment.student?.name;

    return (
        <Card>
            <CardHeader>
                <Heading size='md'>{name}</Heading>
            </CardHeader>
            <CardBody>
                <Stack>
                    <Text>{`Start Time: ${getFormattedTimeString(appointment.startTime)}`}</Text>
                    <Text>{`End Time: ${getFormattedTimeString(appointment.endTime)}`}</Text>
                </Stack>
            </CardBody>
        </Card>
    )
};

export default Appointment;