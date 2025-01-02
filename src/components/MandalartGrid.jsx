import React, { useEffect, useRef } from "react";

function MandalartGrid({ grid, onCellChange }) {
    const textareaRefs = useRef({}); // 각 textarea에 대한 ref를 객체로 저장

    useEffect(() => {
        grid.forEach((row, rowIndex) =>
            row.forEach((_, colIndex) => {
                const ref = textareaRefs.current[`${rowIndex}-${colIndex}`];
                if (ref) {
                    ref.style.height = "auto"; // 높이 초기화
                    ref.style.height = `${ref.scrollHeight}px`; // 텍스트 내용에 맞게 높이 조정
                }
            })
        );
    }, [grid]);

    const handleCellClick = (row, col) => {
        const ref = textareaRefs.current[`${row}-${col}`];
        if (ref) {
            ref.focus(); // 클릭 시 해당 textarea로 포커스 이동
        }
    };

    const handleInput = (row, col, e) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        onCellChange(row, col, textarea.value);
    };

    return (
        <div className="grid">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const isCenterGoal = rowIndex === 4 && colIndex === 4;
                    const isSubGoal =
                        (rowIndex % 3 === 1 && colIndex % 3 === 1) ||
                        (rowIndex >= 3 && rowIndex <= 5 && colIndex >= 3 && colIndex <= 5 && !isCenterGoal);

                    return (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`grid-cell ${
                                isCenterGoal
                                    ? "center-goal"
                                    : isSubGoal
                                        ? "sub-goal"
                                        : Math.floor(rowIndex / 3) % 2 === Math.floor(colIndex / 3) % 2
                                            ? "section-light"
                                            : "section-dark"
                            }`}
                            onClick={() => handleCellClick(rowIndex, colIndex)} // 클릭 이벤트
                        >
                            <textarea
                                ref={(el) =>
                                    (textareaRefs.current[`${rowIndex}-${colIndex}`] = el)
                                }
                                value={cell}
                                onChange={(e) => handleInput(rowIndex, colIndex, e)}
                                placeholder={isCenterGoal ? "Main Goal" : isSubGoal ? "Sub Goal" : ""}
                                className="textarea"
                                rows="1"
                            />
                        </div>
                    );
                })
            )}
        </div>
    );
}

export function updateGridWithSubGoals(grid) {
    const updatedGrid = [...grid];

    const subGoals = [
        grid[3][4],
        grid[5][4],
        grid[4][3],
        grid[4][5],
        grid[3][3],
        grid[3][5],
        grid[5][3],
        grid[5][5],
    ];

    const centers = [
        [1, 4],
        [7, 4],
        [4, 1],
        [4, 7],
        [1, 1],
        [1, 7],
        [7, 1],
        [7, 7],
    ];

    centers.forEach(([row, col], idx) => {
        updatedGrid[row][col] = subGoals[idx];
    });

    return updatedGrid;
}

export default MandalartGrid;
