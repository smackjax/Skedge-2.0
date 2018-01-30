import React from 'react';
import { withRouter } from 'react-router-dom';
import { signOut } from '../api';
import { Navbar, icons } from '../generic-components';


const SettingsPage = (props)=>{
    const signOutAndDash=()=>{
        signOut();
        props.history.push('/dashboard');
    }
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

            <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "200px",
                margin: "30px auto",
                padding: "15px",
                backgroundColor: "#fff"
            }}
            className="action-btn"
            > 
                <span
                style={{
                    fontSize: "25px",
                    marginBottom: "10px"
                }}
                >{icons.cog}</span>
                <span>Under development</span>
            </div>
        </div>
    )
}

export default withRouter(SettingsPage);