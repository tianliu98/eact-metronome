import React from "react";
import "./PlayButton.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function PlayButton({ onPlay, onStop, isPlaying }) {
    return (
        <div className="play-button-container">
            <button
                className={`play-button ${isPlaying ? "playing" : ""}`}
                onClick={isPlaying ? onStop : onPlay}
            >
                {isPlaying ? (
                    <FontAwesomeIcon icon={faPause} size="2xl" />
                ) : (
                    <FontAwesomeIcon icon={faPlay} size="2xl" />
                )}
            </button>
        </div>
    );
}
