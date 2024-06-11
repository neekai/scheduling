import { Stack, Heading, Text } from "@chakra-ui/react";

interface Coach {
    name: string;
    phoneNumber: string;
}

interface CoachInfoProps {
    coach: Coach;
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