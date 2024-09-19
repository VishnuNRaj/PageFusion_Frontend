import { useAxios } from '@/context/AxiosContext';
import { AxiosResponse } from 'axios';
import { useState } from 'preact/hooks';
import { toast } from 'sonner';
import { Redirect } from 'wouter';
import * as Yup from 'yup';

interface SignupDetails {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterResponse {
    message: string;
    status: boolean;
}

export default function useSignup() {
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);
    const data = useAxios()
    const handleSignup = async (values: SignupDetails) => {
        console.log('Signing up with:', values);
        if (data) {
            try {
                const response: AxiosResponse<RegisterResponse> = await data.axiosInstance.post('/auth/signup', values)
                if (response.data.status) {
                    toast.success(response.data.message)
                    return Redirect({ href: "/dashboard" })
                } else throw new Error("Internal Server Error")
            } catch (e: any) {
                return toast.error(e.response.data.message)
            }
        }
    };

    return { validationSchema, show, handleShow, handleSignup };
}
