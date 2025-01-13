import { useFollowPointer } from '@/hooks/useFollowPointer';
import { motion } from 'motion/react';
import { useRef } from 'react'


interface IFollowPointerProps {
    initialPositionX: number
    initialPositionY: number
}

export const FollowPointer = ({ initialPositionX, initialPositionY }: IFollowPointerProps): React.JSX.Element => {
    const ref = useRef(null);
    const { x, y } = useFollowPointer(ref, initialPositionX, initialPositionY);
    return (
        <motion.div
            ref={ref}
            style={{ x, y }}
            className="bg-red-600 w-12 h-12 rounded-full z-0 absolute top-50" />
    )
}
