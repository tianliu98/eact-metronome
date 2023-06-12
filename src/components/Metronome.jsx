import React, { useEffect, useRef, useState, createRef } from "react";
import "./Metronome.scss";
import tick from "../sound/tick-sound.wav";
import BeatBlock from "./BeatBlock/BeatBlock";
import PlayButton from "./PlayButton/PlayButton";
import InputBar from "./InputBar/InputBar";

const Metronome = () => {
    const dotsContainerRef = useRef(null);
    const tickSound = useRef(new Audio(tick));
    const [timer, setTimer] = useState(null);
    const [bpm, setBpm] = useState(30);
    const [beat, setBeat] = useState(4);
    const [dotRefs, setDotRefs] = useState([]);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);

    const onPlay = () => {
        setIsPlaying(true);
        clearInterval(timer);
        const gap = ((60 / bpm) * 1000) / beat;

        const newTimer = setInterval(() => {
            tickSound.current.play();
            setActiveIdx((prev) => (prev + 1) % beat);
        }, gap);

        setTimer(newTimer);
    };

    const onStop = () => {
        setIsPlaying(false);
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
                        isActive={i === activeIdx ? true : false}
                    />
                ))}
            </div>
            <PlayButton onPlay={onPlay} onStop={onStop} isPlaying={isPlaying} />
            <div className="setting">
                <div className="beats-setting">
                    <button onClick={subBeat}>-</button>
                    <InputBar value={beat} onChange={beatChangeHandler} />
                    <button onClick={addBeat}>+</button>
                </div>

                <div className="bpm-setting">
                    <InputBar value={bpm} onChange={onBpmChange} />
                </div>
            </div>
        </div>
    );
};

export default Metronome;
