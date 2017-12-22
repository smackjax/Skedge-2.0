import React from 'react';
import PropTypes from 'prop-types';
import './view-list-item.style.css';

const ViewListItem = (props)=>{
    const className= 
        "view-list-item-wrapper " +
            (props.className || "");
    return (
        <div 
        className={className}
        >
            <div 
            className={"view-list-item-header " + (props.headerClassName || "")}>
                <span>
                    {props.itemIcon}
                    {props.itemText}
                </span>
            </div>
            <div className="view-list-item-content">
                { props.children }
            </div>
        </div>
    )
}

ViewListItem.propTypes={
    itemText: PropTypes.string.isRequired,
    headerClassName: PropTypes.string
}

export default ViewListItem;