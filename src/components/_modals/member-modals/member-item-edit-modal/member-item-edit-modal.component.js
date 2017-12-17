import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../../../_modal/modal.component';

import {
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooterBtns
} from '../../_generic-modal-components/';
import { EditItemName } from '../../_generic-item-edit-components';
import { GroupsSelectableSublist } from '../../../selectable-sublists/';
import * as icons from '../../../_icons';

class MemberItemEditModal extends React.Component{
    state={}
    
    componentWillReceiveProps({item}){
        // Keeps from switching to uncontrolled input
        const member = item || {
            name: "",
            groups: [],
            totalTimesAssigned: 0,
            unavailableDates: [],
            linkedTo: ""
        };
        
        this.setState({member});
    }

    handleSave=()=>{
        console.log("TODO save member: ");
        console.log(this.state.member);
    }
    handleDelete=()=>{ 
        console.log("TODO delete member id: " + this.state.member.id);
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
        return (
            <Modal open={this.props.open}>
                <ModalBody>
                    <ModalHeader
                    className="bg-member text-light"
                    text={member.name || "NEW"}
                    >
                        {icons.member}
                    </ModalHeader>
                    
                    <ModalContent>
                        <EditItemName
                        placeholder={"Member name"}
                        value={member.name}
                        onChange={this.handleNameChange.bind(this)}
                        />

                        <GroupsSelectableSublist 
                        selectedIds={member.groups}
                        handleNewList={this.handleGroupsList.bind(this)}
                        />
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
    // Clears selected item
    handleClearEdit: PropTypes.func.isRequired,
}

export default MemberItemEditModal;