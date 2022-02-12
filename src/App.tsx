import React from "react";
import { HashRouter as Router } from 'react-router-dom';

import { Header } from './Header';
import { Footer } from './Footer';
import { Routes } from './Routes';

function App() {
    return (
        <Router>
            <Header/>
            <Routes/>
            <Footer/>
        </Router>
    );
}

export default App;
