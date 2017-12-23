import React from 'react';
import Navbar from '../../_generic-components/navbar/navbar.component';

import * as icons from '../../_generic-components/icons';
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