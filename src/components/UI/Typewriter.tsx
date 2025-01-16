"use client"
import React, { useEffect, useState } from 'react'

interface ITypewriterProps {
    color?: string
    writing: string
    delay?: number
    hiddenCursor?: boolean
}

const Typewriter = ({ writing, delay, hiddenCursor, color = "text-white" }: ITypewriterProps): React.JSX.Element => {
    const [text, setText] = useState<string>("");
    const [showCursor, setShowCursor] = useState<boolean>(false);

    function writeOnScreen(text: string, i: number = 0) {
        if (i < text.length) {
            setShowCursor(true)
            setText(text.slice(0, i + 1))
            setTimeout(() => writeOnScreen(text, i + 1), 100)
            return
        }
        if (i >= text.length && hiddenCursor) {
            setShowCursor(false)
        }
    }

    useEffect(() => {
        setTimeout(() => writeOnScreen(writing), delay ?? 200)
    }, [])

    return (
        <div className={`${color}`}>
            {text}
            {showCursor && (
                <span className="animate-pulse text-xl md:text-2xl  font-medium">|</span>
            )}
        </div>
    )
}

export default Typewriter