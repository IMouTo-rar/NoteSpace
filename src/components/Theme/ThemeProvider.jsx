import React from 'react'
import { useRecoilValue } from 'recoil';
import { themeClass } from '../Primary/Atom';

// 引入主题颜色样式
import './Themes.css';

function ThemeProvider({children}) {

    const themeClassName = useRecoilValue(themeClass);

    return (
        <div className={themeClassName}>
            {children}
        </div>
    )
};

export default ThemeProvider;