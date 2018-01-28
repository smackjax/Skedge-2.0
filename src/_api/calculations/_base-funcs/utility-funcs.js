// Extracted for testing

// Returns true if all ids are in the currentList
export const checkInList=(currentIdList, idsToCheck)=>{
    let allInList = true;
    idsToCheck.forEach(
        id=>{

            if(!currentIdList.includes(id)){
                allInList = false;
            }
        }
    )
    return allInList;
}

// Returns true if none of the ids are in currentList
export const checkNotInList=(currentIdList, idsToCheck)=>{
    let noneInList = true;
    idsToCheck.forEach(
        id=>{
            if(currentIdList.includes(id)){
                noneInList = false;
            }
        }
    )
    return noneInList;
}

// Returns true if first array has any items from second
export const includesAny=(haystack, needles)=>{
    return needles.some(
        needle=>haystack.includes(needle)
    )
}