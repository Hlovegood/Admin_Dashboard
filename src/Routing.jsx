import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import ScrollToTop from './Components/ScrollToTop';
import Projects from './pages/Projects';
import ProjectEditor from './pages/ProjectEditor';
import Pages from '../src/pages/Pages'
import Profile from './pages/Profile';
import Mail from './pages/Mail';
const Routing = () => {
    return ( <>
    <BrowserRouter>
        <ScrollToTop/>
    
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path ="/dashboard" element ={<Dashboard />}/>
        <Route path ="/projects" element ={<Projects />}/>
        <Route path ="/project-editor" element ={<ProjectEditor />}/>
        <Route path='/pages' element={<Pages/>}/>
        <Route path= '/profile' element={<Profile/>}/>
        <Route path='/mail' element={<Mail/>}/>


    </Routes>
    
    </BrowserRouter>
    </> );
}
 
export default Routing;