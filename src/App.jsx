import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilSnapshot } from 'recoil';
import './App.css';

import { ActivityBar, Sidebar, Panel, Footer } from './components/Primary';
import { ThemeProvider } from './components/Theme';
import { saveRecoilStateToConfig, loadRecoilStateFromConfig } from './components/Atom';
import { invoke } from '@tauri-apps/api';

function App() {
    return (
        <ThemeProvider>
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