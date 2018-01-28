// No lists to keep in sync
export const saveDay=(store, newDayObj)=>{
    return {
        days: {
            [newDayObj.id] : newDayObj
        }
    }
}