"use client"
import { useState } from "react"
import Desktop from "../Menu/Desktop"

const Header = (): React.JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function handleMenu() {
        setIsOpen((prev) => !prev)
    }

    return (
        <header className="flex justify-center items-center bg-blue-deep text-blue-light-00 min-w-min">
            <nav className="w-full max-w-6xl h-16 flex justify-end items-center md:justify-center">
                <button onClick={handleMenu} className="md:hidden w-8 h-8 z-10 mr-7">
                    <div className={`bg-blue-light-00 h-1 mb-1.5 transition-transform block
                        ${isOpen ? "rotate-45 translate-y-2.5" : "rotate-0"}`} />
                    <div className={`bg-blue-light-00 h-1 mb-1.5 transition-transform block 
                        ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    <div className={`bg-blue-light-00 h-1 mb-1.5 transition-transform block
                        ${isOpen ? "-rotate-45 -translate-y-2.5" : "rotate-0"}`} />
                </button>
                <Desktop />
            </nav>
        </header>
    )
}

export default Header