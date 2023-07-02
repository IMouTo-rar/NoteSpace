import React from 'react';
import './SidebarButton.css';

import Icon from '../Icon/Icon';
import { selectedButtonAtom, selectedButtonLabelSelector } from '../../Atom/SidebarAtom'; 
import { useRecoilState, useRecoilValue } from 'recoil';

function SidebarButton({ label, icon }) {
    const selectedButtonLabel = useRecoilValue(selectedButtonLabelSelector);
    const [selectedButton, setSelectedButton] = useRecoilState(selectedButtonAtom);

    const handleClick = () => {
        setSelectedButton(selectedButtonLabel == label ? null : label);
    }

    return (
        <div className='sidebar-button'>
            <div
                className={`button-box ${selectedButtonLabel == label ? 'selected' : ''}`}
                label={label}
                onClick={handleClick}
            >
                <Icon label={label} icon={icon} />
            </div>
        </div>
    )

};

export default SidebarButton;

/*
import React from 'react';
import './SidebarButton.css';

import { VscHome } from 'react-icons/vsc';
import { VscFiles } from 'react-icons/vsc';
import { VscSearch } from 'react-icons/vsc';
import { VscInfo } from 'react-icons/vsc';
import { VscAccount } from 'react-icons/vsc';
import { VscGear } from 'react-icons/vsc';
import { VscCircleSlash } from 'react-icons/vsc';

import { atomFamily, useRecoilState } from 'recoil';

const sidebarButtonState = atomFamily({
    key: 'sidebarButtonState',
    default: false,
})

function SidebarButton({label, icon}) {
    const [selected, setSelected] = useRecoilState(sidebarButtonState(label));
    const handleClick = () => {
        setSelected(!selected);
    }

    return (
        <div className='sidebar-button'>
            <div className={`button-box ${selected ? 'selected' : ''}`} onClick={handleClick}>
                {ButtonIcon(label, icon)}
            </div>
        </div>
    )
}

function ButtonIcon(label, icon) {
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
*/