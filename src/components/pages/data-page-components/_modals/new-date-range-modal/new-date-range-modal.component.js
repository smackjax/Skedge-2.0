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
import './new-date-range-modal.style.css';


class NewSchedModal extends React.Component {

    state={
        startValid: false,
        endValid: false,
        endDateStr: "",
        startDateStr: "",
        errorMsg: "",
        makeActiveRange: false
    }

    handleGenerate=()=>{
        if((this.state.startValid && this.state.endValid)){
            const {startDateStr, endDateStr, makeActiveRange} = this.state;
            this.props.handleGenerate(
                startDateStr, 
                endDateStr, 
                makeActiveRange
            );
        }
    }
    
    handleStart=(result)=>{
        const {isValid, value, year} = result;
        const valid = (isValid && (year.length === 4));
        this.setState({
            startValid: valid,
            startDateStr: value
            
        }, this.checkEndDate);
    }

    handleEnd=(result)=>{
        const {isValid, value, year} = result;

        const valid = (isValid && (year.length === 4));

        this.setState({
            endValid: valid,
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

    handleMakeActive=(e)=>{
        const makeActiveRange =  e.target.checked;
        this.setState({ makeActiveRange });
    }

    render(){
        const {startValid, endValid, errorMsg} = 
            this.state;
            
        const mainMsg = 
            errorMsg ? 
                errorMsg :
            (startValid, endValid) ?
                "Ready" : 
            "Waiting for dates";

        return(
            <Modal open={this.props.open}>
                <ModalBody>
                    <ModalHeader
                    className="bg-day"
                    >
                        {icons.sched}
                        <span>New Date Range</span>
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

                        <label
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "90%",
                            maxWidth: "125px",
                            margin: "10px auto",
                            padding: "5px",
                            borderBottom: "1px solid #ddd",
                            fontWeight: this.state.makeActiveRange ? "bold" : ""
                        }}
                        >
                            <input 
                            type="checkbox"
                            checked={this.state.makeActiveRange}
                            onChange={this.handleMakeActive}
                            />
                            <span>
                                Make active
                            </span>
                        </label>

                    </ModalContent>
                    <ModalFooterBtns
                    bgClassName="bg-day"
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