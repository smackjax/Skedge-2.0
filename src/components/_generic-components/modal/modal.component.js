import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { CSSTransition } from 'react-transition-group';
import './modal.style.css';

const addBodyScroll=()=>{
    document.body.style.overflow = "auto";
} 

const removeBodyScroll=()=>{
    document.body.style.overflow = "hidden";
}


const duration = 300;

class Modal extends React.Component {
    state={
        key: shortid('modal-')
    }
    
    // Places children inside main 'content' div,
    // floating on screen background
    render(){

        return (
            <CSSTransition 
            in={this.props.open} 
            timeout={duration}
            className="modal"
            classNames="modal"
            mountOnEnter={true}
            unmountOnExit={true}
            onEnter={removeBodyScroll}
            onExit={addBodyScroll}
            >    
                <div
                key={this.state.key}
                >
                    {this.props.children}
                </div>

            </CSSTransition >
        )
    }
    
}
Modal.propTypes={
    open: PropTypes.bool.isRequired
}

export default Modal;