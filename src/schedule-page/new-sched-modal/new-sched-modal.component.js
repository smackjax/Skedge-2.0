import React from 'react';
import PropTypes from 'prop-types';
import {genDatesArray} from '../functions';

import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalFooterBtns
} from '../../_modal';
import FromToDateInput from '../../_inputs/from-to-date-block/from-to-date-block.component';

import * as icons from '../icons';
import './new-sched-modal.style.css';

import {genNewSched} from '../../brains/sched-api';

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
            const { startDateStr, endDateStr } = this.state;
            const finalSched = genNewSched(startDateStr, endDateStr);
            console.log("Final array: ", finalSched);
            
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