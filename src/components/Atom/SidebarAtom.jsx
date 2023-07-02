import React from 'react';
import { atom, selector } from 'recoil';

export const selectedButtonAtom = atom({
    key: 'selectedButton',
    default: null,
});

export const selectedButtonLabelSelector = selector({
    key: 'selectedButtonLabel',
    get: ({ get }) => {
        const selectedButton = get(selectedButtonAtom);
        return selectedButton ? selectedButton : null;
    }
});