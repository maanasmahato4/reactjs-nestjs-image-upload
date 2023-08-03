export interface ISignUpAuth{
    username: string,
    email: string,
    password: string,
    confirm_password: string
}

export interface IAuth{
    email: string,
    password: string,
    confirm_password: string
}


export interface ISignupData{
    username: string
    email: string,
    password: string
}

export interface ISigninData{
    email: string,
    password: string
}

export interface IAuthContext {
    token: string,
    setToken: (token:string) => void,
    decodedToken: any,
    setDecodedToken: (decodedToken: any) => void
}

// Gallery types

export interface Iphotos {
    title: string,
    album: string,
    files: File[]
}



// album types

export interface IAlbum {
    album_name: string,
    user_id: number
}