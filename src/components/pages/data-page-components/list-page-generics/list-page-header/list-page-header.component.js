import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {chevLeft} from '../../_icons';

import './list-page-header.style.css';

const ListPageHeader = (props)=>{
    const goBack = ()=>{
        props.history.goBack();
    }

    return(
        <div className={"list-page-header " + props.bgColorClassName}>
            <button 
            style={{fontSize: "24px"}}
            onClick={goBack}>
                {chevLeft}
            </button>
            <span className="header-text">
                {props.children}
            </span>
        </div>
    )
}
ListPageHeader.propTypes={
    bgColorClassName: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired
}
export default withRouter(ListPageHeader);
