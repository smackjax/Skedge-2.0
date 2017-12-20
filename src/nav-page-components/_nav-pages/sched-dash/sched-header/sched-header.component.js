import React from 'react';

import {Link} from 'react-router-dom';

import { expand, collapse} from '../../../../_FUNCTIONS/dropdown';

// Components
import GenSchedControls from '../gen-sched-controls/gen-sched-controls.component';

// Styles
import './sched-header.style.css';
const newBtnStyle = { color: '#efefef'};




export default class SchedHeader extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            newSchedControlsOpen: false
        };
        this.props = props;
        this.openControls = this.openControls.bind(this);
        this.closeControls = this.closeControls.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this); 
    }


    openControls(){
        collapse('sched-main-controls');
        expand('new-sched-dropdown');
        this.setState({newSchedControlsOpen: true});
    }
    closeControls(){
        expand('sched-main-controls');
        collapse('new-sched-dropdown');
        this.setState({newSchedControlsOpen: false});
    }

    handleDateChange(dateString, inputName, isValid){
        console.log('Date from handleDateChange: ', dateString, 
        ' - Name: ', inputName,
        ' - isValid; ', isValid);

    }

    render(){
        return (
            <div className="sched-dash-header container" >
                <div id="sched-main-controls" className="main-controls dropdown-div">
                    <Link 
                    to='/all-schedules'
                    onClick={this.closeControls} 
                    
                    className="btn main-sched-control-btn border-sched text-sched">
                        <i className="fa fa-arrow-left"></i> OLD
                    </Link>
                    <button onClick={this.openControls} style={newBtnStyle} className="btn main-sched-control-btn text-sched">
                        <i className="fa fa-plus"></i> NEW
                    </button>
                </div>
                <GenSchedControls id="new-sched-dropdown"
                genFunc={this.props.genFunc}
                closeDrop={this.closeControls}
                 />
                 
            </div>
        )
    }
}