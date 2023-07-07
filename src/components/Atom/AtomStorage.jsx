import React, { useEffect, useState } from 'react';
import { selectedButton } from './SidebarAtom';
import { selectedTheme } from './ThemeAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { invoke } from '@tauri-apps/api';

export const saveRecoilStateToConfig = async () => {
    // 获取需要本地保存的Atom
    const selectedButtonAtom = useRecoilValue(selectedButton);
    const selectedThemeAtom = useRecoilValue(selectedTheme);

    const data = {
        'selected_button': selectedButtonAtom,
        'selected_theme': selectedThemeAtom
    };
    const jsonConfig = data.stringify(data);

    try {
        await invoke('save_recoil_state_to_config', jsonConfig);
    } catch (error) {
        console.log(error);
    }
};


export const LoadRecoilStateFromConfig = () => {
    const [result, setResult] = useState({});
    // Atoms
    const [theme, setTheme] = useRecoilState(selectedTheme);
    const [button, setButton] = useRecoilState(selectedButton);

    useEffect(() => {
        const load = async () => {
            try {
                setResult(JSON.parse(await invoke('load_recoil_state_from_config')));
                // 从本地加载Atom
            } catch (error) {
                console.log(error);
                return error;
            }
        };
        load();
    }, []);

    useEffect(() => {
        // 当 result 更新后执行其他操作
        if (result && Object.keys(result).length !== 0) {
            // 执行其他操作，例如更新 Atom
            setTheme(result.selected_theme);
            setButton(result.selected_button);
        }
    }, [result]);

    return (
        <div style={{display: 'none'}}>
        </div>
    );
};
