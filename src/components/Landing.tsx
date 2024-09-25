import { Link } from "wouter"
import { FileText, Cloud, Lock, Edit3, Plus } from "lucide-react"
import useEssentials from "@/hooks/useEssentials"

export default function PageFusionLanding() {
    const { navigate } = useEssentials()
    return (
        <div className="flex flex-col min-h-screen dark:text-white">
            <header className="px-4 lg:px-6 h-14 flex items-center md:justify-normal justify-center">
                <Link className="flex items-center justify-center" href="/dashboard">
                    <FileText className="h-6 w-6" />
                    <span className="ml-2 text-2xl font-bold">PageFusion</span>
                </Link>
            </header>
            <main className="flex-1">
                <section className="w-full py-12">
                    <div className="px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl dark:text-white font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Create, Edit, and Secure Your PDFs with PageFusion
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    The all-in-one platform for managing your PDF documents. Edit, create, and store your files securely in the cloud.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <button onClick={() => navigate("/dashboard")} class={"bg-violet p-2 px-4 rounded-md text-white font-semibold"}>Get Started</button>
                                <button class={"bg-violet p-2 px-4 rounded-md text-white font-semibold"}>Learn More</button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 bg-white dark:bg-gray-800 rounded-md">
                    <div className="px-4 md:px-6">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
                            Features
                        </h2>
                        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-center">
                            <div className="flex flex-col items-center space-y-2 p-4 rounded-lg">
                                <Edit3 className="h-8 w-8 mb-2" />
                                <h3 className="text-xl font-bold">Edit PDFs</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    Easily edit and modify your PDF documents with our intuitive tools.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <Plus className="h-8 w-8 mb-2" />
                                <h3 className="text-xl font-bold">Create PDFs</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    Design and generate professional PDF documents from scratch.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <Cloud className="h-8 w-8 mb-2" />
                                <h3 className="text-xl font-bold">Cloud Storage</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    Securely store and access your PDFs from anywhere, anytime.
                                </p>
                            </div>
                            <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                                <Lock className="h-8 w-8 mb-2" />
                                <h3 className="text-xl font-bold">Encrypted Security</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                    Keep your documents safe with our advanced encryption technology.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 PageFusion. All rights reserved.
                </p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Terms of Service
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" href="#">
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}