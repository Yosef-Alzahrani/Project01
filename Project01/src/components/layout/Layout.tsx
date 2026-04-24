import React from 'react';
import { Navbar } from './Navbar';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
export function Layout({ children }: {children: React.ReactNode;}) {
  const { theme } = useTheme();
  const { dir } = useLanguage();
  return (
    <div
      className="min-h-screen"
      dir={dir}
      style={{
        backgroundColor: 'var(--bg-page)',
        color: 'var(--text-primary)'
      }}>

      {/* Background Elements — only visible in dark mode */}
      {theme === 'dark' &&
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] animate-pulse" />
          <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] animate-pulse"
          style={{
            animationDelay: '2s'
          }} />

        </div>
      }

      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {children}
      </main>
    </div>);

}