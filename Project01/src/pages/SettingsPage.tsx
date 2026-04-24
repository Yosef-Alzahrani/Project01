import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import {
  Settings,
  Moon,
  Sun,
  Globe,
  BarChart,
  Shield,
  Check,
  Smartphone,
  Bell } from
'lucide-react';
export function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <Settings className="w-8 h-8 text-gray-700 dark:text-gray-300" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {language === 'en' ? 'System Settings' : 'إعدادات النظام'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {language === 'en' ?
            'Manage your preferences and application configuration' :
            'إدارة تفضيلاتك وتكوين التطبيق'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            {language === 'en' ? 'Appearance' : 'المظهر'}
          </h3>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/30 text-indigo-400' : 'bg-amber-100 text-amber-600'}`}>

                {theme === 'dark' ?
                <Moon className="w-5 h-5" /> :

                <Sun className="w-5 h-5" />
                }
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {language === 'en' ? 'Theme Mode' : 'وضع السمة'}
                </p>
                <p className="text-sm text-gray-500">
                  {theme === 'dark' ?
                  language === 'en' ?
                  'Dark mode is active' :
                  'الوضع الداكن مفعل' :
                  language === 'en' ?
                  'Light mode is active' :
                  'الوضع الفاتح مفعل'}
                </p>
              </div>
            </div>
            <Button onClick={toggleTheme} variant="outline">
              {language === 'en' ? 'Toggle' : 'تبديل'}
            </Button>
          </div>
        </Card>

        {/* Language */}
        <Card className="p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-500" />
            {language === 'en' ? 'Language' : 'اللغة'}
          </h3>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {language === 'en' ? 'Interface Language' : 'لغة الواجهة'}
                </p>
                <p className="text-sm text-gray-500">
                  {language === 'en' ? 'English' : 'العربية'}
                </p>
              </div>
            </div>
            <Button onClick={toggleLanguage} variant="outline">
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>
        </Card>

        {/* Privacy & Analytics */}
        <Card className="p-6 md:col-span-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-500" />
            {language === 'en' ? 'Privacy & Data' : 'الخصوصية والبيانات'}
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg ${analyticsEnabled ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>

                  <BarChart className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {language === 'en' ?
                    'Usage Analytics' :
                    'تحليلات الاستخدام'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ?
                    'Help improve the app by sharing anonymous usage data' :
                    'ساعد في تحسين التطبيق بمشاركة بيانات استخدام مجهولة'}
                  </p>
                </div>
              </div>
              <div
                className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${analyticsEnabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                onClick={() => setAnalyticsEnabled(!analyticsEnabled)}>

                <div
                  className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${analyticsEnabled ? 'translate-x-6' : 'translate-x-0'}`} />

              </div>
            </div>

            <div className="p-4 border border-blue-100 dark:border-blue-900/30 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm mb-1">
                    {language === 'en' ? 'Privacy Notice' : 'إشعار الخصوصية'}
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                    {language === 'en' ?
                    'This application processes all sensitive health data locally on your device. No personal medical images or patient records are uploaded to external servers. Analytics data is strictly anonymous and used only for system performance monitoring.' :
                    'يعالج هذا التطبيق جميع البيانات الصحية الحساسة محلياً على جهازك. لا يتم رفع أي صور طبية شخصية أو سجلات مرضى إلى خوادم خارجية. بيانات التحليلات مجهولة تماماً وتستخدم فقط لمراقبة أداء النظام.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>);

}