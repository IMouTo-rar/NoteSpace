import React, { useEffect, useState } from 'react';
import { selectedButton } from './SidebarAtom';
import { selectedTheme } from './ThemeAtom';
import { useRecoilState } from 'recoil';
import { invoke } from '@tauri-apps/api';

export const SaveRecoilStateToConfig = () => {
    const [result, setResult] = useState({});
    // 获取需要本地保存的Atom
    const [theme, setTheme] = useRecoilState(selectedTheme);
    const [button, setButton] = useRecoilState(selectedButton);

    useEffect(() => {
        const save = async () => {
            console.log('Saving');
            const data = {
                'selected_button': button,
                'selected_theme': theme
            };
            await invoke("save_recoil_state_to_config", { data: data })
                .then((res) => { setResult(res); })
                .catch((err) => { console.log(err); });
        };
        // save();
    }, []);

    return (
        <div style={{ display: 'none' }}></div>
    );

};


export const LoadRecoilStateFromConfig = () => {
    const [result, setResult] = useState({});
    // Atoms
    const [theme, setTheme] = useRecoilState(selectedTheme);
    const [button, setButton] = useRecoilState(selectedButton);

    useEffect(() => {
        const load = async () => {
            console.log('Loading');
            await invoke("load_recoil_state_from_config")
                .then((res) => { setResult(res); })
                .catch((err) => { console.log(err); });
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
        <div style={{ display: 'none' }}></div>
    );
};
