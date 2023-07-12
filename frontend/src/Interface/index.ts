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
    files: File[]
}