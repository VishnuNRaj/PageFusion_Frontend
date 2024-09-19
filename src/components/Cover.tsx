import { useState } from 'react'
import { Button } from "./ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { IconHome, IconMenu4, IconX, IconPdf, IconPlus, IconLogout } from '@tabler/icons-react'
import { useDarkMode } from '@/context/ThemeContext'
import { Moon, Sun } from 'lucide-react';
import PageFusion from "@/assets/Logo.png"
import { Link } from 'wouter'

export default function ResponsiveSidebar({ children }: { children: preact.ComponentChildren }) {
    const [isOpen, setIsOpen] = useState(false)
    const { darkMode, toggleDarkMode } = useDarkMode()
    const menuItems = [
        { icon: <IconHome className="h-6 w-6" />, text: 'Dashboard', path: "/" },
        { icon: <IconPlus className="h-6 w-6" />, text: 'Create PDF', path: "/create" },
        { icon: <IconPdf className="h-6 w-6" />, text: 'Edit PDF', path: "/edit" },
        { icon: <IconLogout className="h-6 w-6" />, text: 'Logout', path: "#" },
    ]

    return (
        <TooltipProvider>
            <div className="flex h-screen">
                <aside className={`hidden sm:flex flex-col justify-between transition-all duration-200 ease-in-out bg-secondary-foreground text-white ${isOpen ? 'w-[250px]' : 'w-[80px]'}`}>
                    <div className={"p-2"}>
                        <Button
                            variant="ghost"
                            // @ts-ignore
                            size="icon"
                            // @ts-ignore
                            className="w-full border border-separate p-4 flex justify-center items-center"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <IconX className="h-6 w-6" /> : <IconMenu4 className="h-6 w-6" />}
                        </Button>
                        <div className={"w-full mt-2 p-3 rounded-full flex justify-center items-center"}>
                            <img src={PageFusion} className={"rounded-full object-center h-7 w-7"} alt="" />
                            {isOpen && <span className="ml-4 font-semibold text-sm font-mono">PageFusion</span>}
                        </div>
                        <nav className="mt-8 grid grid-cols-1 gap-2">
                            {menuItems.map((item, index) => (
                                <Tooltip key={index}>
                                    <TooltipTrigger asChild>
                                        <Link href={item.path}>
                                            <Button
                                                variant="ghost"
                                                // @ts-ignore
                                                className={`w-full p-5 flex items-center ${isOpen ? 'justify-start' : 'justify-center'}`}
                                            // onClick={() => redirect({ href: "/login" })}
                                            >
                                                {item.icon}
                                                {isOpen && <span className="ml-4">{item.text}</span>}
                                            </Button>
                                        </Link>
                                    </TooltipTrigger>
                                    {!isOpen && <TooltipContent side="right">{item.text}</TooltipContent>}
                                </Tooltip>
                            ))}
                            <Button
                                key={"{{{"}
                                variant="ghost"
                                // @ts-ignore
                                className="w-full p-5 flex items-center justify-start"
                                onClick={toggleDarkMode}
                            >
                                {darkMode ? (
                                    <Sun className="" />
                                ) : (
                                    <Moon className="" />
                                )}
                                {isOpen && <span className={"ml-4"}>Switch Theme</span>}
                            </Button>
                        </nav>
                    </div>
                </aside>

                {/* Bottom bar for smaller screens */}
                <div className="sm:hidden fixed bottom-0 left-0 p-2 right-0 bg-primary text-white z-40">
                    <div className="flex justify-around" onDblClick={() => setIsOpen(!isOpen)} >
                        {menuItems.map((item, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Link href={item.path}>
                                        <Button
                                            variant="ghost"
                                            // @ts-ignore
                                            size="icon"
                                            // @ts-ignore
                                            className="bg-primary py-4"
                                        >
                                            {item.icon}
                                        </Button>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="top">{item.text}</TooltipContent>
                            </Tooltip>
                        ))}
                        <Button
                            key={"{{{"}
                            variant="ghost"
                            // @ts-ignore
                            className="flex items-center justify-start"
                            onClick={toggleDarkMode}
                        >
                            {darkMode ? (
                                <Sun className="" />
                            ) : (
                                <Moon className="" />
                            )}
                            {isOpen && <span className={"ml-4"}>Switch Theme</span>}
                        </Button>
                    </div>
                </div>

                {isOpen && (
                    <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)} />
                )}

                <aside className={`sm:hidden fixed inset-x-0 bottom-0 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out bg-gray-800 text-white ${isOpen ? 'h-3/4' : 'h-0'} overflow-hidden`}>
                    <div className="overflow-y-auto">
                        <Button
                            variant="ghost"
                            // @ts-ignore
                            size="icon"
                            // @ts-ignore
                            className="w-10 flex justify-center right-0 items-center mt-2 ml-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <IconX className="h-6 w-6" />
                        </Button>
                        <nav className="mt-8">
                            {menuItems.map((item, index) => (
                                <Link href={item.path}>
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        // @ts-ignore
                                        className="w-full flex items-center justify-start"
                                    >
                                        {item.icon}
                                        <span className="ml-4">{item.text}</span>
                                    </Button>
                                </Link>
                            ))}
                            <Button
                                key={"{{{"}
                                variant="ghost"
                                // @ts-ignore
                                className="w-full flex items-center justify-start"
                                onClick={toggleDarkMode}
                            >
                                {darkMode ? (
                                    <Sun className="" />
                                ) : (
                                    <Moon className="" />
                                )}
                                {isOpen && <span className={"ml-4"}>Switch Theme</span>}

                            </Button>
                        </nav>
                    </div>
                </aside>
                <main className={`${darkMode ? "dark bg-black-100" : "bg-gray-100"} flex-1 p-4 pb-16 sm:pb-4 h-screen overflow-scroll`}>
                    {children}
                </main>
            </div>
        </TooltipProvider>
    )
}