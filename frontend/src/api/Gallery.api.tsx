import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export const useGalleryApi = () => {
    const { token, decodedToken } = useContext(AuthContext);

    const galleryApi = axios.create({
        baseURL: "http://localhost:3000/gallery",
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${token}`,
        }
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
                "Content-Type": "multipart/form-data",
            },
        });
    };

    const getPhotos = async (userId: number) => {
        const res = await galleryApi.get(`/${userId}`);
        return res.data;
    }

    const deletePhoto = async (id: number) => {
        const res = await galleryApi.delete(`/${id}`);
        return res;
    }

    const downloadPhoto = async (id: number, fileName: string) => {
        const response = await galleryApi.get(`/download/${id}`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    }

    return { add, getPhotos, deletePhoto, downloadPhoto };
}
