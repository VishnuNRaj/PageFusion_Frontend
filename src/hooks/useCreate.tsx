import { ChangeEvent } from "preact/compat";
import { useRef, useState } from "preact/hooks";
import jsPDF from "jspdf";
import { toast } from "sonner";

export default function useCreate() {
    const [images, setImages] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [name, setName] = useState("PageFusion")
    const [load, setLoad] = useState<boolean>(false)
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault()
        setLoad(true)
        // @ts-ignore
        if (e.currentTarget?.files?.length > 0) {
            //@ts-ignore
            const selectedFiles = Array.from(e.currentTarget.files);
            setImages([...images, ...selectedFiles]);
        }
        setLoad(false)
    }

    async function createPDF() {
        setLoad(true)
        const pdf = new jsPDF();
        for (let i = 0; i < images.length; i++) {
            const imageFile = images[i];
            const imageUrl = URL.createObjectURL(imageFile);
            const img = new Image();
            img.src = imageUrl;

            await new Promise<void>((resolve) => {
                img.onload = () => {
                    const width = pdf.internal.pageSize.getWidth();
                    const height = (img.height * width) / img.width;
                    pdf.addImage(img, "JPEG", 0, 0, width, height);
                    if (i < images.length - 1) pdf.addPage();
                    resolve();
                };
            });

        }
        pdf.save(name + ".pdf", {
            returnPromise: true
        })
        setLoad(false)
        toast.success("PDF Download Success")
    }
    function handleName(e: string) {
        setName(e)
    }

    function handleClear() {
        setLoad(true)
        setImages([])
        setName("PageFusion")
        setLoad(false)
    }

    return { handleChange, createPDF, inputRef, handleName, name, images, handleClear, load };
}
