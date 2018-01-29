import {auth} from './_firebase';

export const getUser = ()=>{
    return auth().currentUser
}

export const createAccountOrSignIn=(isNewAccount, email, password, displayName, handleErrorMsg )=>{
    return (()=>(
        // Sets correct sign-in function
        isNewAccount ? 
            auth().createUserWithEmailAndPassword(email, password) :
            auth().signInWithEmailAndPassword(email, password)
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

// On hold...
// const switchUserType=(userId)=>{}
// const changeDisplayName=(newDisplayName)=>{}
// const changePassword=()=>{}
// const closeAccount=(userId, password)=>{}