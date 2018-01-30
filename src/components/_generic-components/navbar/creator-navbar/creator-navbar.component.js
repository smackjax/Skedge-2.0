import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import * as icons from '../../icons';
import './creator-navbar.style.css';

const CreatorNavbar  = (props)=>{
    
    
    return (
        <nav
        className="creator-navbar"
        >
            { props.connected ? 
            <Link
            className="manage-schedules"
            to="/manage-schedules"
            >
                <div className="schedule-name">
                    {props.schedName}
                </div>
                <div
                className="text-sched change-sched-link"
                >
                    {icons.refresh} Change
                </div>
            </Link>
            :
            <div
            className="manage-schedules"
            >
                <div className="schedule-name">
                    {props.schedName}
                </div>
                <div
                className="text-danger change-sched-link"
                >   
                    {icons.times} Offline
                </div>
            </div>
            }

            <NavLink
            className="action-btn btn bg-creator text-light"
            to="/schedule-data"
            >
                { icons.data }
            </NavLink>

            <NavLink 
            className="action-btn btn bg-creator text-light"
            to="/dashboard"
            >
                { icons.sched }
            </NavLink>
            <NavLink 
            className="action-btn btn bg-creator text-light"
            to="/settings"
            >
                { icons.settings }
            </NavLink>
        </nav>
    )
}

CreatorNavbar.propTypes = {
    schedName: PropTypes.string.isRequired,
    connected: PropTypes.bool.isRequired
};

export default CreatorNavbar;