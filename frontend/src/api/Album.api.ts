import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


export const useAlbumApi = () => {

    const { token, decodedToken } = useContext(AuthContext);

    const albumApi = axios.create({
        baseURL: "http://localhost:3000/album",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const getAlbums = async () => {
        const res = await albumApi.get(`/${decodedToken.id}`);
        return res.data;
    }

    const addAlbum = async (album: string) => {
        const res = await albumApi.post("/", { album_name: album, user_id: decodedToken.id });
        return res.data;
    }

    return { getAlbums, addAlbum };
}
