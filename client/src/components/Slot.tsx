import { Button } from "@chakra-ui/react";
import { getFormattedTimeString } from "../utils/getFormattedTimeString";


interface Slot {
    id: number;
    startTime: Date;
    endTime: Date;
}

interface SlotProps {
    slot: Slot;
    onClick: React.MouseEventHandler<HTMLButtonElement> 
}

const Slot: React.FC<SlotProps> = ({ slot, onClick }) => {
    
    const formattedStartTimeString = getFormattedTimeString(slot.startTime);

    return (
        <Button colorScheme="yellow" variant='solid' size='sm' w='150px' onClick={onClick}>
            {formattedStartTimeString}
        </Button>
    )
};

export default Slot;