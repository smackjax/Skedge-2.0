import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { CSSTransition } from 'react-transition-group';
import './dropdown.style.css';

const duration = 400;
const closeDropdown = (htmlNode)=>{
    const newHeight = "0px";
    htmlNode.style.maxHeight = newHeight;
}

const openDropdown = (htmlNode)=>{
    const newHeight =
        "" + htmlNode.scrollHeight + "px";
    htmlNode.style.maxHeight = newHeight;
}

const HeightDropdown = (props)=>{
    return (
        <CSSTransition 
        in={props.open} 
        timeout={duration}
        className={"max-height-dropdown " + (props.className || "")}
        classNames="max-height-dropdown"
        mountOnEnter={true}
        unmountOnExit={true}
        onEnter={closeDropdown}
        onEntering={openDropdown}
        onExiting={closeDropdown}
        >    
        <div className={(props.className || "")}>
            {props.children}
        </div>
        </CSSTransition >
    )
}
HeightDropdown.propTypes ={
    className: PropTypes.string,
    open: PropTypes.bool.isRequired
} 

export default HeightDropdown;