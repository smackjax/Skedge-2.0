import React from 'react';
import { NavLink } from 'react-router-dom';
import * as icons from '../icons/';
import './navbar.style.css';


export default (props)=>{
    return (
        <nav className="main-navbar">
            <div className="nav-btns-wrapper">
                <NavLink
                className="main-nav-btn"
                activeClassName="active"
                to="/select-data"
                >
                    {icons.data}
                </NavLink>

                <NavLink
                className="main-nav-btn"
                activeClassName="active"
                to="/schedule-dash"
                >
                    {icons.sched}
                </NavLink>

                <NavLink
                className="main-nav-btn"
                activeClassName="active"
                to="/schedules"
                >
                    {icons.oldSched}
                </NavLink>
            </div>
        </nav>
    )
}