import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import ScrollToTop from './Components/ScrollToTop';
const Routing = () => {
    return ( <>
    <BrowserRouter>
    
    <Routes>
        <ScrollToTop/>
        <Route path="/" element={<Login />} />
        <Route path ="/home" element ={<Dashboard />}/>



    </Routes>
    
    </BrowserRouter>
    </> );
}
 
export default Routing;