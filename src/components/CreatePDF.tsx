import useCreate from "@/hooks/useCreate"
import { PlusCircle } from "lucide-react"
import Loader from "./Loader";

export default function CreatePDF() {
    const { name, handleName, handleChange, inputRef, createPDF, images, handleClear, load } = useCreate()
    if (load) {
        return <Loader />;
    }
    return (
        <div class={"w-full h-full bg-auto flex items-center justify-center"}>
            <div class={"w-full max-w-lg px-3 space-y-3 p-2 bg-white dark:bg-dark border-2 dark:border-0 border-gray-700 dark:border-gray-700 rounded-md shadow-lg"}>
                <div class={"w-full h-[50px] flex items-center justify-center"}>
                    <h1 className={"text-xl font-semibold dark:text-white"}>Create PDFS</h1>
                </div>
                <div className={"w-full flex items-center justify-center"}>
                    <div onClick={() => inputRef.current?.click()} className={"w-full h-[300px] overflow-y-scroll dark:text-white bg-gray-100 dark:bg-gray-800 flex-col space-y-2 flex items-center justify-center rounded-md border-2 border-dashed border-gray-400 dark:border-gray-600 cursor-pointer"}>
                        <input type="file" name="" ref={inputRef} multiple accept={"image/*"} hidden onChange={handleChange} id="" />
                        <h1 className={"font-semibold text-sm mt-2"}>Select Images</h1>
                        <button className={""}><PlusCircle size={48} className={"text-gray-600 dark:text-white"} /></button>
                        {images && images.length > 0 && <div className={"grid  rounded-sm grid-cols-2 p-6 gap-6 overflow-y-scroll"}>
                            {images.map((img, idx) => (
                                <img src={URL.createObjectURL(img)} className={"w-full rounded-md border-2 h-full"} key={idx} alt="" />
                            ))}
                        </div>}
                    </div>
                </div>
                <div className={"w-full space-y-1"}>
                    <label htmlFor="" className={"block ml-2 text-sm text-gray-900 dark:text-gray-300"}>File Name</label>
                    <input className={"w-full px-4 focus:border-black placeholder:text-black-100 p-2 h-[45px] border-2 rounded-lg border-gray-600"} type="text" value={name} onChange={(e) => handleName(e.currentTarget.value.length > 0 ? e.currentTarget.value : "images")} />
                </div>
                <div className={"w-full flex items-center justify-between px-4"}>
                    <button onClick={handleClear} className={"bg-red p-2 h-[40px] w-[80px] rounded-sm text-white-100 text-sm font-semibold"}>Clear</button>
                    <button onClick={createPDF} className={"bg-violet p-2 h-[40px] w-[80px] rounded-sm text-white-100 text-sm font-semibold"}>Create</button>
                </div>
            </div>
        </div>
    )
}

