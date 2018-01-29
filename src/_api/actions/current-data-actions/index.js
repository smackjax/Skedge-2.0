// Master data api
// All data actions go through here, 
// and all functions here return promises 
// for local data syncing to remote

    // The steps are...
// 1. Capture action that needs to take place
// 2. Get current store
// 3. Calculate updates to the store
    // Take updated values object and...
// 4
    // 4.a Apply updates to redux store
    // 4.b Save redux store to local data(in entirety)
    // These always happen, and don't
    // affect the remaining steps

// 5. Save updates to local data
// 6. Update remote data from local data
    // If remote sync succeeds
// 7.a Clear local update key
    // If remote sync fails 
// 7.b Retry remote sync on the next update

/* update object example
{
    groups: { gId: {...newValues} },
    members: { mId: {...newValues} }
} 
*/

// Members data actions
export * from './members';

// Groups
export * from './groups';

// Tasks
export * from './tasks';

// Days
export * from './days';

// Meta
export * from './meta';

// Date ranges
export * from './date-ranges';


// Schedules
export * from './schedules';