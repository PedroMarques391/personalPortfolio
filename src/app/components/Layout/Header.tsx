"use client"
import { useEffect, useState } from "react"
import Desktop from "../Menu/Desktop"
import Mobile from "../Menu/Mobile"

const Header = (): React.JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    function handleMenu() {
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {

    })



    return (
        <header className="flex justify-center items-center 
        bg-blue-deep text-blue-light-00 w-full 
        sticky top-0 left-0 z-30">
            <nav className="w-full max-w-6xl h-16 flex justify-end items-center md:justify-center">
                <button onClick={handleMenu} className="md:hidden w-8 h-8 mr-7 z-20">
                    <div className={`bg-blue-light-00 h-1 mb-1.5 transition-transform block 
                        ${isOpen ? "rotate-45 translate-y-2.5" : "rotate-0"}`} />
                    <div className={`bg-blue-light-00 h-1 mb-1.5 transition-transform block 
                        ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    <div className={`bg-blue-light-00 h-1 mb-1.5 transition-transform block
                        ${isOpen ? "-rotate-45 -translate-y-2.5" : "rotate-0"}`} />
                </button>
                <Mobile
                    isOpen={isOpen}
                />
                <Desktop />
            </nav>
        </header>
    )
}

export default Header