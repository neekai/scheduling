import { Stack, Heading, Text } from "@chakra-ui/react";
import { CoachType } from "../types";


interface CoachInfoProps {
    coach: CoachType;
}

const CoachInfo: React.FC<CoachInfoProps> = ({ coach }) => {
    return (
        <Stack>
            <Heading size='md'>{coach.name}</Heading>
            <Text py='2'>
                {coach.phoneNumber}
            </Text>
        </Stack>
    )
};

export default CoachInfo;