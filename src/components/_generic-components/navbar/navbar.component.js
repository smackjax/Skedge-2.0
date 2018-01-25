import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CreatorNavbar from './creator-navbar/creator-navbar.component';

import * as icons from '../icons/';
import './navbar.style.css';


const NavBar = (props)=>{
    if(props.userType === "creator"){
        return (
        <CreatorNavbar 
        schedName="Test Name"
        />
        )
    }

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

NavBar.propTypes={
    userType: PropTypes.string.isRequired
}

export default connect((store)=>({
    userType: store.meta.userType
}))(NavBar);