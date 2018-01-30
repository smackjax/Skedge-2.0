/* Api folders are ordered by where they data 
they deal with comes from or goes to.
Note that api functions, especially action creators,
can call api functions for other places. 

./actions -- Action creators
./database -- functions dealing with remote data
./local-data -- functions dealing with locallly stored data
*/

// Current data actions
export * from './actions';

export {
    // Schedule
    getSchedulesByUserId,
    createNewSchedule,

    
    // User
    createAccountOrSignIn,
    getUser,
    signOut
} from './database';