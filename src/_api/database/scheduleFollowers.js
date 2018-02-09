import { database } from './_firebase';
import { getUser } from './index';
const schedules = database().ref().child("schedules");

export const authorizeFollower=(scheduleId, followerObj)=>{
    const followerId = followerObj.id;
    
    const pathToPendingUser = 
        `schedules/${scheduleId}/followers/pending/${followerId}`;
    
    // Path to all confirmed follower objects on schedule
    const confirmedUsersOnSchedulePath = 
        `schedules/${scheduleId}/followers/confirmed/${followerId}`;

    // Path to all user objects on database 
    const scheduleOnUserPath= 
        `users/${followerId}/followedSchedules/${scheduleId}`;

    const updates = {
        // Delete pending user
        [pathToPendingUser]: null,
        // Add user to 'confirmed'
        [confirmedUsersOnSchedulePath]: followerObj,
        // Add schedule to user id under database 'users'
        [scheduleOnUserPath] : true
    }
    
    // Updates both schedule and new user following schedule
    return database().ref()
    .update(updates)
}

export const deleteFollower=(scheduleId, followerId)=>{
    const updates = {
        // Delete from confirmed
        [`schedules/${scheduleId}/followers/confirmed/${followerId}`] : null,
        // Delete from pending
        [`schedules/${scheduleId}/followers/pending/${followerId}`] : null,
        // Delete schedule from 'followed' under user
        [`users/${getUser().uid}/followedSchedules/${scheduleId}`] : null
    }
    
    return database().ref().update(updates)

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

