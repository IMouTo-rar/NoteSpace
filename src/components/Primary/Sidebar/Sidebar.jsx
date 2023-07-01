import React from 'react';
import SidebarButton from './SidebarButton';

import './Sidebar.css';

function Sidebar() {
    // TODO: Add sidebar
    return (
        <div className='sidebar-block'>
            <div className='dynamic-area'>
                <SidebarButton label={'Home'}/>
                <SidebarButton label={'Files'}/>
                <SidebarButton label={'Search'}/>
            </div>
            <div className='static-area'>
                <SidebarButton label={'Account'}/>
                <SidebarButton label={'Settings'}/>
            </div>
        </div>
    )
}

export default Sidebar;