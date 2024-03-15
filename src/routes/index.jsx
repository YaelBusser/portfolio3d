import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from "../pages/Home/index.jsx";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/portfolio3d" />} />
            <Route path="/portfolio3d" element={<Home />} />
        </Routes>
    );
}

export default AppRoutes;
