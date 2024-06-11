import { Button, Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, VStack } from "@chakra-ui/react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router";
import Slot from "./Slot";
import config from "../config";

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

interface CoachAvailabilityModalProps {
    coach: Coach;
    onClose: () => void;
    isOpen: boolean;
}

const CoachAvailabilityModal: React.FC<CoachAvailabilityModalProps> = ({ isOpen, onClose, coach }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [openSlots, setOpenSlots] = useState(coach.coachSlots);
    const [isLoading, setIsLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(null);

    const { studentId } = useParams();

    const getMoreSlots = async (page: number) => {
        try {
            setIsLoading(true);
            const data = await fetch(`${config.STUDENT_API_URL}/${studentId}/${coach.id}/availability?page=${page}`);
            const result = await data.json();
            setTotalCount(result.count);
            console.log('result', result)
            setOpenSlots([...openSlots, ...result.rows]);

        } catch (err) {
            console.log('err getting coach\'s availability', err);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (currentPage > 1) {
            getMoreSlots(currentPage);
        }
    }, [currentPage]);


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{coach.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        {
                            openSlots.map((slot) => <Slot slot={slot} key={slot.id}/>)
                        }
                    </VStack>
                </ModalBody>
                {
                    totalCount && openSlots.length >= totalCount || isLoading?
                    null :
                    <ModalFooter>
                        <Button onClick={() => setCurrentPage(prev => prev + 1)}>Show more availability</Button>
                    </ModalFooter>
                }
            </ModalContent>
        </Modal>
    )

};

export default CoachAvailabilityModal;