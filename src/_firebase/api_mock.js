const createAccountOrSignIn=(newAccount, email, password, handleErrorMsg)=>{}

// On hold...
const switchUserType=(userId)=>{}
const changeDisplayName=(newDisplayName)=>{}
const changePassword=()=>{}
const closeAccount=(userId, password)=>{}

// Creator sched actions
const createNewSchedule=(userId)=>{}
const getUserSchedules=(userId)=>{

}
const deleteSchedule=(userId, schedId)=>{
    // Delete schedule
}
const updateSchedUsername=(userId, schedId, newUsername)=>{}
const updateSchedDisplayName=(userId, schedId, newDisplayName)=>{}
const changeActiveSchedEdit=(userId, newActiveSchedId)=>{}
const changeActiveDateRange=(userId, schedId, dateRangeId)=>{}

// Worker sched actions
const changeViewingSched=(userId, schedId)=>{}

const saveMember=( userId, schedId, memberObj )=>{}
const deleteMember=( userId, schedId, memberId)=>{}

const saveGroup=(userId, schedId, groupObj)=>{}
const deleteGroup=(userId, schedId, groupId)=>{}

const saveTask=(userId, schedId, taskObj)=>{}
const deleteTask=(userId, schedId, taskId)=>{}

const saveTasksOnDay=(userId, schedId, dayObj)=>{}
