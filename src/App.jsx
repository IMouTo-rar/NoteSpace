import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilSnapshot, useRecoilState } from 'recoil';
import './App.css';

import { ActivityBar, Sidebar, Panel, Footer } from './components/Primary';
import { ThemeProvider } from './components/Theme';
import { SaveRecoilStateToConfig, LoadRecoilStateFromConfig } from './components/Primary/Atom';
function App() {

    return (
        <ThemeProvider>
            <LoadRecoilStateFromConfig />
            <SaveRecoilStateToConfig />
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