import { database } from './_firebase';
const schedules = database().ref().child("schedules");

export default ( schedId, dataKey, updateVals )=>{
    // Accepts updates object with updates under corresponding object key
    // deleted ids will be set to 'null'

    // 'meta' values are directly on schedule object
    if(dataKey === "meta"){
        return schedules
        .child(schedId)
        .update(updateVals)
    }

    return schedules
    .child(schedId)
    .child(dataKey)
    .update(updateVals);
}
