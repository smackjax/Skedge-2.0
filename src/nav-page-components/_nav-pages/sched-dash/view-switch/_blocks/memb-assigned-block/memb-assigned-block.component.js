import React from 'react';
import PropTypes from 'prop-types';
import './memb-assigned-block.style.css';

const MembAssignedBlock = (props)=>{
    return (
        <div className="sublist-item text-member">
            {props.membName}
        </div>
    )
}

MembAssignedBlock.propTypes={
    membName: PropTypes.string.isRequired
}

export default MembAssignedBlock;