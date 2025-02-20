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
// Change color evry round
const toggleColor = () => {
    currentColor = currentColor === 'R' ? 'Y' : 'R';
};
// Display grid
const displayGrid = () => {
    console.table(grid);
};
// Add ebent listeners
// // Get input from keyboard to play
// <element>.addEventListener(<eventName: String>, Callback: Function(event))
document.addEventListener("keyup", ({keyCode}) => {
    console.log("onkeyup");
    if (keyCode >= 49 || keyCode <= 55) {
        console.log("good input");
        const colIndex = keyCode - 49;
        putTokenInGrid({colIndex, color:currentColor});
    }
});
// // // Put token in grid
putTokenInGrid = ({colIndex, color}) => {
    for (let rowIndex = grid.length - 1; rowIndex >= 0; rowIndex--) {
        if (grid[rowIndex][colIndex] === null) {
            grid[rowIndex][colIndex] = color;
            break;
        }
    }

    toggleColor();
    displayGrid();
    checkWin({grid, color});
    checkTie({grid, color});
    endGame({grid, color});
};

// Check win


const checkWin = ({grid, color}) => {
    // // Check for horizontal win
    const isWinVer = checkVertical({grid, color});

    // // Check for vertical win
    const isWinHor = checkHorizontal({grid, color});
    // // Check for diagonal win
    const isWinDiagTLBR = checkDiagTLBR({grid, color});
    const isWinDiagTRBL = checkDiagTRBL({grid, color});

    return isWinVer || isWinHor || isWinDiagTLBR || isWinDiagTRBL;
};


// Check Vertical 
const checkVertical = ({grid, color} = {}) => {
    for (let rowIndex = 0; rowIndex < grid[0].length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid.length - 3; colIndex++) {
            // console.log(grid[colIndex][rowIndex]);
            // console.log(grid[colIndex + 1][rowIndex]);
            // console.log(grid[colIndex + 2][rowIndex]);
            // console.log(grid[colIndex + 3][rowIndex]);
            // console.log("-------");
            if (
                grid[colIndex][rowIndex] === color &&
                grid[colIndex + 1][rowIndex] === color &&
                grid[colIndex + 2][rowIndex] === color &&
                grid[colIndex + 3][rowIndex] === color
            ) {
                console.log("win ver");
                return true;
            }
        }
        // console.log("----- end y");
    }
    // console.log("----- end x");
    return false;
};

// Check Horizontal
const checkHorizontal = ({grid, color} = {}) => {
    for (let rowIndex = 0; rowIndex < grid[0].length - 3; rowIndex++) {
        for (let colIndex = 0; colIndex < grid.length; colIndex++) {
            // console.log(grid[colIndex][rowIndex]);
            // console.log(grid[colIndex][rowIndex + 1]);
            // console.log(grid[colIndex][rowIndex + 2]);
            // console.log(grid[colIndex][rowIndex + 3]);
            // console.log("-------");
            if (
                grid[colIndex][rowIndex] === color &&
                grid[colIndex][rowIndex + 1] === color &&
                grid[colIndex][rowIndex + 2] === color &&
                grid[colIndex][rowIndex + 3] === color
            ) {
                console.log("win hor");
                return true;
            }
        }
    }
    return false;
};

// Check Diagonal Top Left to Bottom Right
const checkDiagTLBR = ({grid, color} = {}) => {
    for (let rowIndex = 0; rowIndex < grid[0].length - 3; rowIndex++) {
        for (let colIndex = 0; colIndex < grid.length - 3; colIndex++) {
            if (
                grid[colIndex][rowIndex] === color &&
                grid[colIndex + 1][rowIndex + 1] === color &&
                grid[colIndex + 2][rowIndex + 2] === color &&
                grid[colIndex + 3][rowIndex + 3] === color
            ) {
                console.log("win diag top left bottom right");
                return true;
            }
        }
    }
};

// Check Diagonal Top Right to Bottom Left
const checkDiagTRBL = ({grid, color} = {}) => {
    for (let rowIndex = 0; rowIndex < grid[0].length - 3; rowIndex++) {
        for (let colIndex = 3; colIndex < grid.length; colIndex++) {
            if (
                grid[colIndex][rowIndex] === color &&
                grid[colIndex - 1][rowIndex + 1] === color &&
                grid[colIndex - 2][rowIndex + 2] === color &&
                grid[colIndex - 3][rowIndex + 3] === color
            ) {
                console.log("win diag top right bottom left");
                return true;
            }
        }
    }
};





// // Check for tie

const checkTie = ({grid}) => {
    const isTie = checkIfTie({grid});
    return isTie;
};

const checkIfTie = ({grid, color} = {}) => {
    for (let rowIndex = 0; rowIndex < grid[0].length; rowIndex++) {
        for (let colIndex = 0; colIndex < grid.length; colIndex++) {
            if (grid[colIndex][rowIndex] === null) {
                console.log("Toutes les cases ne sont pas remplies");
                return false;
            } else if (grid[colIndex][rowIndex] !== null) {
                console.log("Toutes les cases sont remplies");
                if (checkWin({grid, color}) === false) {
                    console.log("Egalité !");
                    // Reset game
                    resetGame();
                }
            }
        }
    }
    return true;
};

// End game

const endGame = ({grid, color} = {}) => {
    if (checkWin({grid, color})) {
        console.log(`Player ${color} wins !`);
        // Reset game
        resetGame();
    } else if (grid[colIndex][rowIndex] !== null) {
        checkTie({grid, color});
        // Reset game
        resetGame();
    }
};

// // Display winner
// // Reset game
const resetGame = () => {
    grid.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            grid[rowIndex][colIndex] = null;
        });
    });
    displayGrid();
};

// Test
/*
const gridNumbered = [
    ["x0;y0", "x1;y0", "x2;y0", "x3;y0", "x4;y0", "x5;y0", "x6;y0"],
    ["x0;y1", "x1;y1", "x2;y1", "x3;y1", "x4;y1", "x5;y1", "x6;y1"],
    ["x0;y2", "x1;y2", "x2;y2", "x3;y2", "x4;y2", "x5;y2", "x6;y2"],
    ["x0;y3", "x1;y3", "x2;y3", "x3;y3", "x4;y3", "x5;y3", "x6;y3"],
    ["x0;y4", "x1;y4", "x2;y4", "x3;y4", "x4;y4", "x5;y4", "x6;y4"],
    ["x0;y5", "x1;y5", "x2;y5", "x3;y5", "x4;y5", "x5;y5", "x6;y5"]
];
/*
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