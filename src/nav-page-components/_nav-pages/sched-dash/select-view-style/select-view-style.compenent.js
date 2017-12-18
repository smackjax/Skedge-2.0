import React from 'react';

export default (props)=>{
    // props.current 'default' || 'collapsed'...
    // props.onChange

    const handleChange = (e)=>{
       props.onChange(e.target.value)
    }
    return (
        <div className="container">
        <div className="row">

         {/*Default view filter*/}
        <div className="form-check col-4">
            <label className="form-check-label">
                <input type="radio" 
                onChange={handleChange}
                className="form-check-input" 
                name="viewOptions" 
                id="viewOption-default" 
                checked={'default' === props.current}
                value="default" />
                Default
            </label>
        </div>

         {/*Collapsed view filter*/}
         <div className="form-check col-4">
            <label htmlFor='viewOption-collapsed' className="form-check-label">
                <input type="radio" 
                onChange={handleChange}
                className="form-check-input" 
                name="viewOptions" 
                id="viewOption-collapsed" 
                checked={'collapsed' === props.current}
                value="collapsed" />
                Collapsed
            </label>
        </div>

         {/*By member view filter*/}
         <div className="form-check col-4">
            <label className="form-check-label">
                <input type="radio" 
                onChange={handleChange}
                className="form-check-input" 
                name="viewOptions" 
                id="viewOption-members" 
                checked={'members' === props.current}
                value="members" />
                Members
            </label>
        </div>
        

        </div>
        </div>
    )
}
