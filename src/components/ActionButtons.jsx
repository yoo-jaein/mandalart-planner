import React from "react";

function ActionButtons({ onSave, onDownload, saveLabel = "Save" }) {
    return (
        <div className="button-container">
            <button className="retro-button" onClick={onSave}>{saveLabel}</button>
            <button className="retro-button" onClick={onDownload}>Download</button>
        </div>
    );
}

export default ActionButtons;
