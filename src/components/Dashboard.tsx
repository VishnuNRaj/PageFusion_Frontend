import useDashboard from "@/hooks/useDashboard"
import { IconPageBreak, IconUpload } from "@tabler/icons-react"
import Loader from "./Loader"

export default function DashboardComponent() {
    const { navigate, pdfs, handleKey, handleOpen, open, key, verifyKey, load, cancel } = useDashboard()
    if (load) {
        return <Loader />
    }
    return (
        <div class={"w-full h-full relative"}>
            <div class={"w-full h-[50px] flex items-center justify-end"}>
                <button onClick={() => navigate("/upload")} class={"p-2 px-3 text-sm font-semibold gap-3 min-w-[60px] flex items-center justify-center rounded-md bg-violet text-white-100"}>
                    <IconUpload /> Upload
                </button>
            </div>
            {open &&
                <div class={"w-full self-center m-auto h-[90%] backdrop-blur-sm absolute z-50 flex-shrink-0 flex items-center justify-center"}>
                    <div class={"dark:bg-black-500 bg-silver w-full p-4 px-4 flex flex-col gap-3 h-auto rounded-lg max-w-md"}>
                        <div class={"w-full rounded-md space-y-1"}>
                            <label htmlFor="key" className={"block ml-1 text-sm font-semibold text-gray-700 dark:text-gray-300"} >Enter Security Key</label>
                            <input type="text" value={key} name={"key"} onChange={(e) => handleKey(e.currentTarget.value)} class={"w-full font-semibold px-4 focus:border-black placeholder:text-black-100 p-2 h-[45px] border-2 rounded-md border-gray-600"} />
                        </div>
                        <div className="w-full flex gap-4 items-center justify-between">
                            <button
                                onClick={cancel}
                                type="button"
                                className="bg-gray-700 text-white font-semibold w-[80px] py-2 flex items-center justify-center rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={verifyKey}
                                type="button"
                                className="bg-violet text-white font-semibold flex items-center justify-center w-[80px] py-2 rounded-lg"
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            }
            <div class={"w-full h-full md:px-10 p-3"}>
                <div class={"w-full grid md:grid-cols-3 grid-cols-2 lg:grid-cols-6 xl:grid-cols-7 h-auto md:gap-5 gap-2"} style={{ aspectRatio: "9:16" }}>
                    {pdfs.length > 0 && pdfs.map((pdf, idx) => (
                        <div onClick={() => handleOpen(pdf._id)} key={idx} class={"w-full h-full bg-silver flex items-center justify-center flex-col dark:hover:text-white dark:text-gray-500 dark:bg-black-200 rounded-lg min-h-[200px]"}>
                            <div class={"w-full dark:bg-black-300 rounded-lg mt-4 flex items-center justify-center h-full max-h-[150px]"}>
                                <IconPageBreak size={"150px"} />
                            </div>
                            <div class={"w-full h-[50px] overflow-x-scroll mx-2 flex items-center justify-center"}>
                                {pdf.fileName}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
