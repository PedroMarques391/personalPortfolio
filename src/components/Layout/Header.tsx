"use client";
import { useState } from "react";
import Desktop from "../Menu/Desktop";
import Mobile from "../Menu/Mobile";
import Logo from "../Menu/Logo";

const Header = (): React.JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    function handleMenu() {
        setIsOpen((prev) => !prev);
    }

    return (
        <header className="flex justify-center items-center 
        bg-black text-white w-full 
        sticky top-0 left-0 min-h-[10vh] z-20">

            <nav className="w-full max-w-6xl  flex justify-end items-center md:justify-end lg:justify-center 
             relative">
                <Logo />
                <button onClick={handleMenu} className="md:hidden w-8 h-8 mr-7 z-20">
                    <div className={`bg-white h-1 mb-1.5 transition-transform block 
                        ${isOpen ? "rotate-45 translate-y-2.5" : "rotate-0"}`} />
                    <div className={`bg-white h-1 mb-1.5 transition-transform block 
                        ${isOpen ? "opacity-0" : "opacity-100"}`} />
                    <div className={`bg-white h-1 mb-1.5 transition-transform block
                        ${isOpen ? "-rotate-45 -translate-y-2.5" : "rotate-0"}`} />
                </button>
                <Mobile
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}

                />
                <Desktop />
            </nav>
        </header>
    );
};

export default Header;