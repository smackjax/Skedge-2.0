export default (arrWithIds)=>{
    const newObj = {};
    arrWithIds.forEach(obj=>{
        newObj[obj.id] = {...obj};
    });
    return newObj;
}