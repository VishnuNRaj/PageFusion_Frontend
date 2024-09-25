import { useAxios } from '@/context/AxiosContext';
import { AxiosResponse } from 'axios';
import { useEffect } from 'preact/hooks';
import { toast } from 'sonner';
import { useLocation, useParams } from 'wouter';

interface VerifyResponse {
    message: string;
    status: boolean;
    token: string;
    refresh: string;
}

export default function useVerify() {
    const [, navigate] = useLocation();
    const params = useParams();
    const data = useAxios();

    useEffect(() => {
        const { token } = params;
        if (token) {
            handleVerify(token);
        } else {
            handleError();
        }
    }, [params]);

    function handleError() {
        toast.error("Invalid Credentials");
        navigate('/dashboard');
    }

    async function handleVerify(token: string) {
        if (data) {
            try {
                const response: AxiosResponse<VerifyResponse> = await data.axiosInstance.get('/auth/verifyToken', {
                    headers: {
                        "Authorization": `${token}`
                    }
                });

                if (response.data.status) {
                    toast.success(response.data.message);
                    navigate('/dashboard');
                }
            } catch (e: any) {
                toast.error(e?.response?.data?.message || 'Verification failed');
            }
        }
    }

    return data;
}
