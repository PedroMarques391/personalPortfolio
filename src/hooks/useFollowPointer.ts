import { frame } from "motion";
import { useMotionValue, useSpring } from "motion/react";
import { RefObject, useEffect } from "react";

const spring = { damping: 3, stiffness: 50, restDelta: 0.001 };




export function useFollowPointer(ref: RefObject<HTMLElement | null>, initialPositionX: number, initialPositionY: number) {
    const xPoint = useMotionValue(initialPositionX);
    const yPoint = useMotionValue(initialPositionY);
    const x = useSpring(xPoint, spring);
    const y = useSpring(yPoint, spring);

    useEffect(() => {
        if (!ref.current) return;

        const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
            const element = ref.current!;

            frame.read(() => {
                xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
                yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
            });
        };

        window.addEventListener("pointermove", handlePointerMove);

        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, []);

    return { x, y };
}

