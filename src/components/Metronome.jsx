import React, { useEffect, useRef, useState, createRef } from "react";
import "./Metronome.scss";
import BeatBlock from "./BeatBlock/BeatBlock";

const Metronome = () => {
    const dotsContainerRef = useRef(null);
    const [timer, setTimer] = useState(null);
    const [bpm, setBpm] = useState(30);
    const [beat, setBeat] = useState(4);
    const [dotRefs, setDotRefs] = useState([]);
    const [activeIdx, setActiveIdx] = useState(-1);

    const dotLooper = (duration, dots) => {
        const numDots = dots.length;
        const gap = duration / dots.length;
        setActiveIdx(0); // Set the active index to 0.

        for (let i = 1; i < numDots; i++) {
            // start from 1 since we've played the 0 index sound
            setTimeout(() => {
                setActiveIdx(i);
            }, gap * i);
        }
    };

    const onPlay = () => {
        clearInterval(timer);
        dotLooper((60 / bpm) * 1000, dotsContainerRef.current.children);
        const newTimer = setInterval(() => {
            dotLooper((60 / bpm) * 1000, dotsContainerRef.current.children);
        }, (60 / bpm) * 1000);
        setTimer(newTimer);
    };

    const onStop = () => {
        clearInterval(timer);
    };

    const beatChangeHandler = (e) => {
        setBeat(e.target.value);
    };

    const subBeat = () => {
        if (beat > 1) setBeat((prevBeat) => prevBeat - 1);
    };

    const addBeat = () => {
        if (beat < 16) setBeat((prevBeat) => prevBeat + 1);
    };

    const onBpmChange = (e) => {
        setBpm(e.target.value);
    };

    useEffect(() => {
        setDotRefs((prev) => {
            return Array(beat)
                .fill()
                .map((_, i) => prev[i] || createRef());
        });
    }, [beat]);

    return (
        <div className="metronome-container">
            <div className="dots" ref={dotsContainerRef}>
                {Array.from({ length: beat }, (v, i) => i).map((v, i) => (
                    <BeatBlock
                        key={i}
                        ref={dotRefs[i]}
                        isPlaying={i === activeIdx ? true : false}
                    />
                ))}
            </div>
            <button onClick={onPlay}>Play</button>
            <button onClick={onStop}>Stop</button>
            <div className="setting">
                <div className="beats-setting">
                    <button onClick={subBeat}>-</button>
                    <input value={beat} onChange={beatChangeHandler} />
                    <button onClick={addBeat}>+</button>
                </div>

                <div className="bpm-setting">
                    <input type="text" value={bpm} onChange={onBpmChange} />
                </div>
            </div>
        </div>
    );
};

export default Metronome;
