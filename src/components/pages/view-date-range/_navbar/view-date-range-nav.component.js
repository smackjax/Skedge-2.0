import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import { icons } from '../generic-components';
import { deleteDateRangeById } from '../api';
import './view-date-range-nav.style.css';

const ViewDateRangeNavbar = (props)=>{
    const goToDash=()=>{
        props.history.push("/dashboard");
    }

    const dateFormat = "MMM DD";
    const prettyStart = moment(props.startDate, "YYYY-MM-DD").format(dateFormat);
    const prettyEnd = moment(props.endDate, "YYYY-MM-DD").format(dateFormat);
    return (
        <nav
        className="date-range-view-navbar"
        >
            <Link
            style={{
                padding: "5px 15px",
                fontSize: "25px",
                color: "#333"
            }}
            to="/dashboard"
            className="to-dash-btn"
            >
                { icons.chevLeft }
            </Link>

            <div 
            className="meta-info-wrapper"
            >
                <div
                className="schedule-name-meta text-sched"
                >
                    {props.scheduleName}
                </div>

                <div
                className="dates-meta text-day"
                >
                    {prettyStart} - {prettyEnd}
                </div>
            </div>

            <button
            onClick={props.deleteDateRange}
            className="action-btn bg-danger text-light delete-date-range-btn"
            >
                {icons.trash}
            </button>


        </nav>
    )
}

ViewDateRangeNavbar.propTypes={
    scheduleName: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    deleteDateRange: PropTypes.func.isRequired
}

export default withRouter(ViewDateRangeNavbar);

