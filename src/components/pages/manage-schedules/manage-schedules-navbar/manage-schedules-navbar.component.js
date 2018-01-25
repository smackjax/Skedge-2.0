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

            <span
            style={{
                marginLeft: "15px"
            }}
            >
                Manage Schedules
            </span>
        </nav>
    )
}

export default ManageSchedulesNavbar;