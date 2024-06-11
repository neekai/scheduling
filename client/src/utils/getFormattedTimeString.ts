export const getFormattedTimeString = (time: Date) => {
    const dateTime = new Date(time);
    const formattedDate = dateTime.toLocaleDateString();
    const formattedTime = dateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const formattedTimeString = `${formattedDate} ${formattedTime}`;
    
    return formattedTimeString;
}