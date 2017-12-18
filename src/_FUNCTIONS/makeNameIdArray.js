/*
    Creates array of {id, name} objects from main data list
*/
 function extractNameIdArray(dataObj){
    let finalArray = [];
    const ids = Object.keys(dataObj);
    for(let q = 0; q < ids.length; q++){
        finalArray.push({
            id: dataObj[ids[q]].id,
            name: dataObj[ids[q]].name
        });
    }
    return finalArray;
}
export default extractNameIdArray;
