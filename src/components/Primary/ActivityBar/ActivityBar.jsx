import React from 'react'

import { activityBarResizeAtom } from '../../Atom'
import './ActivityBar.css'

function ActivityBar() {

    return (
        <div className='activityBar-block'>
            <div className='resizable'>
                Resizable Bar
            </div>
        </div>
    );
}

export default ActivityBar;