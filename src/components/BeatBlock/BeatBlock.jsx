import React, { useEffect, useState, useRef } from "react";
import "./BeatBlock.scss";
import tick from "../../sound/tick-sound.wav";

const loadSound = async (url) => {
    console.log("Sound Loading...");
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await new AudioContext().decodeAudioData(arrayBuffer);

    return audioBuffer;
};

export default function BeatBlock({ isActive, index, audioCtx }) {
    const [level, setLevel] = useState(1);

    //cc
    // const audioCtxRef = useRef(new AudioContext());
    const [tickBuffer, setTickBuffer] = useState(null);
    const isBufferLoaded = useRef(false);

    useEffect(() => {
        // const audioCtxRef = audioCtx;
        loadSound(tick).then((buffer) => {
            setTickBuffer(buffer);
            isBufferLoaded.current = true;
        });
    }, []);

    useEffect(() => {
        if (isActive && isBufferLoaded.current) {
            try {
                const source = audioCtx.createBufferSource();
                source.buffer = tickBuffer;
                source.connect(audioCtx.destination);
                source.start();
            } catch (error) {
                console.log(error);
            }

            console.log(`Block ${index} is playing..`);
        }
    }, [isActive, tickBuffer, index, audioCtx]);
    //ee

    const onChangeColor = () => {
        setLevel((prevLevel) => {
            if (prevLevel === 3) {
                return 1;
            } else {
                return prevLevel + 1;
            }
        });
    };

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
