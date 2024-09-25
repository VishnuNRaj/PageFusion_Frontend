import { useAxios } from "@/context/AxiosContext";
import { useEffect, useState } from "preact/hooks";
import { useParams } from "wouter";
import useEssentials from "./useEssentials";
import { AxiosResponse } from "axios";
import { toast } from "sonner";

export default function useViewer() {
    const { key } = useParams()
    const [pdf, setPdf] = useState<Blob | null>(null)
    const [name, setName] = useState("")
    const { getCookie, navigate } = useEssentials()
    const data = useAxios()
    async function getPDF() {
        const token = getCookie("accessToken")
        if (data && token) {
            try {
                const response: AxiosResponse<Blob> = await data.axiosInstance.post(`/pdf/get`, {
                    key: key
                }, {
                    headers: {
                        Authorization: token
                    },
                    responseType: "blob"
                })
                const contentDisposition = response.headers['content-disposition'];
                let filename = 'download.pdf';

                if (contentDisposition) {
                    const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (filenameMatch.length === 2) {
                        filename = filenameMatch[1];
                    }
                }
                console.log(typeof response.data, " LLLL ", response.data)
                setName(filename)

                setPdf(response.data)
            } catch (e: any) {
                toast.error("URL Timeout or PDF Not found");
                return navigate("/dashboard")
            }
        }
    }
    useEffect(() => {
        if (key && !pdf) {
            getPDF()
        }
    }, [key])
    return {
        pdf, name
    }
}