import React from 'react';
import PropTypes from 'prop-types';
import {
    ExpandableViewListItem as ExpandableItem,
    ViewListItem as ListItem
} from '../../_view-list-generics';
import { icons } from '../../generic-components';
import { formatSchedByDate } from '../restructure-functions';
import { hydrateDate } from '../../functions';


 
class ViewSchedByDate extends React.Component{
    state={
        loading: true,
        formattedData: {}
    }

    componentDidMount(){
        // Make schedule formattting async
        setTimeout(
            ()=>{
                formatSchedByDate(this.props.schedule)
                .then(formattedData=>{      
                    this.setState({ 
                        formattedData
                    })
                })
                .catch(err=>{
                    console.log("Error formatting schedule by date ", err);
                })
                .then(always=>{
                    // Stop spinner
                    this.setState({
                        loading: false
                    })
                })
            }
        , 1)
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
                {// Day items
                    formattedData.sched.map(
                        (date, dIndex)=>{
                            
                            const currentDate = hydrateDate(date.id).format("ddd, MMM DD");
                            return date.tasks.length ?(
                            // If there are tasks built on date
                            <ExpandableItem
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
                            </ExpandableItem> ) : (
                                // If no tasks on date
                                ""
                            )

                        }
                    )
                }
            </div>
        )
    }
}

ViewSchedByDate.propTypes= {
    schedule: PropTypes.object.isRequired
}
export default ViewSchedByDate;