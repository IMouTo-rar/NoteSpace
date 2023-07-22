import React from 'react';
import { atom, selector } from 'recoil';

export const selectedButton = atom({
    key: 'selectedButton',
    default: null,
});

export const selectedButtonLabelSelector = selector({
    key: 'selectedButtonLabel',
    get: ({ get }) => {
        const selectedButtonLabel = get(selectedButton);
        return selectedButtonLabel ? selectedButtonLabel : null;
    }
});

export function ButtonSetter(newButton){
    const [button, setButton] = useRecoilState(selectedButton);
    const setNewButton = () => {
        setButton(newButton);
    };
    setNewButton();
}