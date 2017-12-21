import React from 'react';
import ListItem from '../../view-list-item/view-list-item.component';
import ExpandableItem from '../../expandable-view-list-item/expandable-view-list-item.component';
import * as icons from '../../../../../_icons/icons';

import {v2, dataToArrays} from '../restructure-functions';
import { getOneSched } from '../../../../../brains/sched-api';
import { hydrateDate } from '../../../sched-view-components/_functions';

const MembersSchedView = (props)=>{

/*
returns {
    id: schedId,
    startDate,
    endDate,
    sched: {
        membId:{
            workDates: {
                taskId :{
                    assigned: {}
                }
            }
        }
    }
}   
*/  
    
    const schedData = getOneSched();
    const schedFormatted = v2(schedData);
    console.log("formatted: ", schedFormatted);
    const arrayData = dataToArrays(schedFormatted.sched);
    console.log(arrayData);
    return (
        <div>
            {// member items
            
            arrayData.map(
                member=>(
                    <ExpandableItem
                    className="members-view-list border-member"
                    headerClassName="bg-member text-light"
                    itemText={member.name}
                    itemIcon={icons.member}
                    >
                        {// Day items
                            member.dates.map(
                                day=>{
                                const dayText = hydrateDate(day.id).format("ddd, MMM DD");
                                return <ListItem
                                    className="border-day"
                                    headerClassName="text-day"
                                    itemText={dayText}
                                    itemIcon={icons.day}
                                    >
                                        { // Task items
                                            day.tasks.map(
                                                task=>(
                                                    <ListItem
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

export default MembersSchedView;