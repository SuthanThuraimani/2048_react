import Helper from './../utils/helper';

describe('Helper method', () => {
    it('testing initialRandomCell', () => {
        const testAry = [4, 0, 0, 2, 0, 0];
        const randomFilled = Helper.insertRandomCell(testAry, 2);
        const sel = randomFilled.filter(ele => ele === 2);
        const empty = randomFilled.filter(ele => !ele);
        expect(sel.length).toEqual(2);
        expect(empty.length).toEqual(3);
    })
    it('testing getInitialMatrix', () => {
        const matrix = Helper.getInitialMatrix(3);
        expect(matrix.flat().length).toEqual(9);
    })
    it('testing convertToMatrix', () => {
        const matrix = Helper.convertToMatrix([1, 2, 3, 4, 5, 6, 7, 8, 9], 3);
        expect(matrix.length).toEqual(3);
        expect(matrix[0]).toEqual([1, 2, 3]);
    })
    it('testing processMatrix for left and right move', () => {
        const input = [[4, 2, 0], [2, 2, 0], [0, 2, 0]];
        let merged = Helper.processMatrix(input, 0, 3);
        expect(merged).toEqual([[4, 2, 0], [4, 0, 0], [2, 0, 0]]);
        merged = Helper.processMatrix(input, 1, 3);
        expect(merged).toEqual([[0, 4, 2], [0, 0, 4], [0, 0, 2]]);
    })
    it('testing transpose', () => {
        const input = [[4, 2, 0],[2, 2, 0],[0, 2, 0]];
        let out = Helper.transpose(input);
        expect(out).toEqual([[4, 2, 0], [2, 2, 2], [0, 0, 0]]);
    })
    it('testing getMergedScore', () => {
        const prev = [8, 8, 0, 2, 2, 0, 0, 2, 0];
        const next = [16, 0, 0, 4, 0, 2, 0, 2, 0];
        let out = Helper.getMergedScore(prev, next);
        expect(out).toEqual(20);
    })
    it('testing isGameActive', () => {
        let data = [[4, 8, 16], [16, 2, 4], [32, 16, 8]];
        expect(Helper.isGameActive(data)).toBe(false);
        data = [[4, 8, 16], [16, 2, 4], [32, 16, 0]];
        expect(Helper.isGameActive(data)).toBe(true);
        data = [[4, 8, 16], [16, 2, 4], [32, 16, 16]];
        expect(Helper.isGameActive(data)).toBe(true);
    })
})