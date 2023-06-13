import React from "react";
import "./InputBar.scss";

export default function InputBar({ value, onChange }) {
    return (
        <div className="inputbar-container">
            <input type="text" value={value} onChange={onChange} />
        </div>
    );
}
