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
    .then( snap=>snap.val() )
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

export const requestToFollowSchedule = (scheduleId)=>{
    const user = getUser();

    return new Promise(resolve=>{
        checkIfConfirmed(scheduleId, user.uid)
        .then(
            alreadyExists=>{

                if(alreadyExists){ resolve(true) }
                else {
                    const updates = {
                        [`${scheduleId}/followers/pending/${user.uid}`] : {
                            id: user.uid,
                            name: user.displayName
                        }
                    }
                    schedules.update(updates)
                    // 'update' doesn't return anything, so manually resolve to true
                    .then(success=>resolve(true))
                }
            }
        )
    })
}


const checkIfConfirmed = (scheduleId, userId) => {

    return schedules.child(scheduleId)
    .child("followers").child('confirmed')
    .child(userId)
    .once('value').then(snap=>snap.exists())
}