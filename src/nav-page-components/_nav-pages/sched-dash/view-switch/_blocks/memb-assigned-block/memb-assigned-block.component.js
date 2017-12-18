import React from 'react';

import colors from '../../../../../_RESOURCES/colors';
import './memb-assigned-block.style.css';
export default (props)=>{
    // props.membName
    return (
        <div style={{color: colors.member}} className="sublist-item">
            {props.membName}
        </div>
    )
}
