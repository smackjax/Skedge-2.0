import {
    checkInList,
    checkNotInList,
    includesAny
} from './utility-funcs';

describe("Calculation array helper funcs", ()=>{
    it("Should show if even one item is in other array", ()=>{
        const haystack = ['val1', 'val2', 'val3'];
        const needles = ['val2'];
        const result = includesAny(needles, haystack);
        expect(result).toEqual(true);

        const haystack2 = ['val1', 'val4', 'val3'];
        const needles2 = ['val2'];
        const result2 = includesAny(needles2, haystack2);
        expect(result2).toEqual(false);
    }),
    it("Should show if all items are in other array", ()=>{
        const haystack =  ['val1', 'val2','val3', 'val4', 'val5'];
        const needles =  ['val2','val3', 'val4'];
        const result = checkInList(haystack, needles);
        expect(result).toEqual(true);

        const haystack2 =  ['val1', 'val2','val3', 'val4', 'val5'];
        const needles2 =  ['val2','val3', 'val4','val6'];
        const result2 = checkInList(haystack2, needles2);
        expect(result2).toEqual(false);
    }),
    it("Should show if none of the items are in other array", ()=>{
        const haystack =  ['val1','val3', 'val4', 'val5'];
        const needles =  ['val2', 'val6'];
        const result = checkNotInList(haystack, needles);
        expect(result).toEqual(true);

        const haystack2 =  ['val1','val3', 'val4', 'val5'];
        const needles2 =  ['val2', 'val3', 'val6'];
        const result2 = checkNotInList(haystack2, needles2);
        expect(result2).toEqual(false);
    })
})