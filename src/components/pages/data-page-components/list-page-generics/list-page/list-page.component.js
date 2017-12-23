import React from 'react';
import './list-page.style.css';

const ListPage = (props)=>{    
    return (
        <div className={"list-page " + (props.className || "")}>
            {props.children}
        </div>
    )
}

export default ListPage;