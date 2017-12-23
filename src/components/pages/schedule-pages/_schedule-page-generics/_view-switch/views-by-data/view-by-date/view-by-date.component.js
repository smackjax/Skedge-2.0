import React from 'react';
import PropTypes from 'prop-types';
import {
    ExpandableViewListItem as ExpandableItem,
    ViewListItem as ListItem
} from '../../_view-list-generics';
import * as icons from '../../../icons';
import { formatSchedByDate } from '../restructure-functions';
import { hydrateDate } from '../../../functions';

import { getOneSched } from '../../../../brains/sched-api';

const ViewSchedByDate = (props)=>{
    const arrayData = 
        formatSchedByDate(props.schedule);

    return (
        <div>
            {// Day items
            arrayData.sched.map(
                (date, dIndex)=>{
                    const currentDate = hydrateDate(date.id).format("ddd, MMM DD");
                    return <ExpandableItem
                    key={"d"+dIndex}
                    className="dates-view-list border-day"
                    headerClassName="bg-day text-light"
                    itemText={currentDate}
                    itemIcon={icons.day}
                    >
                        {// Task items
                            date.tasks.map(
                                (task, tIndex)=>{
                                    return <ListItem
                                    key={'t'+tIndex}
                                    className="border-task"
                                    headerClassName="text-task"
                                    itemText={task.name}
                                    itemIcon={icons.task}
                                    >
                                        { // Members items
                                            task.assigned.map(     
                                                (member, mIndex)=>{
                                                    return <ListItem
                                                    key={'m'+mIndex}
                                                    itemText={member.name}
                                                    itemIcon={icons.member}
                                                    headerClassName="text-member"
                                                    />
                                                }
                                            )
                                        }
                                    </ListItem>
                                }
                            )
                        }
                    </ExpandableItem>
                }
            )}
        </div>
    )
}
ViewSchedByDate.propTypes= {
    schedule: PropTypes.object.isRequired
}
export default ViewSchedByDate;