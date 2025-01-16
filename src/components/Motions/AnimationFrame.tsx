'use client';

import { useAnimationFrame } from 'framer-motion';
import { useRef } from 'react';

export default function AnimationFrame() {
    const ref = useRef<HTMLDivElement>(null);

    useAnimationFrame((t) => {
        if (!ref.current) return;

        const rotation = Math.sin(t / 10000) * 200;
        const translateY = (1 + Math.sin(t / 1000)) * -50;

        ref.current.style.transform = `translateY(${translateY}px) rotateX(${rotation}deg) rotateY(${rotation}deg)`;
    });

    return (
        <div className="container">
            <div className="cube" ref={ref}>
                <div className="side front" />
                <div className="side left" />
                <div className="side right" />
                <div className="side top" />
                <div className="side bottom" />
                <div className="side back" />
            </div>
            <StyleSheet />
        </div>
    );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>{`
        .container {
            perspective: 800px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .cube {
            width: 200px;
            height: 200px;
            position: relative;
            transform-style: preserve-3d;
        }

        .side {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: red;
            opacity: 0.6;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1.2rem;
            color: white;
            font-family: Arial, sans-serif;
            font-weight: bold;
        }

        .front {
            transform: rotateY(0deg) translateZ(100px);
            background-color: rgba(255, 0, 0, 0.6);
        }
        .right {
            transform: rotateY(90deg) translateZ(100px);
            background-color: rgba(0, 255, 0, 0.6);
        }
        .back {
            transform: rotateY(180deg) translateZ(100px);
            background-color: rgba(0, 0, 255, 0.6);
        }
        .left {
            transform: rotateY(-90deg) translateZ(100px);
            background-color: rgba(255, 255, 0, 0.6);
        }
        .top {
            transform: rotateX(90deg) translateZ(100px);
            background-color: rgba(0, 255, 255, 0.6);
        }
        .bottom {
            transform: rotateX(-90deg) translateZ(100px);
            background-color: rgba(255, 0, 255, 0.6);
        }
    `}</style>
    );
}
