import React from 'react';
import { selectedButton } from './SidebarAtom';
import { selectedTheme } from './Theme';
import { useRecoilValue } from 'recoil';
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

    try{
        await invoke('save_recoil_state_to_config', jsonConfig);
    }catch(error) {
        console.log(error);
    }
};


export const loadRecoilStateFromConfig = async () => {
    try{
        const response = await invoke('load_recoil_state_from_config');
        console.log(response);
    }catch(error) {
        console.log(error);
    }
    return response;
};
