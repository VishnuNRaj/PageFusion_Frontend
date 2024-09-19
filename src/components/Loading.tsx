import { useAxios } from "@/context/AxiosContext";
import { ReactNode, useState, useEffect } from "preact/compat";
import { Progress } from "./ui/progress";

export default function LoadingBar({ children }: { children: ReactNode }) {
    const data = useAxios();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!data) return;

        const handleRequest = (config: any) => {
            setLoading(true);
            if (config.onDownloadProgress) {
                const originalOnDownloadProgress = config.onDownloadProgress;
                config.onDownloadProgress = (event: any) => {
                    const progress = (event.loaded / event?.total as number) * 100;
                    setProgress(progress);
                    if (originalOnDownloadProgress) {
                        originalOnDownloadProgress(event);
                    }
                };
            }
            return config;
        };

        const handleResponse = () => {
            setLoading(false);
            setProgress(0);
        };

        data.axiosInstance.interceptors.request.use(handleRequest);
        data.axiosInstance.interceptors.response.use(
            (response) => {
                handleResponse();
                return response;
            },
            (error) => {
                handleResponse();
                return Promise.reject(error);
            }
        );

        return () => {
            data.axiosInstance.interceptors.request.clear();
            data.axiosInstance.interceptors.response.clear()
        };
    }, [data]);

    return (
        <>
            {loading && <Progress value={progress} />}
            {children}
        </>
    );
}
