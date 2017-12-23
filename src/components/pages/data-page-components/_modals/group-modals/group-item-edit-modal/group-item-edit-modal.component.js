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

import { 
    MembersSelectableSublist
} from '../../../selectable-sublists/';

import * as icons from '../../../_icons';

class GroupItemEditModal extends React.Component{
    state={}
    
    componentWillReceiveProps({item}){
        // Keeps from switching to uncontrolled input
        const group = item || {
            id: "", 
            name: "",
            members: [],
        };
        this.setState({
            group,
            originalName: group.name
        });
    }

    handleSave=()=>{
        this.props.handleSave(this.state.group);
    }
    handleDelete=()=>{ 
        this.props.handleDelete(this.state.group.id);
    }

    handleNewVal=(propName, newValue)=>{
        const newGroup = {
            ...this.state.group,
            [propName]: newValue
        }
        this.setState({group: newGroup});
    }

    handleNameChange=({target})=>{
        const newName = target.value;
        this.handleNewVal("name", newName);
    }
    handleMembersList=(newList)=>{
        this.handleNewVal("members", newList);
    }

    render(){
    
        const group = this.state.group || {};
        const headerText = this.state.originalName || "New group";
        return (
            <Modal open={this.props.open}>
                <ModalBody>
                    <ModalHeader
                    className="bg-group text-light"
                    >
                        {icons.group}
                        {headerText}
                    </ModalHeader>
                    
                    <ModalContent>
                        <DeleteItemBtn 
                        onClick={this.handleDelete.bind(this)}
                        />
                        <EditItemName
                        placeholder={"Group name"}
                        value={group.name}
                        onChange={this.handleNameChange.bind(this)}
                        />

                        <MembersSelectableSublist 
                        selectedIds={group.members}
                        handleNewList={this.handleMembersList.bind(this)}
                        />
                    </ModalContent>

                    <ModalFooterBtns
                    bgClassName="bg-group"
                    handleSave={this.handleSave.bind(this)}
                    handleCancel={this.props.handleClearEdit}
                    />

                </ModalBody>
            </Modal>
        )
    }
    
}

GroupItemEditModal.propTypes ={
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

export default GroupItemEditModal;