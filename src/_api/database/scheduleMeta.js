import updateSchedData from './_updateSchedData';


export const changeScheduleName=(schedId, newName)=>{
    return updateSchedData(
        schedId, 
        'name', 
        newName
    );
}
export const changeActiveDateRangeId=(schedId, dateRangeId)=>{
    return updateSchedData(
        schedId,
        'activeDateRangeId',
        dateRangeId
    );
}

// On hold...
// const updateSchedUsername=(userId, schedId, newUsername)=>{}
// const updateSchedDisplayName=(userId, schedId, newDisplayName)=>{}