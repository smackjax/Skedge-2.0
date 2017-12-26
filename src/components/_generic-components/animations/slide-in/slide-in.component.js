import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './slide-in.style.css';

const duration = 300;

const SlideInAnimation = (props)=>{
    const className = 
        "slide-" + props.direction;
    return(
        <CSSTransition 
        in={props.open} 
        timeout={duration}
        className={"slide-animation"}
        classNames={className}
        mountOnEnter={true}
        unmountOnExit={true}
        >
            {props.children}
        </CSSTransition>
    )
}

SlideInAnimation.propTypes={
    open: PropTypes.bool.isRequired,
    direction: PropTypes.string.isRequired
}

export default SlideInAnimation;