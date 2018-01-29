import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './select-data-list-card.style.css';

const SelectDataListCard = (props)=>{
    return (
        <Link
        to={props.path}
        className={"select-data-list-card action-btn " + props.className }>
            {props.children}
        </Link>
    )
}
SelectDataListCard.propTypes ={ 
    path: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
}

export default SelectDataListCard;