import React from 'react';

export default (props)=>{
    const testObj = {
        "prop1": "val1",
        "prop2": "val2",
        "prop3": "val3",
    }
    const handleForm=(e)=>{
        e.preventDefault();

        const secondObj = Object.map(
            testObj, 
            (arg1, arg2)=>{
                console.log("arg1: ", arg1);
                console.log("arg2", arg2);
            }
        );

        console.log("Second Obj: ", secondObj);
        
    }

    return(
    <form onSubmit={handleForm}>
    <input type="submit"
    value="Fire"
    />
    
  </form> 
)
}