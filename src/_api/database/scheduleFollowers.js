import { database } from './_firebase';
const schedules = database().ref().child("schedules");

export const authorizeFollower=(scheduleId, followerId)=>{
    return schedules.child(scheduleId).child('followers')
    .child(followerId)
    .update({
        confirmed: true
    })
}

export const deleteFollower=(scheduleId, followerId)=>{
    return schedules.child(scheduleId).child('followers')
    .update({
        [followerId]: null
    })
}

export const listenToAllFollowers=(scheduleId, callback)=>{
    if(scheduleId){
        return schedules.child(scheduleId).child('followers').on('value', (snapshot)=>{
            callback(snapshot.val())
        })
    } else {
        throw Error("No schedule id given.");
    }
}

export const stopListeningToFollowers=(scheduleId)=>{
    console.log("Removing followers listener from ", scheduleId)
    if(scheduleId){
        
        return schedules.child(scheduleId).child('followers').off()
    }
}

