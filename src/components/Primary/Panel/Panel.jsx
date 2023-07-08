import React, { useEffect, useState } from 'react';
import './Panel.css';

import Music from '../../../user-components/Media/Music';
import { invoke } from '@tauri-apps/api';
import Editor from '../../Page/Panel/Editor';
import Header from '../../Page/Panel/Header';

function Panel() {

    return (
        <div className='panel-block'>
            <Header />
            <Editor />
        </div>
    )
};

export default Panel;
