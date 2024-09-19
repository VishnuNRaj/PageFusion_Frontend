// AxiosContext.js
import axios, { AxiosInstance } from 'axios';
import { Dispatch, useContext, useEffect, useState } from 'preact/hooks';
import { ReactNode, SetStateAction, createContext } from 'preact/compat';

export interface AxiosInterface {
    axiosInstance: AxiosInstance;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}
const AxiosContext = createContext<AxiosInterface | null>(null);

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_API || "",
    withCredentials: true,
});

export const AxiosProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axiosInstance.interceptors.request.use((config) => {
            setLoading(true)
            return config
        })
        axiosInstance.interceptors.response.use((config) => {
            setLoading(false)
            return config
        })
    }, [])
    return (
        <AxiosContext.Provider value={{ axiosInstance, loading, setLoading }}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxios = () => {
    const data = useContext(AxiosContext);
    return data
};
