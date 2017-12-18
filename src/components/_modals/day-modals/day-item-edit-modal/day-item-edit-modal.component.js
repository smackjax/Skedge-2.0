import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../_modal/modal.component';

import {
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooterBtns
} from '../../_generic-modal-components';

import { 
    TasksSelectableSublist
} from '../../../selectable-sublists/';

import * as icons from '../../../_icons';


class DayItemEditModal extends React.Component{
    state={}
    
    componentWillReceiveProps({item}){
        // Keeps from switching to uncontrolled input
        const day = item || {
            id: "", 
            name: "",
            tasks: []
        };
        
        this.setState({day});
    }

    handleSave=()=>{
        this.props.handleSave(this.state.day);
    }

    handleNewVal=(propName, newValue)=>{
        const newDay = {
            ...this.state.day,
            [propName]: newValue
        }
        this.setState({day: newDay});
    }

    handleNameChange=({target})=>{
        const newName = target.value;
        this.handleNewVal("name", newName);
    }
    handleTasksList=(newList)=>{
        this.handleNewVal("tasks", newList);
    }

    render(){
    
        const day = this.state.day || {};
        return (
            <Modal open={this.props.open}>
                <ModalBody>
                    <ModalHeader
                    className="bg-day text-light"
                    text={day.name || "NEW"}
                    >
                        {icons.day}
                    </ModalHeader>
                    
                    <ModalContent>
                        <TasksSelectableSublist 
                        selectedIds={day.tasks}
                        handleNewList={this.handleTasksList.bind(this)}
                        />
                    </ModalContent>

                    <ModalFooterBtns
                    bgClassName="bg-day"
                    handleSave={this.handleSave.bind(this)}
                    handleCancel={this.props.handleClearEdit}
                    />
                </ModalBody>
            </Modal>
        )
    }
    
}

DayItemEditModal.propTypes ={
    open: PropTypes.bool.isRequired,
    // Either an object or false
    item: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    // Clears selected item
    handleClearEdit: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired
}

export default DayItemEditModal;