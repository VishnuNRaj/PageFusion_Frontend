import { useAxios } from '@/context/AxiosContext';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'preact/hooks';
import * as Yup from 'yup';
import { toast } from "sonner"
import useEssentials from './useEssentials';
import { useUser } from '@/context/UserContext';
interface LoginDetails {
    email: string;
    password: string;
}
interface LoginResponse {
    message: string;
    status: boolean;
    accessToken?: string;
    refreshToken?: string;
}
export default function useLogin() {
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });
    const { navigate, addCookie, verifyUser } = useEssentials()
    const data = useAxios()
    const [show, setShow] = useState(false)
    const { user } = useUser()
    const [remember, setRemember] = useState(false)
    const handleShow = () => setShow(!show)
    useEffect(() => {
        verifyUser()
    }, [])
    useEffect(() => {
        if (user && data) navigate("/dashboard")
    }, [user, data, data?.loading])
    const handleLogin = async (values: LoginDetails) => {
        if (data && data.axiosInstance) {
            try {
                const response: AxiosResponse<LoginResponse> = await data.axiosInstance.post('/auth/login', values)
                if (response.data.status && response.data.accessToken) {
                    toast.success(response.data.message)
                    addCookie("accessToken", response.data.accessToken)
                    navigate("/dashboard")
                }
            } catch (e: any) {
                console.log(e)
                toast.error(e.response.data.message)
            }
        }
    };

    function handleRemember() {
        setRemember(!remember)
    }

    return { validationSchema, show, handleShow, handleLogin, remember, handleRemember }
}