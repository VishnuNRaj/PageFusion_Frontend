import useEdit from "@/hooks/useEdit";
import { PlusCircle } from "lucide-react";
import { useRef, useState } from "preact/hooks";
import { IconPlayerTrackPrevFilled, IconReplace, IconTrash } from "@tabler/icons-react";
import Loader from "./Loader";

export default function EditPDF() {
    const { handleName, name, pdfRef, loadedPdf, handlePdfChange, load, inputRef, savePDF, clearPDF, addImageBetween, resetPDF, addImageLast, replacePage, removePage, handleDrag } = useEdit();
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    function ClickToAdd() {
        return (
            <div onClick={() => inputRef.current?.click()} style={{ aspectRatio: "9:16" }} className={"w-full h-full flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex-col space-y-2 flex items-center justify-center rounded-md border-2 border-dashed border-gray-400 dark:border-gray-600 cursor-pointer"}>
                <input type="file" onChange={(e) => addImageLast(e.currentTarget.files?.[0] as File)} ref={inputRef} hidden accept={"image/*"} />
                <h1 class="font-semibold text-sm mt-2 dark:text-white">{"Add Page"}</h1>
                <button class="text-gray-600 dark:text-white">
                    <PlusCircle size={48} />
                </button>
            </div>
        );
    }

    function HoverOptions({ idx }: { idx: number }) {
        const replaceRef = useRef<HTMLInputElement | null>(null)
        const prevRef = useRef<HTMLInputElement | null>(null)
        return (
            <div class={"absolute w-full h-full p-2 flex flex-shrink-0 items-center justify-center top-0 z-40 bg-opacity-80 bg-black-400 text-white"}>
                <div class={"w-full h-20 flex gap-4 flex-shrink-0 items-center justify-center"}>
                    <span onClick={() => removePage(idx)} class={`text-xs ${!loadedPdf[idx].selected ? "text-white-100" : "text-gray-600"}`}><IconTrash /></span>
                    <input onChange={(e) => addImageBetween(e.currentTarget.files?.[0] as File, idx)} type="file" ref={prevRef} name="" hidden id="" />
                    <input onChange={(e) => replacePage(e.currentTarget.files?.[0] as File, idx)} type="file" ref={replaceRef} name="" hidden id="" />
                    <span onClick={() => replaceRef.current?.click()} class={`text-xs text-gray-600`}><IconReplace /></span>
                    <span onClick={() => prevRef.current?.click()} class={`text-xs text-gray-600`}><IconPlayerTrackPrevFilled /></span>
                </div>
            </div>
        );
    }

    function ImageViewer({ idx, imgUrl }: { idx: number, imgUrl: string }) {
        return (
            <div
                class="w-full h-full relative"
                draggable
                onDragStart={() => setDraggedIndex(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                    if (draggedIndex !== null) {
                        handleDrag(draggedIndex, idx);
                        setDraggedIndex(null);
                    }
                }}
            >
                <img key={idx} src={imgUrl} alt={`Page ${idx + 1}`} class="w-full h-full" />
                <HoverOptions idx={idx} />
            </ div>
        );
    }

    if (load) {
        return <Loader />;
    }

    return (
        <div class="w-full overflow-scroll bg-auto mt-2 flex items-center justify-center p-5">
            <div class="w-full max-w-lg space-y-5 p-5 bg-white dark:bg-dark border-2 dark:border-0 border-gray-700 dark:border-gray-700 rounded-md shadow-lg">
                <div class="w-full h-[50px] flex items-center justify-center">
                    <h1 class="text-xl font-semibold dark:text-white">Edit PDF</h1>
                </div>

                <div class="w-full flex items-center justify-center">
                    <div
                        onClick={() => pdfRef.current?.click()}
                        class="w-full h-[100px] bg-gray-100 dark:bg-gray-800 flex-col space-y-2 flex items-center justify-center rounded-md border-2 border-dashed border-gray-400 dark:border-gray-600 cursor-pointer"
                    >
                        <input
                            type="file"
                            ref={pdfRef}
                            accept="application/pdf"
                            hidden
                            onChange={handlePdfChange}
                        />
                        <h1 class="font-semibold text-sm mt-2 dark:text-white">{!loadedPdf ? "Select PDF" : "PDF Selected Click to Change"}</h1>
                        <button class="text-gray-600 dark:text-white">
                            <PlusCircle size={48} />
                        </button>
                    </div>
                </div>

                {loadedPdf.length > 0 && (
                    <div class="w-full grid grid-cols-2 gap-2 h-[400px] flex-shrink-0 overflow-scroll items-center justify-center">
                        {loadedPdf.map((data, idx) => (
                            <>
                                <ImageViewer key={idx} idx={idx} imgUrl={data.link} />
                                {idx === loadedPdf.length - 1 && <ClickToAdd />}
                            </>
                        ))}
                    </div>
                )}
                {loadedPdf.length > 0 && (
                    <div class={"w-full h-[50px] flex items-center justify-center"}>
                        <input type="text" className={"w-full p-2 px-4 rounded-md bg-silver dark:bg-white text-dark font-sm font-semibold"} value={name} onChange={handleName} />
                    </div>
                )}
                {loadedPdf.length > 0 && (
                    <div class={"w-full h-[50px] gap-4 flex items-center justify-between"}>
                        <div className={"w-auto flex items-center justify-center gap-4"}>
                            <button onClick={resetPDF} class={"p-2 px-3 min-w-[60px] flex items-center rounded-md text-sm font-semibold justify-center bg-red text-white"}>
                                Reset
                            </button>
                            <button onClick={clearPDF} class={"p-2 px-3 min-w-[60px] flex items-center rounded-md text-sm font-semibold justify-center bg-orange-500 text-white"}>
                                Clear
                            </button>
                        </div>

                        <button onClick={savePDF} class={"p-2 px-3 min-w-[60px] flex items-center rounded-md text-sm font-semibold justify-center bg-violet text-white"}>
                            Save
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
