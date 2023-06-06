import React, { useEffect, useRef, useState, createRef } from "react";
import "./Metronome.css";
import tick from "../sound/tick-sound.wav";

const Metronome = () => {
  const dotsContainerRef = useRef(null);
  const [timer, setTimer] = useState(null);
  const [bpm, setBpm] = useState(60);
  const [beat, setBeat] = useState(4);
  const tickSound = new Audio(tick);
  const [dotRefs, setDotRefs] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);

  const dotLooper = (duration, dots) => {
    const numDots = dots.length;
    const gap = duration / dots.length;
    for (let i = 0; i < numDots; i++) {
      setTimeout(() => {
        tickSound.play();
        console.log(i);
        setActiveIdx(i);
      }, gap * i);
    }
    console.log(numDots, gap);
  };

  const onPlay = () => {
    console.log(`Playing, bpm: ${bpm}`);
    clearInterval(timer);
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
  }

  useEffect(() => {
    setDotRefs((prev) => {
      return Array(beat)
        .fill()
        .map((_, i) => prev[i] || createRef());
    });
  }, [beat]);

  return (
    <div>
      <div>Hello</div>
      <div className="dots" ref={dotsContainerRef}>
        {Array.from({ length: beat }, (v, i) => i).map((v, i) => (
          <div
            className={`circle ${i === 0 ? "first-dot" : ""} ${
              i === activeIdx ? "active" : ""
            }`}
            key={i}
            ref={dotRefs[i]}
          ></div>
        ))}
      </div>
      <button onClick={onPlay}>Play</button>
      <button onClick={onStop}>Stop</button>
      <div className="setting">
        <button onClick={subBeat}>-</button>
        <input value={beat} onChange={beatChangeHandler} />
        <button onClick={addBeat}>+</button>
        <input type="text" value={bpm} onChange={onBpmChange}/>
      </div>
    </div>
  );
};

export default Metronome;
