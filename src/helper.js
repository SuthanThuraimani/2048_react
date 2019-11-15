
const getInitialMatrix = (n) => new Array(n).fill().map((e, i) => new Array(n).fill(0));
const getEmptyCells = (ary) => ary.map((ele, idx) => (ele === 0) ? idx : 'EMPTY').filter(ele => ele !== 'EMPTY');
const isEmptyAvailable = (ary) => getEmptyCells(ary).length === 0;

const insertRandomCell = (ary, val) => {
    const presentMatrix = [...ary];
    const emptyCells = getEmptyCells(presentMatrix);
    console.log(presentMatrix,emptyCells);
    const index = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    console.log(emptyCells);
    return presentMatrix.fill(val, index, index + 1);    
}


const moveNumbers = (ary) => {
    const aryMatrix = [...ary];
    //Logic to write to merge and move
};


export default { insertRandomCell, getInitialMatrix, moveNumbers}

