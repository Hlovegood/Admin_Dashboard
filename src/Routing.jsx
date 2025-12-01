import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
const Routing = () => {
    return ( <>
    <BrowserRouter>
    
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path ="/home" element ={<Dashboard />}/>



    </Routes>
    
    </BrowserRouter>
    </> );
}
 
export default Routing;