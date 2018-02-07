import React from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import MemberDash from './dash-member/dash-member.component';
import CreatorDash from './dash-creator/creator-dash.component';


const MainDash = ({userType})=>{
    if(userType === "member"){
        return (
            <MemberDash />
        )
    }

    if(userType === "creator"){
        return (
            <CreatorDash />        
        )
    }
}

MainDash.propTypes = {
    userType: PropTypes.string.isRequired
}

export default connect(store=>({
    userType: store.meta.userType
}))(MainDash);