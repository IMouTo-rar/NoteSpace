import React from 'react';

import { VscHome } from 'react-icons/vsc';
import { VscFiles } from 'react-icons/vsc';
import { VscSearch } from 'react-icons/vsc';
import { VscInfo } from 'react-icons/vsc';
import { VscAccount } from 'react-icons/vsc';
import { VscGear } from 'react-icons/vsc';
import { VscCircleSlash } from 'react-icons/vsc';

import './SidebarButton.css';

function SidebarButton({label, icon}) {

    return (
        <div className='sidebar-button'>
            <div>
                {ButtonRender(label, icon)}
            </div>
        </div>
    )
}

function ButtonRender(label, icon) {
    switch (label) {
        case 'Home':
            return <VscHome className='icon' style={{width: '1.8rem', height: '1.8rem'}}/>;
        case 'Files':
            return <VscFiles className={`icon selected`} />;
        case 'Search':
            return <VscSearch className='icon' />;
        case 'Info':
            return <VscInfo className='icon' />;
        case 'Account':
            return <VscAccount className='icon' />;
        case 'Settings':
            return <VscGear className='icon' />;
        default:
            return <VscCircleSlash className='icon' style={{color: 'red'}}/>;
    }
}

export default SidebarButton;
