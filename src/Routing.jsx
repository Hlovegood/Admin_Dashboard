import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import ScrollToTop from './Components/ScrollToTop';
import Projects from './pages/Projects';
const Routing = () => {
    return ( <>
    <BrowserRouter>
        <ScrollToTop/>
    
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path ="/dashboard" element ={<Dashboard />}/>
        <Route path ="/projects" element ={<Projects />}/>




    </Routes>
    
    </BrowserRouter>
    </> );
}
 
export default Routing;