import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreatorNavbar from './creator-navbar/creator-navbar.component';
import MemberNavbar from './member-navbar/member-navbar.component';
import './navbar.style.css';

// Acts as navbar switch for current user type
const NavBar = (props)=>{
    if(props.userType === "member"){
        return ( <MemberNavbar /> )
    }

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