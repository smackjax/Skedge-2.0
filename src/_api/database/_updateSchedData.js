import { database } from './_firebase';
const schedules = database().ref().child("schedules");

export default ( schedId, dataKey, updateVals )=>{
    // Accepts updates object with updates under corresponding object key
    // deleted ids will be set to 'null'
    return schedules
    .child(schedId)
    .child(dataKey)
    .update(updateVals);
}
