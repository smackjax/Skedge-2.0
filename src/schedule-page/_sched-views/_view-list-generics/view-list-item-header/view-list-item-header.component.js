import React from 'react';
import PropTypes from 'prop-types';
import './view-list-item-header.style.css';

const ViewListItemHeader = (props)=>{
    const className =
        "view-list-item-header " + 
            (props.className || "")


    return (
        <label
        className={className}>
            {props.children}
        </label>    
    )
}

ViewListItemHeader.propTypes={
    className: PropTypes.string,
    onClick: PropTypes.func
}

export default ViewListItemHeader;