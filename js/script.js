
// Define HTML els
// Set up player and color
let currentColor = 'R';
const grid = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
];

let colIndex = 0;
let rowIndex = 0;

// Change color every round
const toggleColor = () => {
    currentColor = currentColor === 'R' ? 'Y' : 'R';
};

// Display grid in the console
const displayGrid = () => {
    console.table(grid);
};

// Add event listeners
document.addEventListener("keyup", ({ keyCode }) => {
    if (keyCode >= 49 && keyCode <= 55) {
        const colIndex = keyCode - 49;
        putTokenInGrid({ colIndex, color: currentColor });
    }
});

// Put token in grid
const putTokenInGrid = ({ colIndex, color }) => {
    for (let rowIndex = grid.length - 1; rowIndex >= 0; rowIndex--) {
        if (grid[rowIndex][colIndex] === null) {
            grid[rowIndex][colIndex] = color;
            const cell = document.querySelector(`.grid-item[data-col="${colIndex}"]:nth-child(${(rowIndex * 7) + colIndex + 1})`);
            const piece = document.createElement('div');
            piece.classList.add('piece', color === 'R' ? 'red' : 'yellow');
            cell.appendChild(piece);
            piece.style.transform = 'translateY(-1000px)'; // Start animation from above
            requestAnimationFrame(() => {
                piece.style.transform = 'translateY(0)'; // Animate to the final position
            });
            break;
        }
    }

    toggleColor();
    displayGrid();
    if (checkWin({ grid, color }) || checkTie({ grid })) {
        setTimeout(() => {
            alert(`Player ${color} wins!`);
            resetGame();
        }, 100);
    }
};

// Check win
const checkWin = ({ grid, color }) => {
    return checkVertical({ grid, color }) || checkHorizontal({ grid, color }) ||
        checkDiagTLBR({ grid, color }) || checkDiagTRBL({ grid, color });
};

// Check Vertical
const checkVertical = ({ grid, color }) => {
    for (let colIndex = 0; colIndex < grid[0].length; colIndex++) {
        for (let rowIndex = 0; rowIndex < grid.length - 3; rowIndex++) {
            if (grid[rowIndex][colIndex] === color &&
                grid[rowIndex + 1][colIndex] === color &&
                grid[rowIndex + 2][colIndex] === color &&
                grid[rowIndex + 3][colIndex] === color) {
                return true;
            }
        }
    }
    return false;
};

// Check Horizontal
const checkHorizontal = ({ grid, color }) => {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid[0].length - 3; colIndex++) {
            if (grid[rowIndex][colIndex] === color &&
                grid[rowIndex][colIndex + 1] === color &&
                grid[rowIndex][colIndex + 2] === color &&
                grid[rowIndex][colIndex + 3] === color) {
                return true;
            }
        }
    }
    return false;
};

// Check Diagonal Top Left to Bottom Right
const checkDiagTLBR = ({ grid, color }) => {
    for (let rowIndex = 0; rowIndex < grid.length - 3; rowIndex++) {
        for (let colIndex = 0; colIndex < grid[0].length - 3; colIndex++) {
            if (grid[rowIndex][colIndex] === color &&
                grid[rowIndex + 1][colIndex + 1] === color &&
                grid[rowIndex + 2][colIndex + 2] === color &&
                grid[rowIndex + 3][colIndex + 3] === color) {
                return true;
            }
        }
    }
    return false;
};

// Check Diagonal Top Right to Bottom Left
const checkDiagTRBL = ({ grid, color }) => {
    for (let rowIndex = 0; rowIndex < grid.length - 3; rowIndex++) {
        for (let colIndex = 3; colIndex < grid[0].length; colIndex++) {
            if (grid[rowIndex][colIndex] === color &&
                grid[rowIndex + 1][colIndex - 1] === color &&
                grid[rowIndex + 2][colIndex - 2] === color &&
                grid[rowIndex + 3][colIndex - 3] === color) {
                return true;
            }
        }
    }
    return false;
};

// Check for tie
const checkTie = ({ grid }) => {
    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid[0].length; colIndex++) {
            if (grid[rowIndex][colIndex] === null) {
                return false;
            }
        }
    }
    return true;
};

// Reset game
const resetGame = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            grid[rowIndex][colIndex] = null;
        });
    });
    document.querySelectorAll('.piece').forEach(piece => piece.remove());
    displayGrid();
};

/*
// Test

const gridNumbered = [
    ["x0;y0", "x1;y0", "x2;y0", "x3;y0", "x4;y0", "x5;y0", "x6;y0"],
    ["x0;y1", "x1;y1", "x2;y1", "x3;y1", "x4;y1", "x5;y1", "x6;y1"],
    ["x0;y2", "x1;y2", "x2;y2", "x3;y2", "x4;y2", "x5;y2", "x6;y2"],
    ["x0;y3", "x1;y3", "x2;y3", "x3;y3", "x4;y3", "x5;y3", "x6;y3"],
    ["x0;y4", "x1;y4", "x2;y4", "x3;y4", "x4;y4", "x5;y4", "x6;y4"],
    ["x0;y5", "x1;y5", "x2;y5", "x3;y5", "x4;y5", "x5;y5", "x6;y5"]
];

const gridNumbered2 = [
    ["x0;y0", "x1;y0", "x2;y0", "x3;y0", "x4;y0", "x5;y0", "x6;y0"],
    ["x0;y1", "x1;y1", "x2;y1", "x3;y1", "x4;y1", "x5;y1", "x6;y1"],
    ["red", "x1;y2", "x2;y2", "x3;y2", "x4;y2", "x5;y2", "x6;y2"],
    ["red", "x1;y3", "x2;y3", "x3;y3", "x4;y3", "x5;y3", "x6;y3"],
    ["red", "x1;y4", "x2;y4", "x3;y4", "x4;y4", "x5;y4", "x6;y4"],
    ["red", "x1;y5", "x2;y5", "x3;y5", "x4;y5", "x5;y5", "x6;y5"]
];

const gridNumbered3 = [
    ["x0;y0", "x1;y0", "x2;y0", "x3;y0", "x4;y0", "x5;y0", "x6;y0"],
    ["x0;y1", "x1;y1", "x2;y1", "x3;y1", "x4;y1", "x5;y1", "x6;y1"],
    ["x0;y2", "x1;y2", "red", "red", "red", "red", "x6;y2"],
    ["x0;y3", "x1;y3", "x2;y3", "x3;y3", "x4;y3", "x5;y3", "x6;y3"],
    ["x0;y4", "x1;y4", "x2;y4", "x3;y4", "x4;y4", "x5;y4", "x6;y4"],
    ["x0;y5", "x1;y5", "x2;y5", "x3;y5", "x4;y5", "x5;y5", "x6;y5"]
];

const obj = {
    grid: gridNumbered,
    color: 'R'
};

const obj2 = {
    grid: gridNumbered2,
    color: 'red'
};

const obj3 = {
    grid: gridNumbered3,
    color: 'red'
};

const isTestWin1 = checkVertical(obj);
const isTestWin2 = checkVertical(obj2);
console.log(false === isTestWin1);
console.log(true === isTestWin2);

const isTestWin3 = checkHorizontal(obj);
const isTestWin4 = checkHorizontal(obj3);
console.log(false === isTestWin3);
console.log(true === isTestWin4);


const gridNumbered4 = [
    ["red", "x1;y0", "x2;y0", "x3;y0", "x4;y0", "x5;y0", "x6;y0"],
    ["x0;y1", "red", "x2;y1", "x3;y1", "x4;y1", "x5;y1", "x6;y1"],
    ["x0;y2", "x1;y2", "red", "x3;y2", "x4;y2", "x5;y2", "x6;y2"],
    ["x0;y3", "x1;y3", "x2;y3", "red", "x4;y3", "x5;y3", "x6;y3"],
    ["x0;y4", "x1;y4", "x2;y4", "x3;y4", "x4;y4", "x5;y4", "x6;y4"],
    ["x0;y5", "x1;y5", "x2;y5", "x3;y5", "x4;y5", "x5;y5", "x6;y5"]
];

const gridNumbered5 = [
    ["x0;y0", "x1;y0", "x2;y0", "x3;y0", "x4;y0", "x5;y0", "R"],
    ["x0;y1", "x1;y1", "x2;y1", "x3;y1", "x4;y1", "R", "x6;y1"],
    ["x0;y2", "x1;y2", "x2;y2", "x3;y2", "x4;y2", "x5;y2", "x6;y2"],
    ["x0;y3", "x1;y3", "x2;y3", "R", "x4;y3", "x5;y3", "x6;y3"],
    ["x0;y4", "x1;y4", "x2;y4", "x3;y4", "x4;y4", "x5;y4", "x6;y4"],
    ["x0;y5", "R", "R", "R", "R", "x5;y5", "x6;y5"]
];

const gridNumbered6 = [
    ["R", "Y", "R", "R", "Y", "R", "Y"],
    ["Y", "R", "Y", "R", "R", "Y", "R"],
    ["R", "R", "Y", "Y", "R", "R", "Y"],
    ["Y", "R", "R", "Y", "R", "Y", "Y"],
    ["R", "Y", "Y", "Y", "Y", "R", "R"],
    ["R", "R", "Y", "R", "R", "R", "Y"]
];

const obj4 = {
    grid: gridNumbered4,
    color: 'red'
};

const obj5 = {
    grid: gridNumbered5,
    color: 'R'
};

const obj6 = {
    grid: gridNumbered6,
    color: 'R'
}; 

const isTestWin5 = checkDiagTLBR(obj);
const isTestWin6 = checkDiagTLBR(obj4);
console.log(false === isTestWin5);
console.log(true === isTestWin6);

const isTestWin7 = checkDiagTRBL(obj);
const isTestWin8 = checkDiagTRBL(obj5);
console.log(false === isTestWin7);
console.log(true === isTestWin8);

//const isTestWin9 = checkWin(obj);
const isTestWin10 = checkWin(obj5);
//console.log(false === isTestWin9);
console.log(true === isTestWin10);

//const isTestTie1 = checkTie(obj);
const isTestTie2 = checkTie(obj6);
//console.log(false === isTestTie1);
console.log(true === isTestTie2);
*/



