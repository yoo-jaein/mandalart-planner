import React from "react";

function MandaratGrid({ grid, onCellChange }) {
    return (
        <div className="grid">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <input
                        key={`${rowIndex}-${colIndex}`}
                        value={cell}
                        onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                        className={`grid-cell ${
                            rowIndex === 4 && colIndex === 4
                                ? "center-goal" // 중앙 목표 강조
                                : rowIndex % 3 === 1 && colIndex % 3 === 1
                                    ? "sub-goal" // 각 방향의 중심 강조
                                    : Math.floor(rowIndex / 3) % 2 === Math.floor(colIndex / 3) % 2
                                        ? "section-light"
                                        : "section-dark"
                        }`}
                    />
                ))
            )}
        </div>
    );
}

export function updateGridWithSubGoals(grid) {
    const updatedGrid = [...grid];

    // 중간 3x3의 8가지 세부 목표
    const subGoals = [
        grid[3][4], // 위
        grid[5][4], // 아래
        grid[4][3], // 왼쪽
        grid[4][5], // 오른쪽
        grid[3][3], // 왼쪽 위 대각선
        grid[3][5], // 오른쪽 위 대각선
        grid[5][3], // 왼쪽 아래 대각선
        grid[5][5], // 오른쪽 아래 대각선
    ];

    // 방향별 중심 위치
    const centers = [
        [1, 4], // 위
        [7, 4], // 아래
        [4, 1], // 왼쪽
        [4, 7], // 오른쪽
        [1, 1], // 왼쪽 위
        [1, 7], // 오른쪽 위
        [7, 1], // 왼쪽 아래
        [7, 7], // 오른쪽 아래
    ];

    // 각 방향의 중심에 세부 목표 배치
    centers.forEach(([row, col], idx) => {
        updatedGrid[row][col] = subGoals[idx];
    });

    return updatedGrid;
}

export default MandaratGrid;
