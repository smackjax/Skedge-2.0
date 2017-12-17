import React from 'react';
import PropTypes from 'prop-types';
import './list-item.style.css';


const ListItemGeneric = (props)=>{
    const addedClassNames = 
        (props.className || "") + " " + 
            props.bgColorClassName;

    return(
        <div className={'list-item ' + addedClassNames}>
            {props.children}
        </div>
    )
}
ListItemGeneric.propTypes={
    className: PropTypes.string,
    bgColorClassName: PropTypes.string.isRequired
}
export default ListItemGeneric;