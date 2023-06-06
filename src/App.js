import "./index.css";
import tick from "./sound/tick-sound.wav";
import Metronome from "./components/Metronome";

export default function App() {
    const tickSound = new Audio(tick);
    const onPlay = () => {
        tickSound.play();
    };
    return (
        <div className="App">
            <button onClick={onPlay}>Play</button>
            <Metronome />
        </div>
    );
}
