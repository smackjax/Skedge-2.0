import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signOut, changeUserType } from '../api';
import { Navbar, icons } from '../generic-components';

const capitalize = (word)=>{
    const firstLetter = word.charAt(0).toUpperCase();
    const restOfWord = word.substr(1);
    return firstLetter + restOfWord;
};

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

    const userTypeClasses = isMember ? "text-creator" : "text-member";
    const switchAccountBtnClasses =
        "action-btn text-light " + 
            (isMember ? "bg-creator" : "bg-member");
    

    return (
        <div>
            
            <Navbar />

            <div
            style={{
                textAlign: 'center',
                marginTop: "10px"
            }}
            >
                Current User Type: 
                <span 
                style={{
                    marginLeft: '10px'
                }}
                className={userTypeClasses}
                >
                    {capitalize(props.userType)}
                </span>
            </div>
            <button
            onClick={changeAccountType}
            style={{
                display: "block",
                maxWidth: "250px",
                margin: "15px auto",
                padding: '15px'
            }}
            className={ switchAccountBtnClasses }
            >
                Switch account type
            </button>

                        <button
            onClick={signOutAndDash}
            style={{
                display: "block",
                maxWidth: "150px",
                margin: "40px auto 0px",
                padding: '15px'
            }}
            className="action-btn bg-danger text-light"
            >
                {icons.signOut} SIGN OUT
            </button>

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