import React from 'react';
import Navbar from '../navbar/navbar.component';

import * as icons from '../_icons/icons';
export default (props)=>{
    return (
        <div>
            <Navbar />
            <div
            style={{
                textAlign: 'center', 
                display: 'flex',
                alignItems: "center",
                justifyContent: "center"
            }}
            >
            {icons.gearSpinner} Under construction
            </div>
        </div>
    )
}