export default (objOrArr, subKey)=>{
    const objectToCheck = objOrArr;
    const ids = Object.keys(objectToCheck);
    let lowest = null;
    ids.forEach(
        (id)=>{
            const item = objectToCheck[id];
            const currentNumber = subKey ? item[subKey] : item;
            if(currentNumber < lowest || lowest === null){
                lowest = currentNumber;
            }
        }
    )
    return lowest || 0;
}