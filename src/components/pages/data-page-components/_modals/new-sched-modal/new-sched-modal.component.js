import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalFooterBtns
} from '../_generic-modal-components';
import { FromToDatesWithLabel  } from '../../inputs';

import * as icons from '../../_icons';
import './new-sched-modal.style.css';


class NewSchedModal extends React.Component {

    state={
        startValid: false,
        endValid: false,
        endDateStr: "",
        startDateStr: "",
        errorMsg: ""
    }

    handleGenerate=()=>{


        if((this.state.startValid && this.state.endValid)){
            const {startDateStr, endDateStr} = this.state;
            this.props.handleGenerate(startDateStr, endDateStr);
        }
    }
    
    handleStart=(result)=>{
        const {invalid, value} = result;

        this.setState({
            startValid: !invalid,
            startDateStr: value
            
        }, this.checkEndDate);
    }

    logState=()=>{
        console.log(this.state);
    }

    handleEnd=(result)=>{
        const {invalid, value} = result;

        this.setState({
            endValid: !invalid,
            endDateStr: value
            
        }, this.checkEndDate);
    }

    checkEndDate=()=>{
        const {startDateStr, endDateStr, startValid, endValid} = this.state;
        const startDate = moment(startDateStr, "YYYY-MM-DD");
        const endDate = moment(endDateStr, "YYYY-MM-DD");

        const bothValid = (startValid && endValid);
        const toEarly = ( startDate > endDate );

        const msg =  !bothValid ?
            "" : 
            !toEarly ? "" :
                "Choose later end date";

        this.setState({
            errorMsg: msg
        })
    }

    render(){
        const {startValid, endValid, errorMsg} = 
            this.state;
        const mainMsg = 
            errorMsg ? errorMsg :
            (startValid, endValid) ?
            "Ready" : "Waiting for dates";

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
                        <div
                        className={errorMsg ? "text-danger" : ""}
                        style={{textAlign: "center", margin: "20px 5px 10px"}}
                        >
                        {mainMsg }
                        </div>
                        
                        <hr />

                        <FromToDatesWithLabel
                        handleStartChange={this.handleStart}
                        handleEndChange={this.handleEnd}
                        />

                    </ModalContent>

                    <ModalFooterBtns
                    bgClassName="bg-sched"
                    saveText="Generate"
                    disabled={!(startValid && endValid && !errorMsg)}
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