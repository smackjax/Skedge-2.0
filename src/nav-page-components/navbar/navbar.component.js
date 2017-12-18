import React from 'react';
import { NavLink } from 'react-router-dom';
import * as icons from '../_icons';

export default (props)=>{
    return (
        <nav>
            <div>
                <NavLink>
                    {icons.data}
                </NavLink>
                <NavLink>
                    {icons.sched}
                </NavLink>
                <NavLink>
                    {icons.settings}
                </NavLink>
            </div>
        </nav>
    )
}