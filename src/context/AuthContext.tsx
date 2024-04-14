"use client"
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const getUserFromLocalStorage = () => {
    try {
        return JSON.parse(window.localStorage.user);
    } catch (error) {
        return null;
    }
};

export const AuthContextProvider : React.FC<{children: React.ReactNode}> = ({children}) => { 
    const [auth, setAuth] = useState(getUserFromLocalStorage());

    useEffect(() => {
        if (auth) {
            window.localStorage.user = JSON.stringify(auth);
        } else {
            delete window.localStorage.user;
        }   
    }, [auth])

    const value = {
        auth,
        setAuth
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );    
}