import useVerify from "@/hooks/useVerify"

export default function VerifyComponent() {
    const data = useVerify()
    if(!data) {
        return <></>
    }
    return (
        <></>
    )
}