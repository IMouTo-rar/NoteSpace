import React from 'react';
import { VscAccount } from 'react-icons/vsc';
import './SidebarButton.css';

function SidebarButton(props) {

    return (
        <div className='sidebar-button'>
            <VscAccount className='icon'/>
        </div>
    )
}

export default SidebarButton;
