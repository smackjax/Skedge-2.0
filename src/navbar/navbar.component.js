import React from 'react';
import { NavLink } from 'react-router-dom';
import * as icons from '../_icons/icons';
import './navbar.style.css';

export default (props)=>{
    return (
        <nav className="main-navbar">
            <div className="nav-btns-wrapper">
                <NavLink
                className="main-nav-btn"
                to="/select-data"
                >
                    {icons.data}
                </NavLink>
                <NavLink
                className="main-nav-btn"
                to="/schedule"
                >
                    {icons.sched}
                </NavLink>
                <NavLink
                className="main-nav-btn"
                to="settings"
                >
                    {icons.settings}
                </NavLink>
            </div>
        </nav>
    )
}