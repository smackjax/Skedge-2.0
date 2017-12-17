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
    DaysSelectableSublist as SelectableList
} from '../../../selectable-sublists';

const primaryBgColor = "bg-task";
const primaryTextColor = "text-task";
const primaryIcon = icons.task;
const bulkTextColor = "text-day"
const bulkIcon = icons.day;

const MembersBulkModal = (props)=>{
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

MembersBulkModal.propTypes = {
    actionIcon: PropTypes.instanceOf(React.Component).isRequired,
    numOfItems: PropTypes.number.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,

    // From SimpleArrayControls. Keeps track of bulk ids selected.
    handleNewArray: PropTypes.func.isRequired,
    currentArray: PropTypes.array.isRequired
}

export default SimpleArrayControls(MembersBulkModal);
