import React from 'react';
import { useRecoilValue } from 'recoil';
import { selectedButtonLabelSelector } from '../../Atom';
import './ActivityBar.css';

import { Account, Files, Home, Info, Search, Settings } from '../../Page/Activity';

function ActivityBar() {
    const selectedButtonLabel = useRecoilValue(selectedButtonLabelSelector);

    return (
        <div className={`activityBar-block ${selectedButtonLabel ? '' : 'retracted'}`}>

            {Activity(selectedButtonLabel)}

        </div>

    );
}

function Activity(selectedButtonLabel) {
    switch (selectedButtonLabel) {
        case 'Home':
            return <Home />;
        case 'Files':
            return <Files />;
        case 'Search':
            return <Search />;
        case 'Info':
            return <Info />;
        case 'Account':
            return <Account />;
        case 'Settings':
            return <Settings />;
        default:
            return <Home />;
    }
}

export default ActivityBar;