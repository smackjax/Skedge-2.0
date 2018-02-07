import React from 'react';
import { NavLink } from 'react-router-dom';
import * as icons from '../../icons';

const MemberNavbar  = (props)=>{
    return (
        <nav
        className="creator-navbar"
        >
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

export default MemberNavbar;