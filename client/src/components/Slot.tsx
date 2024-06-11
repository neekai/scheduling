import { Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { getFormattedTimeString } from "../utils/getFormattedTimeString";


interface Slot {
    id: number;
    startTime: Date;
    endTime: Date;
}

interface SlotProps {
    slot: Slot;
}

const Slot: React.FC<SlotProps> = ({ slot }) => {
    const navigate = useNavigate();

    const formattedStartTimeString = getFormattedTimeString(slot.startTime);

    const handleClick = () => {
        navigate(`reserve/${slot.id}`);
    };

    return (
        <Button colorScheme="yellow" variant='solid' size='sm' w='150px' onClick={handleClick}>
            {formattedStartTimeString}
        </Button>
    )
};

export default Slot;