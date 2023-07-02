import React from 'react';
import { atom, selector, useRecoilState } from 'recoil';

const themeState = atom({
    key: 'themeState',
    default: 'light',
})

const themeClass = selector({
    key: 'themeClass',
    get: ({ get }) => {
        const theme = get(themeState);
        switch (theme) {
            case 'light':
                return 'light-theme';
            case 'dark':
                return 'dark-theme';
            // 其他主题
            default:
                return 'light-theme';
        }
    }
})

function ThemeSwitcher() {
    const [theme, setTheme] = useRecoilState(themeState);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    return (
        <button onClick={toggleTheme}>
            {theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
        </button>
    );
}

export { themeState, themeClass, ThemeSwitcher };