import Link from 'next/link';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => { // Corrected component definition
  return (
    <div>
      <header>
        <h1>Ask Mkulima</h1>
        <nav>
          <Link href="/">Home</Link> | <Link href="/login">Login</Link> | <Link href="/register">Register</Link> | <Link href="/farmers/dashboard">Farmer Dashboard</Link> | <Link href="/businesses/dashboard">Business Dashboard</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2024 Ask Mkulima</p>
      </footer>
    </div>
  );
};

export default Layout;