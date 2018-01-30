import React from 'react';
import PropTypes from 'prop-types';

import {
    ExpandableViewListItem as ExpandableItem,
    ViewListItem as ListItem
} from '../../_view-list-generics';
import { icons } from '../../generic-components';
import { formatSchedByMember } from '../restructure-functions';
import { hydrateDate } from '../../functions';


const MembersSchedView = (props)=>{ 
    const arrayData = 
        formatSchedByMember(props.schedule);
    return (
        <div> 
            {// member items
            arrayData.sched.map(
                (member, mIndex)=>(
                    <ExpandableItem
                    key={"m"+mIndex}
                    className="members-view-list border-member"
                    headerClassName="bg-member text-light"
                    itemText={member.name}
                    itemIcon={icons.member}
                    >
                        {// Day items
                        member.dates.map(
                            (day, dIndex)=>{
                            const dayText = hydrateDate(day.id).format("ddd, MMM DD");
                            return <ListItem
                                key={"d"+dIndex}
                                className="border-day"
                                headerClassName="text-day"
                                itemText={dayText}
                                itemIcon={icons.day}
                                >
                                    { // Task items
                                    day.tasks.map(
                                        (task, tIndex)=>(
                                            <ListItem
                                            key={"t"+tIndex}
                                            itemText={task.name}
                                            itemIcon={icons.task}
                                            headerClassName="text-task"
                                            />
                                        )
                                    )
                                    }
                                </ListItem>
                            }
                        )
                        }
                    </ExpandableItem>
                )
            )}
        </div>
    )
}
MembersSchedView.propTypes = {
    schedule: PropTypes.object
}
export default MembersSchedView;