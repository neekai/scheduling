import CoachInfo from "./CoachInfo";
import { Button, Card, CardBody, CardFooter, VStack, useDisclosure } from "@chakra-ui/react";
import Slot from "./Slot";
import CoachAvailabilityModal from "./CoachOpenSlots";

interface CoachSlot {
    id: number;
    startTime: Date;
    endTime: Date;
}


interface Coach {
    id: number;
    name: string;
    phoneNumber: string;
    coachSlots: CoachSlot[];
}

interface CoachInfoCardProps {
    coach: Coach;
}

const CoachInfoCard: React.FC<CoachInfoCardProps> = ({ coach }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Card 
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                padding='2'
                margin='5'
                w='50%'
                h='300px'
                justifyContent='space-between'
            >
                <CoachInfo coach={coach}/>
                <VStack>
                    <CardBody pt='0'>
                        <VStack>
                        {
                            coach.coachSlots.map((slot) => <Slot slot={slot} key={slot.id}/>)
                        }
                        
                        </VStack>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={onOpen}>View all Availability</Button>
                    </CardFooter>
                </VStack>
            </Card>
            <CoachAvailabilityModal isOpen={isOpen} onClose={onClose} coach={coach} />
        </>
    )
};

export default CoachInfoCard;