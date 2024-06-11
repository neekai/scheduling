import { useContext } from "react";
import { UserContext, UserContextType } from "../context/UserContextProvider";

const useUser = (): UserContextType => {
    const context = useContext(UserContext);

    if (!context) throw new Error('useUser must be used within a user provider');

    return context;
}

export default useUser;