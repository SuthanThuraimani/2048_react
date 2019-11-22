const getInitialMatrix = (n) => new Array(n).fill().map((e, i) => new Array(n).fill(0));
const getEmptyCells = (ary) => ary.map((ele, idx) => (ele === 0) ? idx : 'EMPTY').filter(ele => ele !== 'EMPTY');
const transpose = mat => mat[0].map((x, i) => mat.map(x => x[i]));
const isGameActive = (data) => {
    if (movePossible(data) || movePossible(transpose(data))) {
        return true;
    }
    return false;
}
const movePossible = (aryMatrix) => {
    return aryMatrix.some(b => {
        return b.includes(0) || b.some((a, pos, self) => (pos - self.indexOf(a) === 1))
    })
};
const processMatrix = (ary, dir, dim) => ary.map(row => processRowTiles(row, dir, dim));
//First calculate empty cells and find random index
const insertRandomCell = (ary, val) => {
    const presentMatrix = [...ary];
    const emptyCells = getEmptyCells(presentMatrix);
    const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    presentMatrix[index] = val;
    return presentMatrix;
}

// Merge and move numbers in each row or column, 0->left,up 1->right,down
// input: [2,2,0,2], output: [4,2,0,0]
const processRowTiles = (ary, dir, len) => {
    const flatData = (dir === 1) ? [...ary].reverse() : [...ary];
    const merged = mergeTiles(flatData);
    if (dir === 1) {
        merged.reverse();
    }
    return moveTiles(merged, dir, len);
}
const mergeTiles = (fdata) => {    
    return [...fdata].reduce(function (prev, next) {
        const last = prev[prev.length-1];        ;
        if (last === next) {
            prev = [...prev.slice(0, -1), parseInt(last) + parseInt(next) , 0];
        } else if (next !== 0) {
            prev = [...prev, next];
        }
        return prev;
    }, []) 
}
const moveTiles = (input, dir, len) => {
    const nonZero = [...input].filter(i => i)
    if (dir === 0) {
        return [...nonZero, ...new Array(len - nonZero.length).fill(0)]
    } else {
        return [...new Array(len - nonZero.length).fill(0), ...nonZero]
    }    
}

//convert array to arraylist (matrix format)
// input: [1,2,3,4], output: [[1,2][3,4]]
const convertToMatrix = (ary, size) => {
    const inputAry = [...ary];
    const newArray = [];
    while (inputAry.length > 0) newArray.push(inputAry.splice(0, size));
    return newArray;
}
//sum of difference in tile value between last 2 moves
const getMergedScore = ( beforeMove, afterMove ) => {
    const next = [...afterMove].filter( i => i );
    const prev = [...beforeMove].filter( i => i );
    
    prev.forEach(element => {
        if (next.indexOf(element) >= 0) next.splice(next.indexOf(element), 1);
    });
    return next.reduce( (total, item) => {
            return (item > 2) ? total + item: total;
        }, 0)
}
export default { insertRandomCell, getInitialMatrix, convertToMatrix, processMatrix, transpose, getMergedScore, isGameActive}

