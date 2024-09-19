import { useAxios } from '@/context/AxiosContext';
import { AxiosResponse } from 'axios';
import { useState } from 'preact/hooks';
import * as Yup from 'yup';
import { toast } from "sonner"
import { Redirect } from 'wouter';
interface LoginDetails {
    email: string;
    password: string;
}
interface LoginResponse {
    message: string;
    status: boolean;
    accessToken?:string;
    refreshToken?:string;
}
export default function useLogin() {
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    });
    const data = useAxios()
    const [show, setShow] = useState(false)
    const [remember, setRemember] = useState(false)
    const handleShow = () => setShow(!show)
    const handleLogin = async (values: LoginDetails) => {
        if (data && data.axiosInstance) {
            try {
                const response: AxiosResponse<LoginResponse> = await data.axiosInstance.post('/auth/login', values)
                console.log(response)
                if (response.data.status) {
                    toast.success(response.data.message)
                    Redirect({ href: "/dashboard" })
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