import React from 'react';
import PropTypes from 'prop-types';
import { SimpleArrayControls } from '../../../_HOCIndex';
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
    DaysSelectableSublist as SelectableList
} from '../../../selectable-sublists';

const primaryBgColor = "bg-task";
const primaryTextColor = "text-task";
const primaryIcon = icons.task;
const bulkTextColor = "text-day"
const bulkIcon = icons.day;

const TasksBulkModal = (props)=>{
    const handleConfirm=()=>{
        props.handleConfirm(props.currentArray)
        props.handleNewArray([]);
    }
    const handleCancel=()=>{
        props.handleCancel();
        props.handleNewArray([]);
    }
    return (
        <Modal open={props.open}>
            <ModalBody>
                <BulkModalHeader
                    bgClassName={primaryBgColor}
                    actionIcon={props.actionIcon}
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
                handleSave={handleConfirm}
                handleCancel={handleCancel}
                />
            </ModalBody>
        </Modal>
    )
} 

TasksBulkModal.propTypes = {
    open: PropTypes.bool.isRequired,
    actionIcon: PropTypes.object,
    numOfItems: PropTypes.number.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    // From SimpleArrayControls. Stores array of ids selected.
    handleNewArray: PropTypes.func.isRequired,
    currentArray: PropTypes.array.isRequired
}

export default SimpleArrayControls(TasksBulkModal);
