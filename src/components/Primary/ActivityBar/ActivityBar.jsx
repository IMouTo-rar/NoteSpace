import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedButtonLabelSelector } from '../Atom';
import './ActivityBar.css';

import { Account, Files, Home, Info, Search, Settings } from '../../Page/Activity';

function ActivityBar() {
    const selectedButtonLabel = useRecoilValue(selectedButtonLabelSelector);
    // activity 用来记录最后选中的按钮，避免隐藏侧边活动栏时渲染错误
    const [activity, setActivity] = useState({});

    useEffect(() => {
        const changeActivity = () => {
            setActivity(selectedButtonLabel ? selectedButtonLabel : activity);
        }
        changeActivity();
    }, [selectedButtonLabel]);

    return (
        <div className={`activityBar-outer ${selectedButtonLabel ? '' : 'retracted'}`}>
            <div className='activityBar-block'>

                {Activity(activity)}

            </div>
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