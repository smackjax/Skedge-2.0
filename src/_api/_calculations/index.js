// All functions return an 'update' object
// with updates to each affected object 
// under its id under it's redux key

/* I. E.
return {
    members: {
        updatedMemberId: { wholeUpdatedMemberObject },
        updatedMemberId: { wholeUpdatedMemberObject },
    },
    groups: {
        updatedGroupId: { wholeUpdatedGroupObject}
    }
}
*/

export *  from './members';
export * from './groups';
export * from './tasks';
export * from './days';