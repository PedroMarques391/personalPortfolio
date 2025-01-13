import * as motion from "motion/react-client";

const transition = { duration: 4, ease: "easeInOut", repeat: Infinity };

export default function MotionPath() {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" width="500" height="200">
                <motion.path
                    d="M 0 50 Q 50 30, 100 50 T 200 50 T 300 50 T 400 50 T 500 50 
       M 0 100 Q 50 120, 100 100 T 200 100 T 300 100 T 400 100 T 500 100
       M 0 150 Q 50 130, 100 150 T 200 150 T 300 150 T 400 150 T 500 150"
                    fill="transparent"
                    strokeWidth="4"
                    stroke="#998f8f"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={transition}
                />
            </svg>
            <motion.div
                className="absolute top-0 left-0 w-8 h-8 bg-gray-soft/50 rounded-full"
                style={{
                    offsetPath: `path("M 0 50 Q 50 30, 100 50 T 200 50 T 300 50 T 400 50 T 500 50,
        M 0 100 Q 50 120, 100 100 T 200 100 T 300 100 T 400 100 T 500 100,
        M 0 150 Q 50 130, 100 150 T 200 150 T 300 150 T 400 150 T 500 150")`,
                }}
                initial={{ offsetDistance: "0%", scale: 2.5 }}
                animate={{ offsetDistance: "100%", scale: 1 }}
                transition={transition}
            />
        </>
    );
}
