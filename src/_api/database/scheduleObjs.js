import { database } from './_firebase';
const schedules = database().ref().child("schedules");

export const getSchedulesByUserId=(userId)=>{
    return schedules
    // Order Schedules by their owner id
    .orderByChild("ownerId")
    // Grab schedules with owned by user
    .equalTo(userId)
    // Return object with these schedules
    .once("value")
    .then(schedulesSnap=>{
        return schedulesSnap.val()
    })
}

export const deleteScheduleById=(schedId)=>{
    return schedules.child(schedId).set(null)
}

export const createNewSchedule=(userId, newSchedName)=>{
    const newKey = schedules.push().key;

    const newSchedule = {
            "id": newKey,
            "name" : newSchedName,
            "pendingViewerIds": [],
            "authenticatedViewers": [],
            "ownerId": userId,
            "activeDateRangeId" : "",
            
            "dateRanges": {},
            "members": {},
            "groups" : {},
            "tasks": {},
            "days" : {}
    }

    return schedules
    .child(newKey)
    .set(newSchedule)
    .then(success=>newSchedule)
}
