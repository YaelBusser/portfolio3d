import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "../pages/Home/index.jsx";
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default AppRoutes;
