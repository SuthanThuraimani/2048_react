
const getInitialMatrix = (n) => new Array(n).fill().map((e, i) => new Array(n).fill(0));
const getEmptyCells = (ary) => ary.map((ele, idx) => (ele === 0) ? idx : 'EMPTY').filter(ele => ele !== 'EMPTY');
const isEmptyAvailable = (ary) => getEmptyCells(ary).length === 0;

//First calculate empty cells and find random index
const insertRandomCell = (ary, val) => {
    const presentMatrix = [...ary];
    const emptyCells = getEmptyCells(presentMatrix);
    const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return presentMatrix.fill(val, index, index + 1);    
}

// Merge and move numbers in each row or column, 0->left,up 1->right,down
const moveNumbers = (ary, dir, len) => {
    const flatData = (dir === 1) ? [...ary].reverse() : [...ary];
    const mergedCell = flatData.reduce(function (prev, next) {
        const last = prev.slice(prev.length - 1, prev.length)[0];
        if (last === next) {
            prev = [...prev.slice(0, -1), parseInt(last) + parseInt(next)];
        } else if (next !== 0) {
            prev = [...prev, next];
        }
        return prev;
    }, [])
    if (dir === 1) {
        mergedCell.reverse();
    }
    return fillWithDefault(mergedCell, dir, len);
}

const fillWithDefault = (input, dir, len) => {
    if (dir == 0) {
        return [...input, (new Array(len - input.length).fill(0))].flat()
    } else {
        return [(new Array(len - input.length).fill(0)), ...input].flat()
    }
    
}

export default { insertRandomCell, getInitialMatrix, moveNumbers}

