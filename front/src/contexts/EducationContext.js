import { createContext, useState } from "react";

const EducationContext = createContext();

const EducationContextProvider = ({ children }) => {
    const [educationDocuments, setEducationDocuments] = useState([]);

    return (
        <EducationContext.Provider value={{educationDocuments, setEducationDocuments}}>
            {children}
        </EducationContext.Provider>
    );
};

export { EducationContext, EducationContextProvider};