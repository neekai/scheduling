import { Card, CardHeader, CardBody, Heading, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { getFormattedTimeString } from "../utils/getFormattedTimeString";
import { CompletedSessionType } from "../types";
import FeedbackModal from "./FeedbackModal";

interface CompletedSessionProps {
    session: CompletedSessionType;
}

const CompletedSession: React.FC<CompletedSessionProps> = ({ session }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Card onClick={onOpen} cursor='pointer'>
                <CardHeader>
                    <Heading size='md'>{`Student name: ${session.student?.name}`}</Heading>
                </CardHeader>
                <CardBody>
                    <Stack>
                        <Text>{`Phone number: ${session.student?.phoneNumber}`}</Text>
                        <Text>{`Start Time: ${getFormattedTimeString(session.startTime)}`}</Text>
                        <Text>{`End Time: ${getFormattedTimeString(session.endTime)}`}</Text>
                    </Stack>
                </CardBody>
            </Card>
            <FeedbackModal isOpen={isOpen} onClose={onClose} session={session}/>
        </>
    )
};

export default CompletedSession;