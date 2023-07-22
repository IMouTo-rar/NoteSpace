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
            console.log('Saving before close...');
            const data = {
                'selected_button': button,
                'selected_theme': theme
            };
            try {
                setResult(await invoke("save_recoil_state_to_config", { data: data }));
                console.log(data);
            } catch (error) {
                console.log(error);
                return error;
            }
            await invoke('appClose');
        };

        window.addEventListener('beforeunload', save);
        return () => {
            window.removeEventListener('beforeunload', save);
        };
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
            try {
                // 从本地加载Atom
                setResult(await invoke("load_recoil_state_from_config"));
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
        <div style={{ display: 'none' }}></div>
    );
};
