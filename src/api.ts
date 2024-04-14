import { TrackInfo } from "./types/TrackInfo";

const API_CATALOG_URL: string = "https://skypro-music-api.skyeng.tech/catalog";
const API_TRACKS_URL: string = API_CATALOG_URL + '/track'

export const getAllTasks = (): Promise<TrackInfo[]> => {
    return fetch(API_TRACKS_URL + '/all', {
        method: "GET"
    }).then(response => {
        return response.json()
    }).then(data => {
        return data as TrackInfo[]
    });
}