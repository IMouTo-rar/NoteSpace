import React from 'react';
import { atom, selector } from 'recoil';

const activityBarResizeAtom = atom({
    key: 'activityBarResize',
    default: {
        isResizing: false,
        initialWidth: 0,
    }
})

export { activityBarResizeAtom };