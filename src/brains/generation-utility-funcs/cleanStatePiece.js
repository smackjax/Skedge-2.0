export default (statePiece, idSublistKey, existingIds)=>{
    // StatePiece would be, for example state.members
    const ids = Object.keys(statePiece);
    const newState={...statePiece};
    ids.forEach( id=>{
        const currentList = newState[id][idSublistKey];
        newState[id][idSublistKey] = currentList.filter(
            dirtyId=>existingIds.includes(dirtyId)
        )
    } )
    return newState;
}