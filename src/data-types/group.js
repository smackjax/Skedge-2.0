import uniqid from 'uniqid';

// Creates newobject from obj
// passed in.
// If the obj arg does not have a needed value,
// this initializes with a 'default'
export default (groupObj)=>{
    const {id, name, members } = groupObj;
    const cleanedGroupObj ={
        id: (id || uniqid('g-')),
        name: (name || "" ),
        members: (members || [])
    }
    return cleanedGroupObj;
} 