import { useLocation } from "wouter";
import * as Cookies from "js-cookie"
import { useAxios } from "@/context/AxiosContext";
import { AxiosResponse } from "axios";
import { useUser } from "@/context/UserContext";

export interface IUser {
    id: string;
    name: string;
    email: string;
    twoStepVerification: boolean;
    verified: boolean;
}

export interface VerifyUserResponse {
    message: string;
    status: boolean;
    user: IUser;
}

export default function useEssentials() {
    const [location, navigate] = useLocation()
    const data = useAxios()
    const { setUser, logout } = useUser()
    function getCookie(name: string) {
        return Cookies.default.get(name)
    }
    function addCookie(name: string, token: string) {
        return Cookies.default.set(name, token)
    }
    function removeCookie(name: string) {
        return Cookies.default.remove(name)
    }

    async function verifyUser() {
        const token = getCookie("accessToken")
        try {
            if (token && data) {
                const response: AxiosResponse<VerifyUserResponse> = await data.axiosInstance.get("/auth/verify", {
                    headers: {
                        Authorization: token,
                    }
                })
                if (response.data.status) {
                    setUser(response.data.user)
                    return true;
                }
            } else return false;
        } catch (e:any) {
            if(!e?.response?.data?.status) {
                logout()
            }
            return false;
        }
    }
    return { location, navigate, getCookie, addCookie, removeCookie, verifyUser }
}