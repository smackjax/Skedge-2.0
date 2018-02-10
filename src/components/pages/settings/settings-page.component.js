import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOut, changeUserType } from '../api';
import { Navbar, icons } from '../generic-components';


const SettingsPage = (props)=>{
    const isMember = (props.userType === "member");

    const signOutAndDash=()=>{
        props.signOut();
        props.history.push('/dashboard');
    }

    const changeAccountType=()=>{
        const changeToType = isMember ? "creator" : "member";
        props.changeUserType(changeToType)
        props.history.push('/dashboard');
    }

    const switchAccountBtnClasses =
        "action-btn text-light " + 
            (isMember ? "bg-creator" : "bg-member");

    return (
        <div>
            
            <Navbar />

            <button
            onClick={signOutAndDash}
            style={{
                display: "block",
                maxWidth: "150px",
                margin: "20px auto",
                padding: '15px'
            }}
            className="action-btn bg-member text-light"
            >
                {icons.signOut} SIGN OUT
            </button>

            <button
            onClick={changeAccountType}
            style={{
                display: "block",
                maxWidth: "250px",
                margin: "20px auto",
                padding: '15px'
            }}
            className={ switchAccountBtnClasses }
            >
                Switch account type
            </button>

            <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "250px",
                textAlign: "center",
                margin: "30px auto",
                padding: "10px",
                backgroundColor: "#fff"
            }}
            className="action-btn"
            > 
                <span
                style={{
                    fontSize: "25px",
                    marginBottom: "10px",

                }}
                >{icons.cog}</span>
                <span>Under development</span>
            </div>
        </div>
    )
}

SettingsPage.propTypes= { 
    history: PropTypes.object.isRequired,
    userType: PropTypes.string.isRequired
}

const mapDispatch={
    changeUserType,
    signOut
}

export default connect(
    (store)=>({
        userType: store.meta.userType
    }), mapDispatch
)(
    withRouter(SettingsPage)
);