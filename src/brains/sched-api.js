import reduxStore from '../_redux/redux-store';
// Important notes
// Once a schedule is generated, it doesn't rely on any other info(like getting a name from an id)
    // This ensures the ability to view past schedules and avoids conflicts with deletion

import GenDateRange from './gen-new-date-range';

export function getOneSched(schedId){
    const schedsById = {...reduxStore.getState().schedules};
    return schedsById["schedId1"] 
}

export function genNewDateRange(startDateStr, endDateStr, store){
    /*  Returns: {
            newDateRange, 
            newMembVals,
            newTaskVals
        }
    */
    return GenDateRange(
        startDateStr, 
        endDateStr,
        store
    );        
}




