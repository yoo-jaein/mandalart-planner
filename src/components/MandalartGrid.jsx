import React from "react";

function MandalartGrid({ grid, onCellChange }) {
    return (
        <div className="grid">
            {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                    const isCenterGoal = rowIndex === 4 && colIndex === 4; // 중앙 목표
                    const isSubGoal =
                        (rowIndex % 3 === 1 && colIndex % 3 === 1) || // 다른 서브 목표
                        (rowIndex >= 3 && rowIndex <= 5 && colIndex >= 3 && colIndex <= 5 && !isCenterGoal); // 중앙 3x3의 8칸

                    return (
                        <input
                            key={`${rowIndex}-${colIndex}`}
                            value={cell}
                            onChange={(e) => onCellChange(rowIndex, colIndex, e.target.value)}
                            placeholder={isCenterGoal ? "Main Goal" : isSubGoal ? "Sub Goal" : ""} // 플레이스홀더 설정
                            className={`grid-cell ${
                                isCenterGoal
                                    ? "center-goal" // 중앙 목표 강조
                                    : isSubGoal
                                        ? "sub-goal" // 서브 목표 강조
                                        : Math.floor(rowIndex / 3) % 2 === Math.floor(colIndex / 3) % 2
                                            ? "section-light"
                                            : "section-dark"
                            }`}
                        />
                    );
                })
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

export default MandalartGrid;
