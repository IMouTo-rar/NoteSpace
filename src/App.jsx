import React from 'react';
import './App.css';

import { ActivityBar, Sidebar, Panel, Footer } from './components/Primary';
import { ThemeProvider } from './components/Theme';

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