import './globals.css';
import { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Providers } from '@/components/Providers';

export const metadata = {
  title: 'IROO Control Dashboard',
  description: 'Intelligent Rail Operations Optimizer - Frontend Visualization Layer'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex bg-bg-primary">
        <Providers>
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}