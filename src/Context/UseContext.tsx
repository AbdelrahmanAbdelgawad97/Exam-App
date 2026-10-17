import React, { createContext, useState } from "react";

type ExamContextType = {
    examID: string | undefined;
    setExamID: (id: string) => void;
    email: string | undefined;
    setEmail: (id: string) => void;
    role: string | undefined;
    setRole: (id: string) => void;
    diploma: string | undefined;
    setDiploma: (id: string) => void;
};

export const ExamContext = createContext<ExamContextType | undefined>(undefined);

export default function ExamContextProvider({children,}: {children: React.ReactNode}) {
    const [examID, setExamID] = useState<string | undefined>();
    const [email, setEmail] = useState<string | undefined>();
    const [role, setRole] = useState<string | undefined>();
    const [diploma, setDiploma] = useState<string | undefined>();

    return (
    <ExamContext.Provider value={{ examID, setExamID ,email ,setEmail,role,setRole , diploma , setDiploma}}>
        {children}
    </ExamContext.Provider>
    );
}