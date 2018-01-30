import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import CreatorNavbar from './creator-navbar/creator-navbar.component';

import * as icons from '../icons/';
import './navbar.style.css';


const NavBar = (props)=>{
    return (
    <CreatorNavbar 
    schedName={props.activeSchedName}
    connected={props.connected}
    />
    )
}

NavBar.propTypes={
    userType: PropTypes.string.isRequired,
    connected: PropTypes.bool.isRequired,
    activeSchedName: PropTypes.string.isRequired
}

export default connect((store)=>({
    userType: store.meta.userType,
    connected: store.meta.connectedToInternet,
    activeSchedName: store.meta.activeSchedName
}))(NavBar);