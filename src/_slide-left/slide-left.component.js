import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
const SlideLeft = (props)=>{
    return (
        <CSSTransition 
        in={props.open} 
        timeout={duration}
        className={"slide-in-left"}
        classNames="slide-in-left"
        mountOnEnter={true}
        unmountOnExit={true}
        >   
        <div className="slide-in-left-content">
            {props.children}
        </div>
        </CSSTransition>
    )
}

SlideLeft.propTypes ={

}

export default SlideLeft;
