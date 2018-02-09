import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooterBtns
} from '../../_generic-modal-components';
import { 
    EditItemName,
    DeleteItemBtn
} from '../../_generic-item-edit-components/';
import { GroupsSelectableSublist } from '../../../selectable-sublists/';
import * as icons from '../../../_icons';
import './task-item-edit-modal.style.css';


class TaskItemEditModal extends React.Component{
    state={}
    
    componentWillReceiveProps({item}){
        // Keeps from switching to uncontrolled input
        const task = item || {
            id: "", 
            name: "",
            groups: [],
            isExclusive: false,
            numNeeded: 1,
            timesAssigned: {}
        };
        
        this.setState({task});
    }

    handleSave=()=>{
        this.props.handleSave(this.state.task);
    }
    handleDelete=()=>{ 
        this.props.handleDelete(this.state.task.id);
    }

    handleNewVal=(propName, newValue)=>{
        const newTask = {
            ...this.state.task,
            [propName]: newValue
        }
        this.setState({task: newTask});
    }

    handleNumNeeded=(e)=>{
        const  val = e.target.value;

        if(val === ""){
            this.handleNewVal("numNeeded", val);
            return;
        }

        const numNeeded = parseInt(val, 10);
        const cleanedNumber = 
            (!numNeeded ||  numNeeded <= 0) ?
                        1 : 
                        (numNeeded > 10) ? 
                            10 : numNeeded;

        this.handleNewVal("numNeeded", cleanedNumber);
    }
    handleIsExclusive=(e)=>{
        const isExclusive = e.target.checked;
        this.handleNewVal("isExclusive", isExclusive);
    }
    handleNameChange=({target})=>{
        const newName = target.value;
        this.handleNewVal("name", newName);
    }
    handleGroupsList=(newList)=>{
        this.handleNewVal("groups", newList);
    }

    render(){
        
        const task = this.state.task || {};

        return (
            <Modal open={this.props.open}>
                <ModalBody>
                    <ModalHeader
                    className="bg-task text-light"
                    >
                        {icons.task}
                        {task.name || "New task"}
                    </ModalHeader>
                    
                    <ModalContent>

                        { this.state.originalName ? (
                            <DeleteItemBtn 
                            onClick={this.handleDelete.bind(this)}
                            />
                        ) : ""}

                        <EditItemName
                        placeholder={"Task name"}
                        value={task.name}
                        onChange={this.handleNameChange.bind(this)}
                        />

                        <label className="number-needed-label custom-input">
                            <input type="number"
                            placeholder="#"
                            value={task.numNeeded}
                            onChange={this.handleNumNeeded}
                            className="number-needed-input"
                            />
                            <span className="text"># members needed</span>
                        </label>

                        
                        <label 
                        className="task-is-exclusive-label custom-input">
                            <input type="checkbox"
                            onChange={this.handleIsExclusive}
                            value={task.isExclusive}
                            className="task-is-exclusive-input"/>
                            <span className="text">Assigned exclusively</span>
                        </label>

                        <GroupsSelectableSublist 
                        selectedIds={task.groups}
                        handleNewList={this.handleGroupsList.bind(this)}
                        />
                    </ModalContent>

                    <ModalFooterBtns
                    bgClassName="bg-task"
                    handleSave={this.handleSave.bind(this)}
                    handleCancel={this.props.handleClearEdit}
                    />
                </ModalBody>
            </Modal>
        )
    }
    
}

TaskItemEditModal.propTypes ={
    open: PropTypes.bool.isRequired,
    // Either an object or false
    item: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    // Clears selected item
    handleClearEdit: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}

export default TaskItemEditModal;