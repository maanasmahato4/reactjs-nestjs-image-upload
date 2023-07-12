import { createContext } from "react";

export const GalleryContext = createContext({

})



export const GalleryProvider = ({children}: any) => {
    return <GalleryContext.Provider value={{}}>
        {children}
    </GalleryContext.Provider>
}