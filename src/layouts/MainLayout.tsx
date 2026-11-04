import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';

export const MainLayout: React.FC = () => (
  <>
    <Header />
    <main className="p-4 max-w-7xl mx-auto">
      <Outlet />
    </main>
  </>
);