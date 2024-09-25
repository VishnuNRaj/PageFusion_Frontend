import useVerify from "@/hooks/useVerify"

export default function VerifyComponent() {
    const data = useVerify()
    if (!data) {
        return <></>
    }
    return (
        <>
            <div class={"w-full h-full flex items-center justify-center"}>
                {!data || data.loading && <div class="loader"></div>}
            </div>
        </>
    )
}

