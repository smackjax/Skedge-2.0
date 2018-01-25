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
                    <i className="fa fa-refresh"/> Change
                </div>
            </Link>

            <NavLink
            className="action-btn btn bg-creator text-light"
            to="/schedule-data"
            >
                { icons.data }
            </NavLink>
            <NavLink 
            className="action-btn btn bg-creator text-light"
            to="/view-sched"
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
    schedName: PropTypes.string.isRequired
};

export default CreatorNavbar;