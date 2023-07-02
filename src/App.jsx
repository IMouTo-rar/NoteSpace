import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import './App.css';

import { ActivityBar, Sidebar, Panel } from './components/Primary';
import { ThemeProvider } from './components/Theme';

function App() {
    return (
        <ThemeProvider>
            <div className='App'>
                <Sidebar />
                <ActivityBar />
                <Panel />
            </div>
        </ThemeProvider>
    )
}

export default App;