import React from 'react';
import PropTypes from 'prop-types';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalFooterBtns
} from '../_generic-modal-components';
import { FromToDateInput } from '../../inputs';

import * as icons from '../../_icons';
import './new-sched-modal.style.css';


class NewSchedModal extends React.Component {

    state={
        invalid: true,
        endDateStr: "",
        startDateStr: "",
        dateChangeOutput: "",
        startFromToday: true
    }

    handleDateChange=(newVals)=>{
        this.setState({
            ...newVals
        });
    }
    handleGenerate=()=>{
        if(!this.state.invalid){
            const {startDateStr, endDateStr} = this.state;
            this.props.handleGenerate(startDateStr, endDateStr);
        }
    }


    render(){
        return(
            <Modal open={this.props.open}>
                <ModalBody>
                    <ModalHeader
                    className="bg-sched"
                    >
                        {icons.sched}
                        <span>New Schedule</span>
                    </ModalHeader>

                    <ModalContent>     
                        <FromToDateInput
                        onChange={this.handleDateChange}
                        />
                    </ModalContent>

                    <ModalFooterBtns
                    bgClassName="bg-sched"
                    saveText="Generate"
                    handleCancel={this.props.handleCancel}
                    handleSave={this.handleGenerate}
                    />

                </ModalBody>
            </Modal>
        )
    }
}

NewSchedModal.propTypes={
    open: PropTypes.bool.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleGenerate: PropTypes.func.isRequired
}

export default NewSchedModal;