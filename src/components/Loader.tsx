export default function Loader() {
    return (
        <div class={"flex relative z-50 backdrop-blur-sm w-full h-full items-center justify-center"}>
            <h1 class={"absolute font-bold text-sm text-black dark:text-white"}>Loading</h1>
            <div className={"border-violet w-20 h-20 rounded-full transition-shadow animate-spin border-2 border-l-silver dark:border-l-white border-r-silver dark:border-r-white"}></div>
        </div>
    )
}