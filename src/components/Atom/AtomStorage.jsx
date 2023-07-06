import React from 'react';
import { selectedButton } from './SidebarAtom';
import { selectedTheme } from './Theme';
import { useRecoilValue } from 'recoil';
import { invoke } from '@tauri-apps/api';

export const saveRecoilStateToConfig = () => {
    /*
    // 获取需要本地保存的Atom
    const selectedButtonAtom = useRecoilValue(selectedButton);
    const selectedThemeAtom = useRecoilValue(selectedTheme);

    const data = {
        'selected_button': selectedButtonAtom,
        'selected_theme': selectedThemeAtom
    };
    const jsonConfig = data.stringify(data);

    try{
        invoke('save_recoil_state_to_config', jsonConfig);
    }catch(error) {
        console.log(error);
    }
    */
};


export const loadRecoilStateFromConfig = () => {
    /*
    try{
        const response = invoke('load_recoil_state_from_config');
        console.log(response);
        return response;
    }catch(error) {
        console.log(error);
        throw error;
    }
    */
};
