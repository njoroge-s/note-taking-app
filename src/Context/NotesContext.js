import React, { createContext, useContext, useEffect, useState } from 'react'
import { useUserAuth } from './UserAuthContext'
import NotesServices from '../Services/NotesServices';

const NotesContext = createContext();

export function NotesContextProvider({ children }) {
    const { user } = useUserAuth();
    const [notesObj, setNotesObj] = useState([]);

    const fetchUser = async () => {
        const response = await NotesServices.getUser(user.uid);
        if (response._document === null) {
            NotesServices.addUser(user.uid).then(() => {
                fetchUser();
            });
            return;
        }
        setNotesObj(response.data().notesObj);
    }

    useEffect(() => {
        if (user) {
            fetchUser();
        }
    }, [user]);

    useEffect(() => {
        // console.log(notesObj);
    }, [notesObj]);

    return (
        <NotesContext.Provider value={notesObj}>
            {children}
        </NotesContext.Provider>
    )
}

export function useNotesContext() {
    return useContext(NotesContext);
}