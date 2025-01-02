class MandalartGridData {
    constructor(grid = []) {
        this.grid = grid; // 중첩 배열 형태의 grid 데이터
        this.rows = grid.length; // 행 수
        this.cols = grid[0]?.length || 0; // 열 수
    }

    // grid 데이터를 JSON 형식으로 변환
    toJSON() {
        const json = {};
        this.grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                json[`${rowIndex}-${colIndex}`] = cell;
            });
        });
        return {
            grid: json,
            rows: this.rows,
            cols: this.cols,
        };
    }

    // JSON 데이터를 grid로 복원
    static fromJSON(data) {
        const { grid: json, rows, cols } = data;
        const grid = Array(rows)
            .fill(null)
            .map(() => Array(cols).fill(""));
        Object.entries(json).forEach(([key, value]) => {
            const [row, col] = key.split("-").map(Number);
            grid[row][col] = value;
        });
        return new MandalartGridData(grid);
    }
}

export default MandalartGridData;
