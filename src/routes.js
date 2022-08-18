import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './views/Home';
import Filme from './views/Filme';
import Header from './components/Header'

function RoutesAPP(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/filme/:id" element={<Filme/>}/>
            </Routes>
        </BrowserRouter>
    )}

export default RoutesAPP;