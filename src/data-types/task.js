import uniqid from 'uniqid';

// Creates new member object from obj
// passed in.
// If the obj arg does not have a needed value,
// this initializes with a 'default'
export default (taskObj)=>{

    const {
        id, 
        name, 
        groups,
        isExclusive,
        // How many members need to be assigned TODO in gui
        numNeeded,
        // Holds amount of times membId has been assigned to task
        timesAssigned,
    } = taskObj;
    
    const cleanedTaskObj ={
        id: (id || uniqid('m-')),
        name: (name || "" ),
        groups: (groups || []),
        isExclusive: (isExclusive || false), 
        numNeeded: (numNeeded || 1),
        timesAssigned : (timesAssigned || {})
    }
    return cleanedTaskObj;
} 