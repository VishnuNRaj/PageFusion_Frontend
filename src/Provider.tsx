import { Toaster } from "sonner";
import ResponsiveSidebar from "./components/Cover";
import { TooltipProvider } from "./components/ui/tooltip";
import { AxiosProvider } from "./context/AxiosContext";
import { DarkModeProvider } from "./context/ThemeContext";
import LoadingBar from "./components/Loading";

export default function Provider({ children }: { children: preact.ComponentChildren }) {
    return (
        <>
            <DarkModeProvider>
                <Toaster richColors position="top-center" closeButton dir="ltr" theme={localStorage.getItem("theme") === "true" ? "dark" : "light"} />
                <AxiosProvider>
                    <LoadingBar>
                        <TooltipProvider>
                            <ResponsiveSidebar>
                                {children}
                            </ResponsiveSidebar>
                        </TooltipProvider>
                    </LoadingBar>
                </AxiosProvider>
            </DarkModeProvider>
        </>
    )
}

