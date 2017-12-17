import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../_modal/modal.component';
import {
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooterBtns
} from '../../_generic-modal-components';
import { EditItemName } from '../../_generic-item-edit-components/';
import { TasksSelectableSublist } from '../../../selectable-sublists/';
import * as icons from '../../../_icons';

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
        console.log("TODO save task: ");
        console.log(this.state.task);
    }
    handleDelete=()=>{ 
        console.log("TODO delete task id: " + this.state.task.id);
    }

    handleNewVal=(propName, newValue)=>{
        const newTask = {
            ...this.state.task,
            [propName]: newValue
        }
        this.setState({task: newTask});
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
                    text={task.name || "NEW"}
                    >
                        {icons.task}
                    </ModalHeader>
                    
                    <ModalContent>
                        <EditItemName
                        placeholder={"Task name"}
                        value={task.name}
                        onChange={this.handleNameChange.bind(this)}
                        />

                        <TasksSelectableSublist 
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
}

export default TaskItemEditModal;