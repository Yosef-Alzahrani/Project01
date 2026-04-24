import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import {
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  Home,
  Dumbbell,
  Bug,
  Activity,
  Shield,
  Stethoscope,
  BookOpen,
  Settings,
  Users,
  LayoutGrid,
  ChevronDown,
  Brain,
  Star,
  LogOut,
  UserCircle } from
'lucide-react';
import { Button } from '../ui/Button';
/* MedGrade AI Logo — Minimal medical shield with ECG-to-neural-net */
function MedGradeLogo({ size = 32 }: {size?: number;}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">

      {/* Shield shape */}
      <path
        d="M20 2L4 10V20C4 30 20 38 20 38C20 38 36 30 36 20V10L20 2Z"
        fill="#1E3A8A"
        stroke="#3B82F6"
        strokeWidth="1.5" />

      {/* Inner shield highlight */}
      <path
        d="M20 5L7 11.5V20C7 28 20 35 20 35C20 35 33 28 33 20V11.5L20 5Z"
        fill="#1E3A8A"
        fillOpacity="0.6" />

      {/* ECG line transitioning to neural dots */}
      <path
        d="M8 21L12 21L14 17L16 25L18 13L20 27L22 20L24 21"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round" />

      {/* Neural network dots */}
      <circle cx="26" cy="19" r="1.2" fill="#3B82F6" />
      <circle cx="29" cy="17" r="1" fill="#3B82F6" opacity="0.8" />
      <circle cx="31" cy="21" r="1" fill="#3B82F6" opacity="0.8" />
      <circle cx="29" cy="23" r="0.8" fill="#3B82F6" opacity="0.6" />
      {/* Neural connections */}
      <line
        x1="26"
        y1="19"
        x2="29"
        y2="17"
        stroke="#3B82F6"
        strokeWidth="0.5"
        opacity="0.5" />

      <line
        x1="26"
        y1="19"
        x2="31"
        y2="21"
        stroke="#3B82F6"
        strokeWidth="0.5"
        opacity="0.5" />

      <line
        x1="29"
        y1="17"
        x2="31"
        y2="21"
        stroke="#3B82F6"
        strokeWidth="0.5"
        opacity="0.4" />

      <line
        x1="31"
        y1="21"
        x2="29"
        y2="23"
        stroke="#3B82F6"
        strokeWidth="0.5"
        opacity="0.4" />

      {/* Subtle cross/plus medical symbol at top */}
      <rect
        x="18.5"
        y="8"
        width="3"
        height="7"
        rx="0.5"
        fill="white"
        fillOpacity="0.2" />

      <rect
        x="16.5"
        y="10"
        width="7"
        height="3"
        rx="0.5"
        fill="white"
        fillOpacity="0.2" />

    </svg>);

}
export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isQuickNavOpen, setIsQuickNavOpen] = useState(false);
  const isDark = theme === 'dark';
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };
  const navItems = [
  {
    path: '/',
    label: language === 'en' ? 'Overview' : 'نظرة عامة',
    icon: LayoutGrid
  },
  {
    path: '/wound-assessment',
    label: language === 'en' ? 'Injury AI' : 'تقييم الإصابات',
    icon: Stethoscope
  },
  {
    path: '/diseases',
    label: t('nav.diseases'),
    icon: Bug
  },
  {
    path: '/model-performance',
    label: language === 'en' ? 'AI Performance' : 'أداء النموذج',
    icon: Brain
  },
  {
    path: '/settings',
    label: language === 'en' ? 'Settings' : 'الإعدادات',
    icon: Settings
  },
  {
    path: '/team',
    label: language === 'en' ? 'Team' : 'الفريق',
    icon: Users
  },
  {
    path: '/technical-overview',
    label: language === 'en' ? 'Docs' : 'التوثيق',
    icon: BookOpen
  },
  {
    path: '/site-rating',
    label: language === 'en' ? 'Rate Us' : 'قيّمنا',
    icon: Star
  },
  ...(!isAuthenticated ? [
  {
    path: '/login',
    label: t('nav.login'),
    icon: Shield
  },
  {
    path: '/register',
    label: t('nav.register'),
    icon: Users
  }] : [])];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  const handleQuickNav = (path: string) => {
    navigate(path);
    setIsQuickNavOpen(false);
  };
  return (
    <nav
      className="sticky top-0 z-50 w-full backdrop-blur-xl"
      style={{
        backgroundColor: isDark ?
        'rgba(11, 15, 25, 0.9)' :
        'rgba(255, 255, 255, 0.92)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-nav)'
      }}>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-2.5 group">

            <div className="transition-transform duration-300 group-hover:scale-105">
              <MedGradeLogo size={36} />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-[#2563EB]">Med</span>
              <span className="text-gray-900 dark:text-blue-100">Grade</span>
              <span className="text-gray-500 dark:text-blue-200/60 ml-1 font-semibold">
                AI
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
            {navItems.slice(0, 5).map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2
                    ${active ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-white/[0.04]'}
                  `}
                  style={{
                    color: active ?
                    'var(--color-primary)' :
                    'var(--text-secondary)'
                  }}>

                  <item.icon
                    className="w-4 h-4"
                    style={{
                      color: active ?
                      'var(--color-primary)' :
                      'var(--text-muted)'
                    }} />

                  {item.label}
                  {active &&
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 rounded-t-full"
                    style={{
                      backgroundColor: 'var(--color-primary)'
                    }} />

                  }
                </Link>);

            })}

            {/* More Menu */}
            <div className="relative group">
              <button
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-white/[0.04] flex items-center gap-1"
                style={{
                  color: 'var(--text-secondary)'
                }}>

                {language === 'en' ? 'More' : 'المزيد'}
                <ChevronDown className="w-3 h-3" />
              </button>
              <div
                className="absolute top-full right-0 mt-2 w-48 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right"
                style={{
                  backgroundColor: isDark ? '#111827' : '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-card-hover)'
                }}>

                {navItems.slice(5).map((item) =>
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-2 px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-white/[0.04] first:rounded-t-xl last:rounded-b-xl"
                  style={{
                    color: 'var(--text-secondary)'
                  }}>

                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Quick Switch (Mobile/Tablet) */}
          <div className="lg:hidden flex items-center relative">
            <button
              onClick={() => setIsQuickNavOpen(!isQuickNavOpen)}
              className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-white/[0.06] rounded-lg text-xs font-medium mr-2">

              <LayoutGrid className="w-3 h-3" />
              {language === 'en' ? 'Quick Jump' : 'تنقل سريع'}
            </button>

            {isQuickNavOpen &&
            <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-[#111827] rounded-xl shadow-xl border border-gray-200 dark:border-white/[0.08] z-50 p-2 grid grid-cols-2 gap-2">
                {navItems.map((item) =>
              <button
                key={item.path}
                onClick={() => handleQuickNav(item.path)}
                className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-white/[0.04] text-center">

                    <item.icon className="w-5 h-5 text-[#2563EB]" />
                    <span className="text-[10px] font-medium truncate w-full">
                      {item.label}
                    </span>
                  </button>
              )}
              </div>
            }
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{ color: 'var(--text-secondary)' }}>
                  <UserCircle className="w-4 h-4" />
                  <span className="max-w-[120px] truncate">{user.name || user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="h-9 px-3 rounded-lg flex items-center gap-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  aria-label="Logout">
                  <LogOut className="h-4 w-4" />
                  <span className="text-xs font-medium">{language === 'en' ? 'Logout' : 'خروج'}</span>
                </Button>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="w-9 h-9 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-white/[0.06]"
              aria-label="Toggle Language">

              <Globe className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-9 h-9 p-0 rounded-full hover:bg-gray-100 dark:hover:bg-white/[0.06]"
              aria-label="Toggle Theme">

              {theme === 'dark' ?
              <Sun className="h-4 w-4 text-amber-400" /> :

              <Moon className="h-4 w-4 text-[#2563EB]" />
              }
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/[0.06] focus:outline-none transition-colors">

              {isMenuOpen ?
              <X className="block h-6 w-6" /> :

              <Menu className="block h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'}`}>

        <div
          className="px-4 pt-2 pb-4 space-y-1 shadow-lg"
          style={{
            backgroundColor: isDark ? '#0B0F19' : '#FFFFFF',
            borderBottom: '1px solid var(--border-color)'
          }}>

          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors
                  ${active ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-100 dark:hover:bg-white/[0.04]'}
                `}
                style={{
                  color: active ?
                  'var(--color-primary)' :
                  'var(--text-secondary)'
                }}>

                <item.icon
                  className="w-5 h-5"
                  style={{
                    color: active ?
                    'var(--color-primary)' :
                    'var(--text-muted)'
                  }} />

                {item.label}
              </Link>);

          })}
          <div
            className="flex items-center justify-between px-4 py-3 mt-4"
            style={{
              borderTop: '1px solid var(--border-color)'
            }}>

            <span
              className="text-sm font-medium"
              style={{
                color: 'var(--text-muted)'
              }}>
              {isAuthenticated && user ? (user.name || user.email) : (language === 'en' ? 'Settings' : 'الإعدادات')}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="h-8 px-3 text-xs">

                {language === 'en' ? 'العربية' : 'English'}
              </Button>
              {isAuthenticated && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="h-8 px-3 text-xs text-red-500 border-red-300 dark:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut className="h-3 w-3 mr-1" />
                  {language === 'en' ? 'Logout' : 'خروج'}
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className="h-8 w-8 p-0">

                {isDark ?
                <Sun className="h-4 w-4" /> :

                <Moon className="h-4 w-4" />
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>);

}