import React from 'react';
import './App.css';

import { ActivityBar, Sidebar, Panel } from './components/Primary';

function App() {

    return (
        <div className={`App`}>
            <Sidebar />
            <ActivityBar />
            <Panel />
        </div>
    )
}

export default App;