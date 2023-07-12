import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const useGalleryApi = () => {
    const { token, decodedToken } = useContext(AuthContext);

    const galleryApi = axios.create({
        baseURL: "http://localhost:3000/gallery"
    })
    const add = async ({ title, files }: { title: string; files: any }) => {

        const formData = new FormData();
        formData.append("title", title);
        formData.append("userId", decodedToken.id);

        Object.values(files).forEach((fileItem: any) => {
            if (Array.isArray(fileItem)) {
                fileItem.forEach((file: File) => {
                    formData.append("files", file);
                });
            } else {
                formData.append("files", fileItem);
            }
        });

        await galleryApi.post("/uploads", formData, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    };

    return { add };
}
