import React from 'react';
import { motion } from "motion/react";

interface IInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    label: string
    error?: string
    duration?: number

}

interface ITextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    label: string
    duration?: number
    error?: string
}

function Input({ label, error, duration, ...props }: IInputProps): React.JSX.Element {
    return (
        <div className='w-[90%] sm:w-[90%]  md:w-[90%] lg:w-[70%]'>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: duration, type: "spring" }}
                className="group relative mt-2 w-full">
                <input
                    {...props}
                    id="input"
                    type="text"
                    required
                    className={`peer text-white border-2  bg-transparent 
                rounded-md w-full h-12 px-4 outline-none 
                transition duration-300 focus:border-orange-500 ${error ? "border-red-500 focus:border-red-500" : "border-gray-soft"}`}
                />
                <label
                    htmlFor="input"
                    className={`
                    absolute left-4 top-[50%] -translate-y-[50%] text-accent 
                    bg-transparent  pointer-events-none transition-all duration-300 
                    peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base 
                    peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-accent 
                    peer-focus:top-0 peer-focus:text-sm peer-focus:bg-black text-white px-2 
                    peer-valid:top-0 peer-valid:bg-black peer-valid:text-sm`}
                >
                    {label}
                </label>
            </motion.div>
            {error && <p className='m-2 text-red-600'>{error}</p>}
        </div>

    );
}

function TextArea({ label, error, duration, ...props }: ITextAreaProps): React.JSX.Element {
    return (
        <div className='w-[90%] sm:w-[60%]  md:w-[90%] lg:w-[70%]'>
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: duration, type: "spring" }}
                className="group relative mt-2 w-full">
                <textarea
                    {...props}
                    id="input"
                    required
                    className={`peer text-white border-2 
                 bg-transparent 
                rounded-md w-full h-32 px-4 outline-none 
                transition duration-300 focus:border-orange-500 pt-3 ${error ? "border-red-500 focus:border-red-500" : "border-gray-soft"}`}
                />
                <label
                    htmlFor="textArea"
                    className={`
                    absolute left-4 top-[50%] -translate-y-[50%] text-accent
                    bg-transparent pointer-events-none transition-all duration-300 
                    peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base 
                    peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-accent 
                    peer-focus:top-0 peer-focus:text-sm peer-focus:bg-black text-white px-2 
                    peer-valid:top-0 peer-valid:bg-black peer-valid:text-sm`}
                >
                    {label}
                </label>

            </motion.div>
            {error && <p className='m-2 text-red-600'>{error}</p>}
        </div>
    );
}

Input.TextArea = TextArea;

export { Input };