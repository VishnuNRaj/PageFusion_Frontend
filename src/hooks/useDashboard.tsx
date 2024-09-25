import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "preact/hooks";
import useEssentials, { IUser } from "./useEssentials";
import { useAxios } from "@/context/AxiosContext";
import { AxiosResponse } from "axios";
import { toast } from "sonner";

export interface PDF {
    fileName: string;
    _id: string;
}

interface PDFResponse {
    status: boolean;
    pdfs: PDF[];
    message: string;
    user: IUser
}

export default function useDashboard() {
    const { user, setUser, logout } = useUser()
    const { navigate, getCookie } = useEssentials()
    const [pdfs, setPDfs] = useState<PDF[]>([])
    const data = useAxios()
    const [key, setKey] = useState("")
    const [open, setOpen] = useState<string | null>(null)
    const [load, setLoad] = useState(false)
    async function verifyUser(): Promise<boolean> {
        try {
            setLoad(true)
            const token = getCookie("accessToken")
            if (data && token) {
                const response: AxiosResponse<PDFResponse> = await data.axiosInstance.get("/pdf/all", {
                    headers: {
                        Authorization: token
                    }
                })
                console.log(response)
                setUser(response.data.user)
                setPDfs(response.data.pdfs)
                return response.data.status
            }
            return false
        } catch (e: any) {
            toast.error(e.response.data.message)
            return false;
        } finally {
            setLoad(false)
        }
    }
    async function verifyKey() {
        setLoad(true)
        const token = getCookie("accessToken")
        try {
            if (data && token && key.length > 0 && open) {
                const response: AxiosResponse<{ key: string, status: boolean, message: string }> = await data.axiosInstance.post("/pdf/key", {
                    key, id:open
                }, {
                    headers: {
                        Authorization: token
                    }
                })
                if (response.data.key) {
                    navigate(`/pdf/${response.data.key}`)
                }
            }
        } catch (e: any) {
            toast.error(e.response.data.message);
            setOpen(null)
            setKey("")
        } finally {
            setLoad(false)
        }
    }

    useEffect(() => {
        verifyUser().then((res) => {
            if (!res) {
                logout()
                navigate("/login")
            }
        })
    }, [])
    function handleOpen(id: string) {
        setOpen(id)
    }
    function handleKey(e: string) {
        setKey(e)
    }
    function cancel() {
        setLoad(true)
        setOpen(null)
        setKey("")
        setLoad(false)
    }
    return { user, navigate, pdfs, key, verifyKey, open, handleKey, handleOpen, load,cancel }
}

