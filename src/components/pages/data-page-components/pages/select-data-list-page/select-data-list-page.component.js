import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from '../../../../_generic-components/navbar/navbar.component';
import * as icons from '../../_icons';
import GenerateSchedBtn from './generate-sched-btn/generate-sched-btn.component';
import {NewSchedModal} from '../../_modals';
import CardBlock from './select-data-list-card-block/select-data-list-card-block.component';
import SelectDataListCard from './select-data-list-card/select-data-list-card.component';
import './select-data-list-page.style.css';

import {SCHED_ACTIONS} from '../../../../_redux-generics/actions';

import { genNewSched } from '../../../../../brains/sched-api';



class SelectDataListPage extends React.Component{
    
    state={
        generateModalOpen: false
    }

    handleGenerate= async (startDate, endDate)=>{
        this.props.handleBottomSpinner(true);
        try{
            const schedData = await genNewSched(startDate, endDate);
            console.log("Sched gen success: ", schedData)
            this.props.handleBottomSpinner(false);
            this.props.dispatch(
                SCHED_ACTIONS.schedGenSuccess(schedData)
            );
            this.props.history.push('/schedule-dash');
        } catch (err){
            console.log("Error generating schedule", err);
            this.props.handleBottomSpinner(false);
        }
    }

    handleModalToggle=()=>{
        this.setState({
            generateModalOpen: !this.state.generateModalOpen
        });
    }

    render(){
        return (
            <div>
                <NavBar />
                

            <GenerateSchedBtn 
            onClick={this.handleModalToggle}/>

            <div className="select-data-cards-wrapper">
                <CardBlock>
                    <SelectDataListCard 
                    path="/members"
                    className="bg-member"
                    >
                        {icons.member}
                        <span>MEMBERS</span>
                    </SelectDataListCard>

                    <SelectDataListCard 
                    path="/groups"
                    className="bg-group"
                    >
                        {icons.group}
                        <span>GROUPS</span>
                    </SelectDataListCard>
                </CardBlock>

                <CardBlock>
                    <SelectDataListCard 
                    path="/tasks"
                    className="bg-task"
                    >
                        {icons.task}
                        <span>TASKS</span>
                    </SelectDataListCard>

                    <SelectDataListCard 
                    path="/days"
                    className="bg-day"
                    >
                        {icons.day}
                        <span>DAYS</span>
                    </SelectDataListCard>
                </CardBlock>

                </div>

                <NewSchedModal
                open={this.state.generateModalOpen}
                handleGenerate={this.handleGenerate}
                handleCancel={this.handleModalToggle}
                />
            </div>
        )
    }
}

SelectDataListPage.propTypes={
    dispatch: PropTypes.func.isRequired,
    handleBottomSpinner: PropTypes.func.isRequired
}

export default connect()(SelectDataListPage);