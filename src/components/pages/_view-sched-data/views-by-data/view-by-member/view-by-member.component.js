import React from 'react';
import PropTypes from 'prop-types';

import {
    ExpandableViewListItem as ExpandableItem,
    ViewListItem as ListItem
} from '../../_view-list-generics';
import { icons } from '../../generic-components';
import { formatSchedByMember } from '../restructure-functions';
import { hydrateDate } from '../../functions';


class MembersSchedView extends React.Component{ 
    state={
        loading: true,
        formattedData: null,
    }

    componentDidMount(){
        setTimeout(
            ()=>{
                formatSchedByMember(this.props.schedule)
                .then(formattedData=>{
                    this.setState({
                        formattedData
                    })
                })
                .catch(err=>{
                    console.log("Problem formatting schedule by member", err);

                })
                .then(always=>{
                    this.setState({
                        loading: false
                    })
                })
            }
        ,1)
    }

    render(){
        const { loading, formattedData } = this.state;

        // Loading spinner
        if(loading){
            return (
                 <div
                 style={{
                     display: "flex",
                     flexDirection: "column",
                     textAlign: "center",
                 }}
                 >
                    <span className="text-sched">Formatting...</span>
                    <span className="text-sched">{ icons.gearSpinner }</span>
                 </div>
            )    
        }

        if(!formattedData){
           return ( 
                <div
                style={{
                    textAlign: "center",
                }}
                className="text-danger"
                >
                    No data to show. <br /> 
                    Might be an error. <br /> 
                    Might not be.<br /> <br /> 
                    The world is just a crazy place sometimes.<br /> <br /> <br /> 
                    If it keeps happening, send me an email: <br /> 
                    <a href="mailto:smackjax@gmail.com">smackjax@gmail.com</a>

                </div>
            )
        }

        return (
            <div> 
                {// member items
                formattedData.sched.map(
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
}

MembersSchedView.propTypes = {
    schedule: PropTypes.object
}
export default MembersSchedView;