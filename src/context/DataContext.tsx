"use client"
import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { getAllTasks } from "@/api"
import { TrackInfo } from "@/types/TrackInfo";
//import { AuthContext } from "./AuthContext";

export type DataContextType = {
    tracks: TrackInfo[], 
    setTracks: Dispatch<SetStateAction<TrackInfo[]>>,
    loadTracks: () => Promise<void>
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

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