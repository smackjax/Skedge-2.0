import uniqid from 'uniqid';

// Creates new member object from obj
// passed in.
// If the obj arg does not have a needed value,
// this initializes with a 'default'
export default (memberObj)=>{

    const {
        id, 
        name, 
        groups, 
        linkedTo,
        unavailableDates,
        totalTimesAssigned
    } = memberObj;
    
    const cleanedMemberObj ={
        id: (id || uniqid('m-')),
        name: (name || "" ),
        groups: (groups || []),
        linkedTo: (linkedTo || ""),
        totalTimesAssigned: (totalTimesAssigned || 0),
        unavailableDates: (unavailableDates || [])
    }
    return cleanedMemberObj;
} 