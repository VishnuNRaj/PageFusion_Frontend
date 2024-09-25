import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { IconHome, IconMenu4, IconX, IconPdf, IconPlus, IconLogout, IconPageBreak } from '@tabler/icons-react';
import { useDarkMode } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import PageFusion from "@/assets/Logo.png";
import { Link } from 'wouter';

export default function ResponsiveSidebar({ children }: { children: preact.ComponentChildren }) {
    const [isOpen, setIsOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useDarkMode();
    const menuItems = [
        { icon: <IconHome className="h-6 w-6" />, text: 'Dashboard', path: "/dashboard" },
        { icon: <IconPlus className="h-6 w-6" />, text: 'Create PDF', path: "/create" },
        { icon: <IconPdf className="h-6 w-6" />, text: 'Edit PDF', path: "/edit" },
        { icon: <IconPageBreak className="h-6 w-6" />, text: 'Create Page', path: "/page" },
        { icon: <IconLogout className="h-6 w-6 font-semibold" />, text: 'Logout', path: "#" },
    ];

    return (
        <TooltipProvider>
            <div className="flex h-screen">
                <aside className={`hidden sm:flex flex-col justify-between transition-all duration-200 ease-in-out bg-secondary-foreground text-white ${isOpen ? 'w-[250px]' : 'w-[80px]'}`}>
                    <div className="p-2">
                        <button
                            className="w-full p-1.5 hover:text-dark hover:bg-white rounded-md flex justify-center items-center bg-transparent"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close Sidebar" : "Open Sidebar"}
                        >
                            {isOpen ? <IconX className="h-6 w-6" /> : <IconMenu4 className="h-6 w-6" />}
                        </button>
                        <div className="w-full mt-2 justify-center rounded-full flex items-center">
                            <img src={PageFusion} className="rounded-full object-center h-7 w-7" alt="PageFusion Logo" />
                            {isOpen && <span className="ml-4 font-semibold text-sm font-mono">PageFusion</span>}
                        </div>
                        <nav className="mt-8 grid grid-cols-1 text-sm font-semibold gap-3">
                            {menuItems.map((item, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <Link href={item.path}>
                                            <button
                                                className={`w-full p-2 hover:text-dark hover:bg-white rounded-md flex items-center ${isOpen ? 'justify-start' : 'justify-center'} bg-transparent hover:bg-white`}
                                            >
                                                {item.icon}
                                                {isOpen && <span className="ml-4">{item.text}</span>}
                                            </button>
                                        </Link>
                                    </TooltipTrigger>
                                    {!isOpen && <TooltipContent side="right">{item.text}</TooltipContent>}
                                    {index === menuItems.length - 1 && (
                                        <button
                                            className={`w-full flex items-center ${isOpen ? 'justify-start' : 'justify-center'} bg-transparent p-2 hover:text-dark hover:bg-white rounded-md`}
                                            onClick={toggleDarkMode}
                                            aria-label="Toggle Dark Mode"
                                        >
                                            {darkMode ? <Sun class={"h-6 w-6 font-semibold"} /> : <Moon class={"h-6 w-6 font-semibold"} />}
                                            {isOpen && <span className="ml-4">Switch Theme</span>}
                                        </button>
                                    )}
                                </Tooltip>
                            ))}
                        </nav>
                    </div>
                </aside>

                <div className="sm:hidden fixed bottom-0 left-0 p-2 right-0 bg-primary text-white z-40">
                    <div className="flex justify-between" onClick={() => setIsOpen(!isOpen)}>
                        {menuItems.map((item, index) => (
                            <>
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <Link href={item.path}>
                                            <button
                                                className="bg-primary p-2 rounded-md hover:text-dark flex justify-center items-center hover:bg-white"
                                                aria-label={item.text}
                                            >
                                                {item.icon}
                                            </button>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">{item.text}</TooltipContent>
                                </Tooltip>
                                {index === menuItems.length - 1 && (
                                    <button
                                        className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} bg-transparent p-2 hover:text-dark hover:bg-white rounded-md`}
                                        onClick={toggleDarkMode}
                                        aria-label="Toggle Dark Mode"
                                    >
                                        {darkMode ? <Sun class={"h-6 w-6 font-semibold"} /> : <Moon class={"h-6 w-6 font-semibold"} />}
                                        {isOpen && <span className="ml-4">Switch Theme</span>}
                                    </button>
                                )}
                            </>
                        ))}
                    </div>
                </div>

                {isOpen && (
                    <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)} />
                )}

                <aside className={`sm:hidden fixed inset-x-0 bottom-0 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out bg-gray-800 text-white ${isOpen ? 'h-3/4' : 'h-0'} overflow-hidden`}>
                    <div className="overflow-y-auto">
                        <button
                            className="w-10 flex justify-center right-0 items-center mt-2 ml-2 bg-transparent"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close Sidebar"
                        >
                            <IconX className="h-6 w-6" />
                        </button>
                        <nav className="mt-8 flex w-full flex-col p-2 gap-2">
                            {menuItems.map((item, index) => (
                                <>
                                    <Link key={index} href={item.path}>
                                        <button
                                            className="w-full p-2 flex items-center hover:text-dark rounded-md justify-start bg-transparent hover:bg-white"
                                        >
                                            {item.icon}
                                            <span className="ml-4">{item.text}</span>
                                        </button>
                                    </Link>
                                    {index === menuItems.length - 1 && (
                                        <button
                                            className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} bg-transparent p-2 hover:text-dark hover:bg-white rounded-md`}
                                            onClick={toggleDarkMode}
                                            aria-label="Toggle Dark Mode"
                                        >
                                            {darkMode ? <Sun class={"h-6 w-6 font-semibold"} /> : <Moon class={"h-6 w-6 font-semibold"} />}
                                            {isOpen && <span className="ml-4">Switch Theme</span>}
                                        </button>
                                    )}
                                </>
                            ))}

                        </nav>
                    </div>
                </aside>

                <main className={`${darkMode ? "dark bg-black-100" : "bg-gray-100"} flex-1 p-4 pb-16 sm:pb-4 overflow-y-scroll`}>
                    {Array.isArray(children) ? children.filter(Boolean) : children}
                </main>
            </div>
        </TooltipProvider>
    );
}
