import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooterBtns
} from '../../_generic-modal-components';
import { EditItemName, DeleteItemBtn } from '../../_generic-item-edit-components';
import { GroupsSelectableSublist } from '../../../selectable-sublists/';

import * as icons from '../../../_icons';

class MemberItemEditModal extends React.Component{
    state={
        member: {}
    }
    componentWillReceiveProps({item}){
        // Keeps from switching to uncontrolled input
        const member = item || {
            name: "",
            groups: [],
            totalTimesAssigned: 0,
            unavailableDates: [],
            linkedTo: ""
        };
        
        this.setState({
            member,
            originalName: member.name
        });
    }

    handleSave=()=>{
        this.props.handleSave(this.state.member);
    }
    handleDelete=()=>{ 
        this.props.handleDelete(this.state.member.id);
    }

    handleNewVal=(propName, newValue)=>{
        const newMember = {
            ...this.state.member,
            [propName]: newValue
        }
        this.setState({member: newMember});
    }

    handleNameChange=({target})=>{
        const newName = target.value;
        this.handleNewVal("name", newName);
    }
    handleGroupsList=(newList)=>{
        this.handleNewVal("groups", newList);
    }
    handleNewLinked=({target})=>{
        const newLinkedUsername = target.value;
        this.handleNewVal("linkedUsername", newLinkedUsername);
    }

    render(){
        
        const member = this.state.member || {};
        const headerText = this.state.originalName || "New Member";

        return (
            <Modal open={this.props.open}>
                <ModalBody>
                    <ModalHeader
                    className="bg-member text-light"
                    
                    >
                        {icons.member}
                        {headerText}
                    </ModalHeader>
                    <ModalContent>

                            <div>
                                { this.state.originalName ? (
                                    <DeleteItemBtn  
                                    onClick={this.handleDelete.bind(this)}
                                    />
                                ) : ""}

                                <EditItemName
                                placeholder={"Member name"}
                                value={member.name}
                                onChange={this.handleNameChange.bind(this)}
                                />

                                <GroupsSelectableSublist 
                                selectedIds={member.groups}
                                handleNewList={this.handleGroupsList.bind(this)}
                                />
                            </div>
                    </ModalContent>
                    <ModalFooterBtns
                    bgClassName="bg-member"
                    handleSave={this.handleSave.bind(this)}
                    handleCancel={this.props.handleClearEdit}
                    />
                </ModalBody>
            </Modal>
        )
    }
    
}

MemberItemEditModal.propTypes ={
    open: PropTypes.bool.isRequired,
    bgColorClassName: PropTypes.string,
    // Either an object or false
    item: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ]),
    // Clears selected item, closing modal
    handleClearEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired
}

export default MemberItemEditModal;