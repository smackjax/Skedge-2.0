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

export const createNewSchedule=(userId, newSchedName, newScheduleId)=>{
    return checkIfScheduleIdExists(newScheduleId)
    .then(schedule=>{
        if(schedule) throw Error("Schedule Id exists. Nice try.")
            if(!newScheduleId) throw Error("No schedule id passed to creation");

        const newKey = newScheduleId;
        const newSchedule = {
                "id": newKey,
                "name" : newSchedName,
                "ownerId": userId,
        }
        
        return schedules
        .child(newKey)
        .set(newSchedule)
        .then(success=>newSchedule)
    })
    
}

export const checkIfScheduleIdExists = (scheduleId)=>{
    return schedules.child(scheduleId).once('value').then( snap=>snap.exists() )
}