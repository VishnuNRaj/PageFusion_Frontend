import useViewer from "@/hooks/useViewer";
import Loader from "./Loader";

export default function ViewPDF() {
    const { name, pdf } = useViewer();

    return (
        <div class="w-full h-full min-h-[500px] rounded-md flex items-center justify-center">
            {pdf ? (
                <iframe
                    src={URL.createObjectURL(pdf)}
                    title={name}
                    class="w-full rounded-md h-full min-h-[500px] p-2 gap-2"
                    frameBorder="0"
                />
            ) : (
                <Loader />
            )}
        </div>
    );
}
