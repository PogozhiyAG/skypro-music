"use client"
import { createContext, useContext, useState } from "react";
import { getAllTasks } from "@/api"
import { TrackInfo } from "@/types/TrackInfo";
//import { AuthContext } from "./AuthContext";

export const DataContext = createContext({});

export const DataContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {    
    const [tracks, setTracks] = useState<TrackInfo[]>([]);
    //const {auth} = useContext(AuthContext);

    const loadTracks = () =>  
        getAllTasks()
        .then(tracks => setTracks(tracks))

    const value = {
        tracks, 
        setTracks,

        loadTracks
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );    
}