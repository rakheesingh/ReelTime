// Layout.js
import React, { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps{
    children : ReactNode
}

 function Layout({ children } : LayoutProps) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
