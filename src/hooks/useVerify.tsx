import { useAxios } from '@/context/AxiosContext';
import { AxiosResponse } from 'axios';
import { useEffect } from 'preact/hooks';
import { toast } from 'sonner';
import { Redirect, useLocation } from 'wouter';

interface VerifyResponse {
    message: string;
    status: boolean;
    token: string;
    refresh: string;
}

export default function useVerify() {
    const [location] = useLocation();
    const data = useAxios()
    useEffect(() => {
        if (location) {
            const queryParams = new URLSearchParams(location);
            const token = queryParams.get('token');
            if (token) handleVerify(token)
            else handleError();
        }
    }, [])

    function handleError() {
        toast.error("Invalid Credentials")
        Redirect({ href: "/dashboard" })
    }
    async function handleVerify(token: string) {
        if (data) {
            try {
                const response: AxiosResponse<VerifyResponse> = await data.axiosInstance.get('/auth/verifyToken', {
                    headers: {
                        "Authorization": token
                    }
                })
                if (response.data.status) {
                    toast.success(response.data.message)
                    Redirect({ href: "/dashboard" })
                }
            } catch (e: any) {
                toast.error(e.response.data.message)
            }
        }
    }
    return data;
}
