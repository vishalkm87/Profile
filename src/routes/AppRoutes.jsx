import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routesConfig } from './routesConfig';
import { HomePage } from '../pages/HomePage';

/**
 * Application Routing Switch
 * Dynamically maps routesConfig definitions to Route elements.
 */
export const AppRoutes = () => {
  return (
    <Routes>
      {routesConfig.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRoutes;

