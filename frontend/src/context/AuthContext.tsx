import { createContext, useState, useEffect } from "react";
import { IAuthContext } from "../Interface";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext<IAuthContext>({
    token: '',
    setToken: () => {},
    decodedToken: '',
    setDecodedToken: () => {}
});

export const AuthProvider = ({ children }: any) => {
    const [token, setToken] = useState<string>('');
    const [decodedToken, setDecodedToken] = useState<any>();
    useEffect(() => {
        const cookieToken = Cookies.get("token");
        if (cookieToken) {
          setToken(cookieToken);
          setDecodedToken(jwtDecode(cookieToken));
        } else {
          Cookies.set("token", token);
        }
      }, [token]);
    return <AuthContext.Provider value={{ token, setToken, decodedToken, setDecodedToken }}>
        {children}
    </AuthContext.Provider>
}