import { useState, useRef } from 'preact/hooks';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ChangeEvent } from 'preact/compat';

export default function useA4Editor() {
    const [elements, setElements] = useState<any[]>([]);
    const [isResizing, setIsResizing] = useState(false);
    const [padding, setPadding] = useState(10);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [exportedBlob, _setExportedBlob] = useState<Blob | null>(null);
    const addImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setElements((prev) => [
                    ...prev,
                    { type: 'image', src: e.target?.result, width: 200, height: 200, x: 0, y: 0 },
                ]);
            };
            reader.readAsDataURL(file);
        }
    };

    const addText = () => {
        const lastTextY = elements.filter(e => e.type === 'text').pop()?.y || 0;
        setElements((prev) => [
            ...prev,
            { type: 'text', content: 'Enter Text', x: 0, y: lastTextY + 50, fontSize: 16 }
        ]);
    };

    const handleDrag = (index: number, data: any) => {
        const newElements = [...elements];
        newElements[index].x = data.x;
        newElements[index].y = data.y;
        setElements(newElements);
    };

    const handleTextChange = (index: number, event: any) => {
        const newElements = [...elements];
        newElements[index].content = event.target.innerText;
        setElements(newElements);
    };

    const exportToImage = async () => {
        if (editorRef.current) {
            const canvas = await html2canvas(editorRef.current, {
                scale: 2,
                useCORS: true,
            });
            const dataUrl = canvas.toDataURL();
            const link = document.createElement('a');
            link.href = dataUrl as unknown as string;
            link.download = 'a4-layout.png';
            link.click();
        }
    };

    // const exportToImage = async () => {
    //     if (editorRef.current) {
    //         const canvas = await html2canvas(editorRef.current, {
    //             scale: 2,
    //             useCORS: true,
    //         });

    //         canvas.toBlob((blob) => {
    //             if (blob) {
    //                 setExportedBlob(blob);
    //             }
    //         }, 'image/png');
    //     }
    // };
    const exportToPDF = () => {
        const pdf = new jsPDF();
        elements.forEach((element, index) => {
            if (element.type === 'image') {
                const img = new Image();
                img.src = element.src;
                pdf.addImage(img, 'JPEG', padding, padding, pdf.internal.pageSize.getWidth() - 2 * padding, pdf.internal.pageSize.getHeight() - 2 * padding);
            } else if (element.type === 'text') {
                pdf.setFontSize(element.fontSize);
                pdf.text(element.content, element.x + padding, element.y + padding + 10);
            }
            if (index < elements.length - 1) pdf.addPage();
        });
        pdf.save('a4-layout.pdf');
    };

    return {
        elements,
        addImage,
        addText,
        handleDrag,
        handleTextChange,
        exportToImage,
        exportToPDF,
        inputRef,
        editorRef,
        isResizing,
        setIsResizing,
        setPadding,
        padding,
        setElements,
        exportedBlob
    };
}
