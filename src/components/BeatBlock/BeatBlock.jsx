import React, { useEffect, useState, useRef } from "react";
import tick from "../../sound/tick-sound.wav";
import "./BeatBlock.scss";

export default function BeatBlock({ isActive }) {
    const [level, setLevel] = useState(1);
    const tickSound = useRef(new Audio(tick));
    const onChangeColor = () => {
        console.log("click");
        setLevel((prevLevel) => {
            if (prevLevel === 3) {
                return 1;
            } else {
                return prevLevel + 1;
            }
        });
    };

    useEffect(() => {
        if (isActive) tickSound.current.play();
    }, [isActive]);
    return (
        <div
            className={`beat-block ${isActive ? "playing" : ""}`}
            onClick={onChangeColor}
        >
            <div
                className={`level-3 ${level > 2 ? "active" : ""} ${
                    isActive ? "flashing" : ""
                }`}
            ></div>
            <div
                className={`level-2 ${level > 1 ? "active" : ""} ${
                    isActive ? "flashing" : ""
                }`}
            ></div>
            <div
                className={`level-1 ${level > 0 ? "active" : ""} ${
                    isActive ? "flashing" : ""
                }`}
            ></div>
        </div>
    );
}
