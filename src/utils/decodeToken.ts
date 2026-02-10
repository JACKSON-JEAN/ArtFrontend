import { jwtDecode } from "jwt-decode"

export interface AppJwtPayload {
  sub: number;
  role: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): AppJwtPayload | null => {
  try {
    return jwtDecode<AppJwtPayload>(token);
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

export const getUserId = () => {
    const token = localStorage.getItem("accessToken")
    if(!token) return null

    const decoded = decodeToken(token)
    return decoded?.sub
}

export const getUsername = () => {
    const token = localStorage.getItem("accessToken")
    if(!token) return null

    const decoded = decodeToken(token)
    return decoded?.name
}

export const getUserRole = () =>{
    const token = localStorage.getItem("accessToken")
    if(!token) return null

    const decoded = decodeToken(token)
    return decoded?.role
}

export const getUserEmail = () =>{
    const token = localStorage.getItem("accessToken")
    if(!token) return null

    const decoded = decodeToken(token)
    return decoded?.email
}
