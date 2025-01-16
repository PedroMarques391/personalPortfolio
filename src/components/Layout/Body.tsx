"use client"
import { handleScroll } from "@/utils/functions/handleScroll";
import { useEffect, useState } from "react";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";

interface IBodyProps {
    children: React.ReactNode
}



const Body = ({ children }: IBodyProps): React.JSX.Element => {
    const [scrollY, setScrollY] = useState<boolean>(false)

    useEffect(() => {
        const handleScroll = (): void => {
            setScrollY(window.scrollY > 150)
        }
        return window.addEventListener("scroll", handleScroll)
    }, [])

    return (
        <main className="w-full min-h-[90vh] bg-black relative">
            <div className="flex flex-col items-start w-full md:max-w-7xl mx-auto p-5 ">
                {children}
            </div>
            <button className={`h-12 w-12 bg-white/30 justify-center items-center flex fixed bottom-10 right-5 md:right-10 rounded-xl duration-500 transition-opacity ${scrollY ? "opacity-1" : "opacity-0"}`}>
                <MdKeyboardDoubleArrowUp
                    size={40}
                    color="#1c1c1c"
                    onClick={() => handleScroll(0)} />

            </button>
        </main>
    )
}

export default Body;
