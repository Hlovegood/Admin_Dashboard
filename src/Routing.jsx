import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import dashboard from './pages/dashboard';
const Routing = () => {
    return ( <>
    <BrowserRouter>
    
    <Routes>
        <Route path="/" element={<dashboard />} />
        <Route path ="/login" element ={<Login/>}/>



    </Routes>
    
    </BrowserRouter>
    </> );
}
 
export default Routing;