export default (dirtyArr)=>{
    const arrWithIds = dirtyArr ? dirtyArr : [];
    const newObj = {};
    arrWithIds.forEach(obj=>{
        newObj[obj.id] = {...obj};
    });
    return newObj;
}