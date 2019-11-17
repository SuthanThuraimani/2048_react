
const getInitialMatrix = (n) => new Array(n).fill().map((e, i) => new Array(n).fill(0));
const getEmptyCells = (ary) => ary.map((ele, idx) => (ele === 0) ? idx : 'EMPTY').filter(ele => ele !== 'EMPTY');
const isEmptyAvailable = (ary) => getEmptyCells(ary).length === 0;

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
const moveNumbers = (ary, dir, len) => {
    const flatData = (dir === 1) ? [...ary].reverse() : [...ary];
    const mergedCell = flatData.reduce(function (prev, next) {
        const last = prev.slice(prev.length - 1, prev.length)[0];
        if (last === next) {
            prev = [...prev.slice(0, -1), parseInt(last) + parseInt(next), 0];
        } else if (next !== 0) {
            prev = [...prev, next];
        }
        return prev;
    }, []).filter(i => i)
    if (dir === 1) {
        mergedCell.reverse();
    }
    return fillWithDefault(mergedCell, dir, len);
}

const fillWithDefault = (input, dir, len) => {
    if (dir === 0) {
        return [...input, (new Array(len - input.length).fill(0))].flat()
    } else {
        return [(new Array(len - input.length).fill(0)), ...input].flat()
    }    
}

//convert flatten array to arraylist (matrix format)
// input: [1,2,3,4], output: [[1,2][3,4]]
const arrayToMatrix = (ary, size) => {
    const inputAry = [...ary];
    const newArray = [];
    while (inputAry.length > 0) newArray.push(inputAry.splice(0, size));
    return newArray;
}
export default { insertRandomCell, getInitialMatrix, arrayToMatrix, isEmptyAvailable, moveNumbers}

