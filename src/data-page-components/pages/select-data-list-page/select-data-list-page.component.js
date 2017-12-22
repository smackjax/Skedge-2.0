import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import NavBar from '../../../navbar/navbar.component';
import * as icons from '../../_icons';
import GenerateSchedBtn from './generate-sched-btn/generate-sched-btn.component';
import {NewSchedModal} from '../../_modals';
import CardBlock from './select-data-list-card-block/select-data-list-card-block.component';
import SelectDataListCard from './select-data-list-card/select-data-list-card.component';
import './select-data-list-page.style.css';

class SelectDataListPage extends React.Component{
    
    state={
        generateModalOpen: false
    }

    handleGenerate=(startDate, endDate)=>{
        console.log("Dates:  ", startDate, endDate);
        this.props.dispatch({type: "TODO"});
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
    dispatch: PropTypes.func.isRequired
}

export default connect()(SelectDataListPage);