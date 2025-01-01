import React, { useState, useRef } from "react";
import MandalartGrid, { updateGridWithSubGoals } from "./components/MandalartGrid";
import domtoimage from "dom-to-image-more";

function App() {
    const [grid, setGrid] = useState(Array(9).fill(null).map(() => Array(9).fill("")));
    const gridRef = useRef();

    // 셀 값 변경 핸들러
    const handleCellChange = (row, col, value) => {
        const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
        );
        const updatedGrid = updateGridWithSubGoals(newGrid);
        setGrid(updatedGrid);
    };

    // 고화질 스크린샷 다운로드
    const downloadScreenshot = async () => {
        if (gridRef.current) {
            const scale = 3; // 해상도 배율 (기본: 1)
            const options = {
                width: gridRef.current.offsetWidth * scale,
                height: gridRef.current.offsetHeight * scale,
                style: {
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                },
            };

            domtoimage.toPng(gridRef.current, options)
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.href = dataUrl;
                    link.download = "mandalart-plan-highres.png";
                    link.click();
                })
                .catch((error) => {
                    console.error("Error capturing the screenshot: ", error);
                });
        }
    };

    return (
        <div className="container">
            <h1 style={{ border: "2px solid #000", padding: "10px", background: "#f0f0f0", marginBottom: "20px" }}>
                Mandalart Planner
            </h1>
            <div ref={gridRef}>
                <MandalartGrid grid={grid} onCellChange={handleCellChange} />
            </div>
            <div className="button-container">
                <button className="retro-button" onClick={downloadScreenshot}>Download</button>
            </div>
        </div>
    );
}

export default App;
