import { 
    Button,
    Box,
    FormControl,
    FormLabel,
    Modal, 
    ModalOverlay, 
    ModalBody, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalFooter, 
    Text,
    Textarea, 
    VStack,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper, 
} from "@chakra-ui/react";
import { useState, useEffect, ChangeEvent } from 'react';
import { getFormattedTimeString } from "../utils/getFormattedTimeString";
import { CompletedSessionType } from "../types";
import config from "../config";


interface FeedbackModalProps {
    session: CompletedSessionType;
    onClose: () => void;
    isOpen: boolean;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, session }) => {
    const [rating, setRating] = useState(session.Feedback?.rating || 5);
    const [notes, setNotes] = useState(session.Feedback?.notes || '');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRatingChange = (value: string) => {
        setRating(parseInt(value));
    }

    const handleNotesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    const handleSave = async () => {
        console.log('session', session, session.coachId, session.id)
        try {
            setIsSaving(true);
            const response = await fetch(`${config.COACH_API_URL}/${session.coachId}/${session.id}/feedback`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    rating,
                    notes
                })
            });
            const data = await response.json();
            console.log('creating feedback', data);

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message)
            }
        } finally {
            setIsSaving(false);
        };
    };


    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{session.student?.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Text>{`Phone number: ${session.student?.phoneNumber}`}</Text>
                        <Text>{`Start Time: ${getFormattedTimeString(session.startTime)}`}</Text>
                        <Text>{`End Time: ${getFormattedTimeString(session.endTime)}`}</Text>
                        <FormControl>
                            <FormLabel>Rating</FormLabel>
                            <NumberInput onChange={handleRatingChange} min={1} max={5} value={rating}>
                                <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                            </NumberInput>
                            <FormLabel>Notes</FormLabel>
                            <Textarea value={notes} onChange={handleNotesChange} />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                        <Button disabled={isSaving} onClick={handleSave}>{isSaving ? 'Saving' : 'Save'}</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

};

export default FeedbackModal;