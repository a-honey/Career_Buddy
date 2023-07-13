import { createContext, useState } from "react";

const EditContext = createContext();

const EditContextProvider = ({ children }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <EditContext.Provider value={{ isEditing, setIsEditing}}>
            {children}
        </EditContext.Provider>
    );
};

export { EditContext, EditContextProvider};