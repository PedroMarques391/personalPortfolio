import { motion } from "motion/react";
import React from "react";

interface IInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  error?: string;
  duration?: number;
  containerClassName?: string;
  labelBgClassName?: string;
}

interface ITextAreaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  label: string;
  duration?: number;
  error?: string;
  containerClassName?: string;
  labelBgClassName?: string;
}

function Input({
  label,
  error,
  duration,
  type = "text",
  containerClassName = "w-[90%] sm:w-[90%] md:w-[90%] lg:w-[70%]",
  labelBgClassName = "bg-black peer-focus:bg-black peer-valid:bg-black",
  ...props
}: IInputProps): React.JSX.Element {
  const errorId = `${label}-error`;
  return (
    <div className={containerClassName}>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: duration, type: "spring" }}
        className="group relative my-3 w-full"
      >
        <input
          id={label}
          type={type}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          {...props}
          required
          className={`peer text-white border-2 bg-transparent 
                rounded-md w-full h-12 px-4 outline-none 
                transition duration-300 focus:border-orange-500 ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-soft"
                }`}
        />
        <label
          htmlFor={label}
          className={`
                    absolute left-4 top-0 -translate-y-[50%] text-sm
                    pointer-events-none transition-all duration-300 
                    peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base 
                    peer-placeholder-shown:bg-transparent
                    peer-focus:top-0 peer-focus:text-sm text-white px-2 
                    peer-valid:top-0 peer-valid:text-sm ${labelBgClassName}`}
        >
          {label}
        </label>
      </motion.div>
      {error && (
        <p id={errorId} role="alert" className="text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

function TextArea({
  label,
  error,
  duration,
  containerClassName = "w-[90%] sm:w-[90%] md:w-[90%] lg:w-[70%]",
  labelBgClassName = "bg-black peer-focus:bg-black peer-valid:bg-black",
  ...props
}: ITextAreaProps): React.JSX.Element {
  const errorId = `${label}-error`;
  return (
    <div className={containerClassName}>
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: duration, type: "spring" }}
        className="group relative my-3 w-full"
      >
        <textarea
          {...props}
          id={label}
          placeholder=" "
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          required
          className={`peer text-white border-2 
                 bg-transparent 
                rounded-md w-full h-32 px-4 outline-none 
                transition duration-300 focus:border-orange-500 pt-3 ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-soft"
                }`}
        />
        <label
          htmlFor={label}
          className={`
                    absolute left-4 top-0 -translate-y-[50%] text-sm
                    pointer-events-none transition-all duration-300 
                    peer-placeholder-shown:top-[50%] peer-placeholder-shown:text-base 
                    peer-placeholder-shown:bg-transparent
                    peer-focus:top-0 peer-focus:text-sm text-white px-2 
                    peer-valid:top-0 peer-valid:text-sm ${labelBgClassName}`}
        >
          {label}
        </label>
      </motion.div>
      {error && (
        <p id={errorId} role="alert" className="mb-2 text-red-500 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

Input.TextArea = TextArea;

export { Input };

