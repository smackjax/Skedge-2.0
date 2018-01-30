import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { icons } from '../../generic-components';



const ManageSchedulesNavbar = (props)=>{

    return (
        <nav
        style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            borderBottom: "1px solid #ddd",
            color: "#333",
            width: "100%",
            maxWidth: "400px",
            margin: "0 auto 20px",
            padding: "5px 0"
        }}
        >           

            { // If no sched is active, dash btn disappears
            props.isActiveSched && (
                <Link
                style={{
                    padding: "5px 15px",
                    fontSize: "25px",
                    color: "#333"
                }}
                to="/dashboard"
                >
                    {icons.chevLeft}
                </Link>
            )}

            <span
            style={{
                marginLeft: "15px"
            }}
            className={props.isActiveSched ? "" : "text-danger" }
            >
                {props.isActiveSched ? "Manage Schedules" : "! No active schedule"}
            </span>

            { // If no sched is active, dash btn disappears
            !props.isActiveSched && (
                <button
                style={{
                    marginLeft: "auto",
                    marginRight: "10px",
                    padding: "5px 15px",
                    fontSize: "22px",
                }}
                className=" text-danger"
                onClick={props.signOut}
                >
                    {icons.signOut}
                </button>
            )}

        </nav>
    )
}

ManageSchedulesNavbar.propTypes={
    isActiveSched: PropTypes.bool.isRequired,
    signOut: PropTypes.func.isRequired
}

export default ManageSchedulesNavbar;