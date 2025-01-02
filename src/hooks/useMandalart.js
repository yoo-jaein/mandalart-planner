import { useState, useRef } from "react";
import domtoimage from "dom-to-image-more";

function useMandalart(initialGrid, updateGridWithSubGoals) {
    const [grid, setGrid] = useState(initialGrid);
    const gridRef = useRef();

    const handleCellChange = (row, col, value) => {
        const newGrid = grid.map((r, rowIndex) =>
            r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
        );
        const updatedGrid = updateGridWithSubGoals ? updateGridWithSubGoals(newGrid) : newGrid;
        setGrid(updatedGrid);
    };

    const downloadScreenshot = async () => {
        if (gridRef.current) {
            try {
                const scale = 3; // 고해상도를 위한 배율 (기본값은 1)
                const style = {
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                };

                const options = {
                    width: gridRef.current.offsetWidth * scale,
                    height: gridRef.current.offsetHeight * scale,
                    style, // 스케일 조정 적용
                };

                const dataUrl = await domtoimage.toPng(gridRef.current, options);
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "mandalart.png";
                link.click();
            } catch (error) {
                console.error("Error downloading Mandalart:", error);
            }
        }
    };

    return { grid, setGrid, gridRef, handleCellChange, downloadScreenshot };
}

export default useMandalart;
