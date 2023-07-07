import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilSnapshot, useRecoilState } from 'recoil';
import './App.css';

import { ActivityBar, Sidebar, Panel, Footer } from './components/Primary';
import { ThemeProvider } from './components/Theme';
import { saveRecoilStateToConfig, LoadRecoilStateFromConfig } from './components/Atom';
import { selectedButton, selectedTheme } from './components/Atom';

function App() {

    return (
        <ThemeProvider>
            <LoadRecoilStateFromConfig />
            <div className='App'>
                <Sidebar />
                <ActivityBar />
                <Panel />
                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default App;