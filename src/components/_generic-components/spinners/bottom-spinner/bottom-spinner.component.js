import React from 'react';
import * as icons from '../../icons';
import './bottom-spinner.style.css';

export default (props)=>{
    return (
        <div className="bottom-spinner text-sched">
            {icons.gearSpinner}
        </div>
    )
}