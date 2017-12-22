import React from 'react';
import NavBar from '../../../navbar/navbar.component';
import * as icons from '../../_icons';
import CardBlock from './select-data-list-card-block/select-data-list-card-block.component';
import SelectDataListCard from './select-data-list-card/select-data-list-card.component';
import './select-data-list-page.style.css';

const SelectDataListPage = ()=>{
    return (
        <div>
            <NavBar />
            
        <div className="select-data-list-page">
            
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
        </div>
    )
}

export default SelectDataListPage;