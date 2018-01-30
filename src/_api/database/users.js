import {auth} from './_firebase';
import {
    LOAD_REDUX_STATE
} from '../../_action-types';
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
            "Couldn't find account" :
        code === "auth/invalid-email" ? 
            "Invalid email" :
        code === "auth/email-already-in-use" ?
           "Account already exists" :
        code === "auth/wrong-password" ? 
            "Password incorrect" : 
        "Sorry, something went wrong. Please try again.";
        handleErrorMsg(msg); 
    })
}

const GoogleProvider = new auth.GoogleAuthProvider();
GoogleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

export const signInWithGoogle=()=>{
    return auth().signInWithRedirect(GoogleProvider)
}

export const signOut=()=>(
    (dispatch)=>{

        return auth().signOut()
        .then(success=>{
            // Dispatching empty state object resets store
            dispatch({
                type: LOAD_REDUX_STATE,
                payload: {}
            })
        })
    }
)
// On hold...
// const switchUserType=(userId)=>{}
// const changeDisplayName=(newDisplayName)=>{}
// const changePassword=()=>{}
// const closeAccount=(userId, password)=>{}