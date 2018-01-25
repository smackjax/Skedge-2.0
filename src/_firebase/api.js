import firebase from './firebase-app';
const db = firebase.database().ref();
const schedules = db.child("schedules");

export const getUser = ()=>{
    return firebase.auth().currentUser
}

export const createAccountOrSignIn=(isNewAccount, email, password, displayName, handleErrorMsg )=>{
    return (()=>(
        // Sets correct sign-in function
        isNewAccount ? 
            firebase.auth().createUserWithEmailAndPassword(email, password) :
            firebase.auth().signInWithEmailAndPassword(email, password)
    ))()
    .then(user=>{
        // Sets display name for new account
        if(isNewAccount){
            const newDisplayName = displayName || "No display name"
            user.updateProfile({
                displayName: newDisplayName
            });
        }
        return true;
    })
    .catch(err=>{
        console.log("Error signing in: ", err);
        const code = err.code;

        // Sets error message, if any
        const msg = 
        code === "auth/user-not-found" ? 
            "Could not find user with that email" :
        code === "auth/invalid-email" ? 
            "Email address is invalid" :
        code === "auth/email-already-in-use" ?
           "Email already has an account" :
        code === "auth/wrong-password" ? 
            "Please check your password" : 
        "Sorry, something went wrong. Please try again.";
        handleErrorMsg(msg); 
    })
}

export const getUserSchedules=(userId)=>{
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

export const deleteSchedule=(schedId)=>{
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

// Sched Data
const genericSaveData=( schedId, dataKey, dataObj )=>{
    console.log("schedId:", schedId);
    return schedules
    .child(schedId)
    .child(dataKey)
    .child(dataObj.id)
    .update(dataObj)
}

const genericDeleteData=( schedId, dataKey, dataId )=>{
    return schedules
    .child(schedId)
    .child(dataKey)
    .child(dataId)
    .set(null)
}

export const saveMember=( schedId, memberObj )=>{
    return genericSaveData(schedId, 'members', memberObj)
}
export const deleteMember=( schedId, memberId)=>{
    return genericDeleteData( schedId, 'members', memberId )
}

export const saveGroup=(schedId, groupObj)=>{
    return genericSaveData(schedId, 'groups', groupObj)
}
export const deleteGroup=(schedId, groupId)=>{
    return genericDeleteData( schedId, 'groups', groupId )
}

export const saveTask=( schedId, taskObj)=>{
    return genericSaveData(schedId, 'tasks', taskObj)
}
export const deleteTask=( schedId, taskId)=>{
    return genericDeleteData( schedId, 'tasks', taskId )
}

export const saveDay=( schedId, dayObj)=>{
    return genericSaveData(schedId, 'days', dayObj)
}