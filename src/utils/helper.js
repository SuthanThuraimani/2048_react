const zeroFilledArray = (n) => new Array(n).fill(0);
const nonZeroFilter = (ary) => ary.filter(i => i);
const getInitialMatrix = (n) => zeroFilledArray(n).map(() => new Array(n).fill(0));
const transpose = mat => mat[0].map((x, i) => mat.map(x => x[i]));
const isGameActive = (data) => (isMovePossible(data) || isMovePossible(transpose(data))) 
const isMovePossible = (matrix) => {
    return matrix.some(b => anyEmptyTile(b) || b.some(isAdjacentNumSame))
};
const anyEmptyTile = ary => ary.includes(0);
const isAdjacentNumSame = (curr, pos, self) => (pos - self.indexOf(curr) === 1)
const insertRandomCell = (ary, val) => {
    const presentMatrix = ary.flat();
    const emptyCells = getEmptyCells(presentMatrix);
    const index = emptyCells[randomNumber(emptyCells.length)];
    presentMatrix[index] = val;
    return presentMatrix;
} 
const randomNumber = (len) => Math.floor(Math.random() * len)
const getEmptyCells = (ary) => ary.map((ele, idx) => (ele === 0) ? idx : 'EMPTY').filter(ele => ele !== 'EMPTY');

// ary: [[2,2,0,2],[2,0,0,2]], return: [[4,2,0,0],[4,0,0,0]]
const processMatrix =  (ary, dir, dim) => {
   return dir? processRightMove(ary, dim): processLeftMove(ary, dim)
};
const processLeftMove =  (ary, dim) => ary.map(row => moveLeft(row, dim));
const processRightMove =  (ary, dim) => ary.map(row => moveRight(row, dim));
const moveLeft = (ary, len) => {
    const nonZero = nonZeroFilter( mergeLeft(ary) );
    return [...nonZero, ...zeroFilledArray(len - nonZero.length)]
}
const moveRight = (ary, len) => {
    const nonZero = nonZeroFilter( mergeRight(ary) );
    return [...zeroFilledArray(len - nonZero.length), ...nonZero]
}
const mergeLeft = (rowData) => rowData.reduce(addIdenticalValue, [])
const mergeRight = (rowData) => rowData.reduceRight(addIdenticalValue, []).reverse();
const addIdenticalValue = (prev, next) => {
    const last = prev[prev.length - 1];
    if (last === next) {
        prev = [...prev.slice(0, -1), parseInt(last) + parseInt(next), 0];
    } else if (next !== 0) {
        prev.push(next);
    }
    return prev;
}
const convertToMatrix = (ary, size) => {
    const inputAry = [...ary], newArray = [];
    while (inputAry.length > 0) newArray.push(inputAry.splice(0, size));
    return newArray;
}
const getMergedScore = ( beforeMove, afterMove ) => {
    const next = nonZeroFilter( afterMove );
    const prev = nonZeroFilter( beforeMove );
    
    prev.forEach(element => {
        if (next.indexOf(element) >= 0) next.splice(next.indexOf(element), 1);
    });
    return addScore(next);
}
const sumFn = (total, item) => (item > 2)? total + item: total;
const addScore = ary => ary.reduce(sumFn, 0);

export default { insertRandomCell, getInitialMatrix, convertToMatrix, processMatrix, transpose, getMergedScore, isGameActive}

