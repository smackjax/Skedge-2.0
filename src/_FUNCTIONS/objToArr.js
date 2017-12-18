// Creates array from object list, assigning it's key as 'id' if not present
export default function(objectToChange){
    const objectKeys = Object.keys(objectToChange);
    const newArray = [];
    for(let q = 0; q < objectKeys.length; q++){
        const currentObject = {...objectToChange[objectKeys[q]]};
        if(!currentObject.id){ 
            currentObject.id = objectKeys[q];
        }
        newArray.push(currentObject);
    }
    return newArray;
}
