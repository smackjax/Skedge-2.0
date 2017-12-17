import React from 'react';
import PropTypes from 'prop-types';
import {
    SimpleArrayControls 
} from '../../../_HOCIndex';
import Modal from '../../../../_modal/modal.component';

import {
    ModalBody,
    ModalHeader,
    ModalContent,
    ModalFooterBtns,
    ModalHeaderBadge as Badge
} from '../../_generic-modal-components';

import {
    BulkModalHeader
} from '../../_generic-bulk-modal-components/';
import * as icons from '../../../_icons';

import { 
    TasksSelectableSublist as SelectableList
} from '../../../selectable-sublists';

const primaryBgColor = "bg-group";
const primaryTextColor = "text-group";
const primaryIcon = icons.group;
const bulkTextColor = "text-task"
const bulkIcon = icons.task;

const GroupsBulkModal = (props)=>{
    const handleConfirm=()=>{
        props.handleConfirm(props.currentArray)
    }
    return (
        <Modal>
            <ModalBody>
                <BulkModalHeader 
                    bgClassName={primaryBgColor}
                    actionIcon={icons.plus}
                    primaryCount={props.numOfItems}
                    primaryTextClass={primaryTextColor}
                    primaryIcon={primaryIcon}
                    bulkCount={props.currentArray.length}
                    bulkTextClass={bulkTextColor}
                    bulkIcon={bulkIcon}
                />

                <ModalContent>
                    <SelectableList 
                    handleNewList={props.handleNewArray}
                    />                        
                </ModalContent>

                <ModalFooterBtns
                bgClassName={primaryBgColor}
                handleConfirm={handleConfirm}
                handleCancel={props.handleCancel}
                />
            </ModalBody>
        </Modal>
    )
}

GroupsBulkModal.propTypes = {
    actionIcon: PropTypes.instanceOf(React.Component).isRequired,
    numOfItems: PropTypes.number.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,

    // From SimpleArrayControls. Keeps track of bulk ids selected.
    handleNewArray: PropTypes.func.isRequired,
    currentArray: PropTypes.array.isRequired
}

export default SimpleArrayControls(GroupsBulkModal);
