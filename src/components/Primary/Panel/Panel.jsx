import React, { useEffect, useState } from 'react';
import './Panel.css';

import Music from '../../../user-components/Media/Music';
import { LoadRecoilStateFromConfig, saveRecoilStateToConfig } from '../../Atom';
import { invoke } from '@tauri-apps/api';

function Panel() {

    return (
        <div className='panel-block'>
            Panel
            <br />
        </div>
    )
};

export default Panel;
