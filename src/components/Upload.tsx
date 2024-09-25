import useUpload from "@/hooks/useUpload";
import { PlusCircle } from "lucide-react";
import Loader from "./Loader";

export default function UploadPDF() {
    const { handleClear, handleFile, handleKey, user, key, pdf, pdfRef, uploadPDF, data, handleName, name } = useUpload()
    if (!data || data.loading && !user) {
        return <Loader />;
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg p-6 space-y-8 bg-white dark:bg-dark border-2 dark:border-0 border-gray-700 dark:border-gray-700 rounded-md shadow-lg">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-dark dark:text-primary">Upload</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Select a Document</p>
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
                            onChange={(e) => handleFile(e.currentTarget.files?.[0] as File)}
                        />
                        <h1 class="font-semibold text-sm mt-2 dark:text-white">{!pdf ? "Select PDF" : "PDF Selected Click to Change"}</h1>
                        <button class="text-gray-600 dark:text-white">
                            <PlusCircle size={48} />
                        </button>
                    </div>
                </div>
                {pdf && (
                    <div class={"w-full h-full min-h-[300px] rounded-md flex items-center justify-center"}>
                        <iframe src={URL.createObjectURL(pdf)} class={"w-full rounded-md h-full min-h-[300px] overflow-x-hidden"} style={{ scrollbarWidth: "none", scrollPaddingInline: "2px" }} seamless allowTransparency frameborder="40"></iframe>
                    </div>
                )}
                {pdf && (
                    <>
                        <div class={"w-full space-y-2"}>
                            <label htmlFor="key" className="block ml-1 text-sm text-gray-700 dark:text-gray-300">
                                Key
                            </label>
                            <input type="text" value={key} class={"w-full px-4 dark:border-black-100 focus:border-black placeholder:text-black-100 p-2 h-[45px] border-2 rounded-md border-gray-600"} onChange={(e) => handleKey(e.currentTarget.value)} name="key" id="" />
                        </div>
                        <div class={"w-full space-y-2"}>
                            <label htmlFor="filename" className="block ml-1 text-sm text-gray-700 dark:text-gray-300">
                                File Name
                            </label>
                            <input type="text" value={name} class={"w-full px-4 dark:border-black-100 focus:border-black placeholder:text-black-100 p-2 h-[45px] border-2 rounded-md border-gray-600"} onChange={handleName} name="filename" id="" />
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <button
                                type="button"
                                onClick={handleClear}
                                className="bg-red text-white font-semibold px-6 py-2 rounded-lg"
                            >
                                Clear
                            </button>
                            <button
                                type="button"
                                onClick={uploadPDF}
                                className="bg-violet text-white font-semibold px-6 py-2 rounded-lg"
                            >
                                Upload
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}