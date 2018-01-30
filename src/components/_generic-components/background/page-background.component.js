import React from 'react';
import PropTypes from 'prop-types';

const PageBackground = (props)=>{
    const bgColor = props.color || "";
    
    return (
        <div
        style={{
            display: "block",
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: bgColor,
            zIndex: "-10"
        }}
        />
    )
}

PageBackground.propTypes = {
    color: PropTypes.string.isRequired
}

export default PageBackground;