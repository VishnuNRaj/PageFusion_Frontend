import { useEffect, useRef, useState } from 'preact/hooks';
import { ChangeEvent } from 'preact/compat';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/legacy/build/pdf.worker';
import { toast } from 'sonner';
import jsPDF from 'jspdf';

export default function useEdit() {
    const [loadedPdf, setLoadedPdf] = useState<{ link: string; type: "image" | "pdf", selected: boolean; idx: number; }[]>([]);
    const pdfRef = useRef<HTMLInputElement | null>(null);
    const [load, setLoad] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [images, setImages] = useState<File[]>([])
    const [pdf, setPDF] = useState<File | null>(null)
    const [name, setName] = useState(new Date().toISOString())

    function handleName(e: ChangeEvent<HTMLInputElement>) {
        setName(e.currentTarget.value.length > 0 ? e.currentTarget.value : new Date().toISOString())
    }

    function handlePdfChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.currentTarget.files && e.currentTarget.files[0] && e.currentTarget.files[0].type.startsWith("application/pdf")) {
            setLoad(true);
            const file = e.currentTarget.files[0];
            setPDF(file)
        }
    }

    function clearPDF() {
        setLoad(true)
        setPDF(null)
        setLoadedPdf([])
        setImages([])
        setLoad(false)
    }

    useEffect(() => {
        if (pdf) {
            handlePDF()
        }
    }, [pdf])

    async function handlePDF() {
        if (pdf) {
            const fileReader = new FileReader();

            fileReader.onload = async function () {
                const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
                const pdf = await pdfjsLib.getDocument(typedArray).promise;
                const numPages = pdf.numPages;
                const pageImages: { link: string; type: "image" | "pdf", idx: number, selected: boolean }[] = [];

                for (let i = 1; i <= numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 1.5 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    canvas.height = viewport.height;
                    canvas.width = viewport.width;

                    const renderContext = {
                        canvasContext: context!,
                        viewport: viewport,
                    };

                    await page.render(renderContext).promise;
                    const imgUrl = canvas.toDataURL();
                    pageImages.push({ link: imgUrl, type: "pdf", idx: i, selected: true });
                }

                setLoadedPdf(pageImages);
                setLoad(false);
            };

            fileReader.readAsArrayBuffer(pdf);
        }
    }

    function addImageBetween(e: File, idx: number) {
        if (e && e.type.startsWith("image/")) {
            setLoadedPdf((prev) => {
                const newPages = [...prev];
                newPages.splice(idx, 0, { link: URL.createObjectURL(e), type: 'image', selected: true, idx: images.length });
                return newPages;
            });
            setImages((prev) => [...prev, e])
        }
    }

    function addImageLast(e: File) {
        if (e && e.type.startsWith("image/")) {
            setLoadedPdf((prev) => [...prev, { link: URL.createObjectURL(e), type: 'image', selected: true, idx: images.length }]);
            setImages((prev) => [...prev, e])
        }
    }

    function replacePage(e: File, idx: number) {
        if (e && e.type.startsWith("image/")) {
            setLoadedPdf((prev) => {
                const newPages = [...prev];
                newPages[idx] = { link: URL.createObjectURL(e), type: 'image', selected: true, idx: images.length };
                return newPages;
            });
            setImages((prev) => [...prev, e])
        } else toast.warning("Select Image File")
    }

    function removePage(idx: number) {
        setLoadedPdf((prev) => prev.map((val, i) => {
            if (idx === i) {
                return { ...val, selected: !val.selected }
            } else return val
        }));
    }

    function handleDrag(dragIdx: number, hoverIdx: number) {
        setLoadedPdf((prev) => {
            const draggedPage = prev[dragIdx];
            const newPages = prev.filter((_, i) => i !== dragIdx);
            newPages.splice(hoverIdx, 0, draggedPage);
            return newPages;
        });
    }

    async function resetPDF() {
        setLoad(true)
        await handlePDF()
        setImages([])
    }

    async function savePDF() {
        setLoad(true)
        const pdfDoc = new jsPDF();
        let firstPage = true;

        for (const page of loadedPdf) {
            if (page.selected) {
                if (page.type === "pdf") {
                    const imgDataUrl = page.link;

                    if (!firstPage) {
                        pdfDoc.addPage();
                    }
                    pdfDoc.addImage(imgDataUrl, 'PNG', 0, 0, pdfDoc.internal.pageSize.getWidth(), pdfDoc.internal.pageSize.getHeight());
                    firstPage = false;

                } else if (page.type === "image") {
                    const imgFile = images[page.idx];
                    const imgDataUrl = await readImageFile(imgFile);

                    if (!firstPage) {
                        pdfDoc.addPage();
                    }
                    pdfDoc.addImage(imgDataUrl, 'JPEG', 0, 0, pdfDoc.internal.pageSize.getWidth(), pdfDoc.internal.pageSize.getHeight());
                    firstPage = false;
                }
            }
        }

        pdfDoc.save(name + ".pdf");
        clearPDF()
        setLoad(false)
    }

    
    function readImageFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }



    return {
        pdfRef,
        loadedPdf,
        handlePdfChange,
        load,
        inputRef,
        addImageBetween,
        addImageLast,
        replacePage,
        removePage,
        handleDrag,
        resetPDF,
        clearPDF,
        savePDF,
        handleName,
        name
    };
}
