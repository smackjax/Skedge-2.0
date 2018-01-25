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