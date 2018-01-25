import React from 'react';
import PropTypes from 'prop-types';
import {connect } from 'react-redux';
import CreatorDash from './dash-creator/creator-dash.component';


const MainDash = ({userType})=>{

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