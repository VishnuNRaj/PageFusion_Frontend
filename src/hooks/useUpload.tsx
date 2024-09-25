import { useEffect, useRef, useState } from "preact/hooks";
import { toast } from "sonner";
import useEssentials from "./useEssentials";
import { useAxios } from "@/context/AxiosContext";
import { AxiosResponse } from "axios";
import { ChangeEvent } from "preact/compat";
import { useUser } from "@/context/UserContext";

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}


interface SavePDFResponse {
    status: boolean;
    message: string;
}

export default function useUpload() {
    const pdfRef = useRef<HTMLInputElement | null>(null)
    const [pdf, setPDF] = useState<File | null>(null)
    const [key, setKey] = useState("Pagefusion")
    const [name, setName] = useState("PageFusion")
    const handleKey = (name: string) => setKey(name.length > 0 ? name : "Pagefusion")
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const handleFile = async (e: File) => {
        if (!e.type.startsWith("application/pdf")) return toast.error("Select PDF Files");
        setPDF(e)
    }
    useEffect(() => {
        verifyUser().then((res) => {
            if (!res) {
                navigate("/login")
            }
        })
    }, [])
    const { verifyUser, navigate, getCookie } = useEssentials()
    const data = useAxios()

    async function uploadPDF() {
        const token = getCookie("accessToken");

        if (!token) {
            navigate("/login");
            return;
        }

        if (data && pdf && token) {
            try {
                const buffer = await fileToBase64(pdf)
                const response: AxiosResponse<SavePDFResponse> = await data.axiosInstance.post("/pdf/save", {
                    encodedPdf: buffer,
                    fileName: name + ".pdf",
                    key
                }, {
                    headers: {
                        Authorization: token
                    }
                });

                toast[response.data && response.data.status ? "success" : "error"](response.data.message);
                setPDF(null)
            } catch (error: any) {
                console.log(error)
                toast.error(`${error.response.data.message}`);
                if (error.response.status === 401) {
                    navigate("/login");
                }
            }
        } else {
            toast.error("Missing PDF file or user session.");
        }
    }


    function handleClear() {
        setPDF(null)
        setKey("")
    }
    const { user } = useUser()
    return {
        key, handleClear, handleFile, handleKey, user, pdf, uploadPDF, pdfRef, canvasRef, data, name, handleName: (e: ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value.length < 1 ? "PageFusion" : e.currentTarget.value)
    }
}