import React from 'react'
import { useRecoilValue } from 'recoil';
import { themeClass } from '../Atom';

// 引入主题颜色样式
import './CSS/dark-theme.css';
import './CSS/light-theme.css';

function ThemeProvider({children}) {

    const themeClassName = useRecoilValue(themeClass);

    return (
        <div className={themeClassName}>
            {children}
        </div>
    )
};

export default ThemeProvider;