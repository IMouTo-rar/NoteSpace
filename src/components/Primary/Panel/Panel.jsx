import React from 'react';
import './Panel.css';
import { ThemeSwitcher } from '../../Atom';

function Panel() {
    return (
        <div className='panel-block'>

            Panel
            <br />
            <ThemeSwitcher />
        </div>
    )
};

export default Panel;
