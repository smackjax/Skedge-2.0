import { database } from './_firebase';
import { getUser } from './users';
const schedules = database().ref().child("schedules");
const users = database().ref().child("users");

// Schedules update the users 
export const getFollowedSchedulesFromDatabase=()=>{
    // Get database reference
    const userRef = users.child( getUser().uid );
    return userRef.child('followedSchedules').once('value')
    .then(snapshot=>{
        return snapshot.val()
    })
}

export const getFollowedScheduleData=(scheduleId)=>{
    const scheduleRef = schedules.child(scheduleId);
    return scheduleRef.once('value')
    .then( snap=>{
        if(!snap.exists()) return null;
        return snap.val();
    })
    // Check for needed fields
    .then( schedule=>{
        if(
            schedule === null ||
            !schedule.activeDateRangeId ||
            !schedule.dateRanges || 
            !schedule.dateRanges[schedule.activeDateRangeId]
        ) return null
        return schedule;
    })
    .then( schedule => {
        if(schedule === null) return null;
        
        const id = schedule.id;
        const name = schedule.name || "No name";
        const data = schedule.dateRanges[schedule.activeDateRangeId];
        return {
            id,
            name,
            data
        }
    })
}