import React from 'react';

import {hydrateDate, dehydrateDate} from '../../../_FUNCTIONS/dateFunctions';
import {expand, collapse} from '../../../_FUNCTIONS/dropdown';
import { genNewSched } from '../../../../sched-engine/sched-api';

// Components
import SelectDate from '../../../_INPUTS/select-date/select-date.component';


//Styles
import colors from '../../../_RESOURCES/colors';
import './gen-sched-controls.style.css';
const newBtnStyle = { backgroundColor: colors.sched, color: '#efefef'};

export default class GenSchedControls extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            endDate: {},
            startDate: {},
            dateLater: false
        };

        this.initProps = props;
        this.handleDate = this.handleDate.bind(this);
        this.datesValid = this.datesValid.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.closeErrDrop = this.closeErrDrop.bind(this);
        this.openErrDrop = this.openErrDrop.bind(this);
        this.closeMainDrop = this.closeMainDrop.bind(this);
        this.openMainDrop = this.openMainDrop.bind(this);
    }

    handleDate(dateVals){
        this.setState({[dateVals.name]: {
            ...dateVals}
        }, ()=>{this.initializeDates(dateVals)});
    }

    // This is the extra logic needed for dates to initialized without 
    //  expanding the dropdown too soon
    initializeDates(dateVals){
        const startDateMoment = hydrateDate(this.state.startDate.dateStr);
        const endDateMoment = hydrateDate(this.state.endDate.dateStr);

        if(startDateMoment >= endDateMoment ){
            
            this.openErrDrop();
            if(!dateVals.isOnMount){this.openMainDrop()};
            this.setState(
                {
                    errMsg: 'Please choose a later end date than start date', 
                    dateLater: false 
                }
            );
        } else {
            this.closeErrDrop();
            if(!dateVals.isOnMount){this.openMainDrop()};
            this.setState({errMsg: '',
            dateLater: true
        });
        }
    }

    datesValid(){
        return this.state.startDate.isValid &&
        this.state.endDate.isValid &&
        this.state.dateLater;
    }
    handleSubmit(){
        const startDateStr = this.state.startDate.dateStr;
        const endDateStr = this.state.endDate.dateStr;
        this.initProps.genFunc(startDateStr, endDateStr);
    }

    // functions to open and close dropdowns
    // wouldn't be such pain, but the dates are initialized 
        // and that can cause it to open before I want 
    closeErrDrop(){ document.getElementById('gen-new-error-dropdown').style.display = 'none'; }
    openErrDrop(){  document.getElementById('gen-new-error-dropdown').style.display = 'block'; }
    closeMainDrop(){ collapse(this.initProps.id); }
    openMainDrop(){ expand(this.initProps.id);  }

    render(props){
        return(
        <div id={this.initProps.id} className="gen-sched-controls dropdown-div container">
            <div className="gen-sched-controls-header row" style={{color:colors.sched}}>
                <div className=" col-9 col-sm-7"><h5>New schedule</h5></div>
                <button disabled={false} 
                onClick={this.initProps.closeDrop} 
                className="btn btn-danger cancel-btn col-3 col-sm-5">
                    <i className="fa fa-times"></i> 
                    <span className="hidden-xs-down"> &nbsp; CANCEL</span>
                </button>
            </div>
            <SelectDate 
            labelTxt='Start Date'
            name={'startDate'}
            onChange={this.handleDate}
            />

            <SelectDate 
            labelTxt='End Date'
            name={'endDate'}
            onChange={this.handleDate}
            />

            <div id='gen-new-error-dropdown'>
                <div className="gen-new-err-wrap">
                    {this.state.errMsg || 'No errors'}
                </div>
            </div>
            
            <div className="row gen-sched-controls-footer">
                
                <button id='gen-new-sched-btn' 
                disabled={!this.datesValid()} 
                onClick={this.handleSubmit}
                style={newBtnStyle} 
                className="btn offset-sm-3 col-sm-6 offset-md-4 col-md-4 gen-sched-btn">
                    <i className="fa fa-check"></i> GENERATE
                </button>
            </div>
        </div>
    )
    }
}