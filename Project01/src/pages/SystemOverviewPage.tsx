import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  Activity,
  Stethoscope,
  Bug,
  Dumbbell,
  HeartPulse,
  BookOpen,
  ShieldAlert,
  Brain,
  Eye,
  Zap } from
'lucide-react';
function getVisitorId(): string {
  const key = 'medgrade_visitor_id';
  let id = localStorage.getItem(key);
  if (!id) {
    id =
    'v_' +
    Math.random().toString(36).substring(2, 15) +
    Date.now().toString(36);
    localStorage.setItem(key, id);
  }
  return id;
}
function trackVisit(): number {
  const key = 'medgrade_total_visits';
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  const newCount = current + 1;
  localStorage.setItem(key, newCount.toString());
  getVisitorId();
  localStorage.setItem('medgrade_last_active', Date.now().toString());
  return newCount;
}
function getActiveNow(): number {
  const lastActive = parseInt(
    localStorage.getItem('medgrade_last_active') || '0',
    10
  );
  const fiveMinutes = 5 * 60 * 1000;
  return Date.now() - lastActive < fiveMinutes ? 1 : 0;
}
function EcgLine() {
  return (
    <svg
      className="medical-ecg-line"
      width="200%"
      height="100%"
      viewBox="0 0 2400 80"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        transform: 'translateY(-50%)'
      }}>

      <path
        d="M0,40 L80,40 L90,40 L100,20 L110,60 L120,10 L130,70 L140,35 L150,45 L160,40 L300,40 L310,40 L320,20 L330,60 L340,10 L350,70 L360,35 L370,45 L380,40 L500,40 L510,40 L520,20 L530,60 L540,10 L550,70 L560,35 L570,45 L580,40 L700,40 L710,40 L720,20 L730,60 L740,10 L750,70 L760,35 L770,45 L780,40 L900,40 L910,40 L920,20 L930,60 L940,10 L950,70 L960,35 L970,45 L980,40 L1100,40 L1110,40 L1120,20 L1130,60 L1140,10 L1150,70 L1160,35 L1170,45 L1180,40 L1200,40 L1280,40 L1290,40 L1300,20 L1310,60 L1320,10 L1330,70 L1340,35 L1350,45 L1360,40 L1500,40 L1510,40 L1520,20 L1530,60 L1540,10 L1550,70 L1560,35 L1570,45 L1580,40 L1700,40 L1710,40 L1720,20 L1730,60 L1740,10 L1750,70 L1760,35 L1770,45 L1780,40 L1900,40 L1910,40 L1920,20 L1930,60 L1940,10 L1950,70 L1960,35 L1970,45 L1980,40 L2100,40 L2110,40 L2120,20 L2130,60 L2140,10 L2150,70 L2160,35 L2170,45 L2180,40 L2400,40"
        fill="none"
        stroke="rgba(37, 99, 235, 0.08)"
        strokeWidth="1.5" />

    </svg>);

}
export function SystemOverviewPage() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [totalVisits, setTotalVisits] = useState(0);
  const [activeNow, setActiveNow] = useState(0);
  const isDark = theme === 'dark';
  useEffect(() => {
    const visits = trackVisit();
    setTotalVisits(visits);
    setActiveNow(getActiveNow());
    const interval = setInterval(() => {
      localStorage.setItem('medgrade_last_active', Date.now().toString());
      setActiveNow(getActiveNow());
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  const features = [
  {
    titleEn: 'Injury Assessment',
    titleAr: 'تقييم الإصابات',
    descEn:
    'AI-powered analysis to classify wounds and injuries using advanced computer vision.',
    descAr:
    'تحليل مدعوم بالذكاء الاصطناعي لتصنيف الجروح والإصابات باستخدام رؤية الكمبيوتر المتقدمة.',
    benefitEn: 'Medical professionals, First responders',
    benefitAr: 'المهنيين الطبيين، المسعفين الأولين',
    icon: Stethoscope,
    path: '/wound-assessment',
    lightColor: 'text-red-600',
    darkColor: 'text-red-400',
    lightBg: 'bg-red-50',
    darkBg: 'bg-red-900/20'
  },
  {
    titleEn: 'Disease Encyclopedia',
    titleAr: 'موسوعة الأمراض',
    descEn:
    'Comprehensive database of diseases with symptoms, treatments, and prevention advice.',
    descAr: 'قاعدة بيانات شاملة للأمراض مع الأعراض والعلاجات ونصائح الوقاية.',
    benefitEn: 'Patients, Students, Researchers',
    benefitAr: 'المرضى، الطلاب، الباحثين',
    icon: Bug,
    path: '/diseases',
    lightColor: 'text-[#2563EB]',
    darkColor: 'text-blue-400',
    lightBg: 'bg-blue-50',
    darkBg: 'bg-blue-900/20'
  },
  {
    titleEn: 'Personal Health Analysis',
    titleAr: 'التحليل الصحي الشخصي',
    descEn:
    'Calculate health metrics like BMI, BMR, and get personalized health insights.',
    descAr:
    'حساب المقاييس الصحية مثل مؤشر كتلة الجسم ومعدل الأيض والحصول على رؤى صحية مخصصة.',
    benefitEn: 'General users, Fitness enthusiasts',
    benefitAr: 'المستخدمين العامين، عشاق اللياقة البدنية',
    icon: HeartPulse,
    path: '/health-analysis',
    lightColor: 'text-emerald-600',
    darkColor: 'text-emerald-400',
    lightBg: 'bg-emerald-50',
    darkBg: 'bg-emerald-900/20'
  },
  {
    titleEn: 'Body & Exercise',
    titleAr: 'الجسم والتمارين',
    descEn:
    'Interactive body map and tailored exercise recommendations based on your goals.',
    descAr: 'خريطة تفاعلية للجسم وتوصيات تمارين مخصصة بناءً على أهدافك.',
    benefitEn: 'Athletes, Physical therapy patients',
    benefitAr: 'الرياضيين، مرضى العلاج الطبيعي',
    icon: Dumbbell,
    path: '/body-analysis',
    lightColor: 'text-purple-600',
    darkColor: 'text-purple-400',
    lightBg: 'bg-purple-50',
    darkBg: 'bg-purple-900/20'
  },
  {
    titleEn: 'Technical Documentation',
    titleAr: 'التوثيق التقني',
    descEn:
    'Detailed technical overview of the AI models and system architecture.',
    descAr: 'نظرة عامة تقنية مفصلة عن نماذج الذكاء الاصطناعي وهيكلية النظام.',
    benefitEn: 'Developers, Technical auditors',
    benefitAr: 'المطورين، المدققين التقنيين',
    icon: BookOpen,
    path: '/technical-overview',
    lightColor: 'text-slate-600',
    darkColor: 'text-gray-400',
    lightBg: 'bg-slate-50',
    darkBg: 'bg-gray-800'
  }];

  return (
    <div className="relative">
      {/* ===== Dark Medical AI Background (dark mode only) ===== */}
      {isDark &&
      <div
        className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          background:
          'linear-gradient(135deg, #0B0F19 0%, #0F172A 40%, #111827 100%)'
        }}>

          <div className="absolute inset-0 medical-neural-grid" />
          <div className="absolute top-[20%] left-0 w-full h-20 overflow-hidden opacity-60">
            <EcgLine />
          </div>
          <div className="absolute top-[65%] left-0 w-full h-20 overflow-hidden opacity-40">
            <EcgLine />
          </div>
          <div
          className="medical-bg-glow-1 absolute rounded-full blur-[120px]"
          style={{
            width: '500px',
            height: '500px',
            top: '5%',
            left: '10%',
            background:
            'radial-gradient(circle, rgba(30, 58, 138, 0.15) 0%, transparent 70%)'
          }} />

          <div
          className="medical-bg-glow-2 absolute rounded-full blur-[140px]"
          style={{
            width: '600px',
            height: '600px',
            top: '40%',
            right: '5%',
            background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)'
          }} />

          <div
          className="medical-bg-glow-3 absolute rounded-full blur-[100px]"
          style={{
            width: '400px',
            height: '400px',
            bottom: '10%',
            left: '30%',
            background:
            'radial-gradient(circle, rgba(30, 58, 138, 0.12) 0%, transparent 70%)'
          }} />

          <div
          className="absolute inset-0"
          style={{
            backgroundImage:
            'linear-gradient(rgba(37, 99, 235, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.03) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />

          <div
          className="absolute inset-0"
          style={{
            background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(11, 15, 25, 0.6) 100%)'
          }} />

        </div>
      }

      {/* ===== Page Content ===== */}
      <div className="relative z-10 space-y-8 animate-in fade-in duration-500 pb-12">
        {/* Hero Section */}
        <div
          className="relative overflow-hidden rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-center min-h-[180px]"
          style={{
            background: isDark ?
            'linear-gradient(135deg, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(37, 99, 235, 0.15) 100%)' :
            'linear-gradient(135deg, #E0F2FE 0%, #F0F9FF 50%, #EFF6FF 100%)',
            border: isDark ?
            '1px solid rgba(255,255,255,0.06)' :
            '1px solid var(--border-color)'
          }}>

          {/* Decorative glows */}
          {isDark &&
          <>
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-600/8 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
            </>
          }
          {!isDark &&
          <>
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/30 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-sky-200/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
            </>
          }

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge
                className="border backdrop-blur-sm"
                style={{
                  backgroundColor: 'var(--hero-badge-bg)',
                  color: 'var(--hero-badge-text)',
                  borderColor: isDark ?
                  'rgba(255,255,255,0.1)' :
                  'rgba(37,99,235,0.15)'
                }}>

                <Activity className="w-3 h-3 mr-1" />
                v3.0.0
              </Badge>
              <Badge
                className="border backdrop-blur-sm"
                style={{
                  backgroundColor: isDark ?
                  'rgba(16,185,129,0.1)' :
                  'rgba(16,185,129,0.08)',
                  color: isDark ? '#6EE7B7' : '#059669',
                  borderColor: isDark ?
                  'rgba(16,185,129,0.2)' :
                  'rgba(16,185,129,0.15)'
                }}>

                <ShieldAlert className="w-3 h-3 mr-1" />
                {language === 'en' ? 'Secure & Private' : 'آمن وخاص'}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span
                style={{
                  color: 'var(--color-primary)'
                }}>

                Med
              </span>
              <span
                style={{
                  color: isDark ? '#FFFFFF' : '#0F172A'
                }}>

                Grade
              </span>
              <span
                className="ml-2"
                style={{
                  color: isDark ? 'rgba(191,219,254,0.7)' : '#64748B'
                }}>

                AI
              </span>
            </h1>
          </div>
        </div>

        {/* Visitor Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="p-5">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: 'var(--icon-bg)'
                }}>

                <Eye
                  className="w-6 h-6"
                  style={{
                    color: 'var(--icon-color)'
                  }} />

              </div>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{
                    color: 'var(--text-secondary)'
                  }}>

                  {language === 'en' ? 'Total Visits' : 'إجمالي الزيارات'}
                </p>
                <p
                  className="text-3xl font-bold"
                  style={{
                    color: 'var(--text-primary)'
                  }}>

                  {totalVisits.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center gap-4">
              <div
                className="p-3 rounded-xl"
                style={{
                  backgroundColor: 'var(--color-success-50)'
                }}>

                <Zap
                  className="w-6 h-6"
                  style={{
                    color: 'var(--color-success-500)'
                  }} />

              </div>
              <div>
                <p
                  className="text-sm font-medium"
                  style={{
                    color: 'var(--text-secondary)'
                  }}>

                  {language === 'en' ? 'Active Now' : 'نشط الآن'}
                </p>
                <div className="flex items-center gap-2">
                  <p
                    className="text-3xl font-bold"
                    style={{
                      color: 'var(--text-primary)'
                    }}>

                    {activeNow}
                  </p>
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Features Grid */}
        <div>
          <h2
            className="text-2xl font-bold mb-6 flex items-center gap-2"
            style={{
              color: 'var(--text-primary)'
            }}>

            <Brain
              className="w-6 h-6"
              style={{
                color: 'var(--icon-color)'
              }} />

            {language === 'en' ? 'System Modules' : 'وحدات النظام'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) =>
            <Card
              key={index}
              className="p-6 flex flex-col h-full cursor-pointer group"
              onClick={() => navigate(feature.path)}>

                <div className="flex justify-between items-start mb-4">
                  <div
                  className={`p-3 rounded-xl ${isDark ? feature.darkBg : feature.lightBg} ${isDark ? feature.darkColor : feature.lightColor} group-hover:scale-105 transition-transform duration-300`}>

                    <feature.icon className="w-6 h-6" />
                  </div>
                </div>

                <h3
                className="text-xl font-bold mb-2"
                style={{
                  color: 'var(--text-primary)'
                }}>

                  {language === 'en' ? feature.titleEn : feature.titleAr}
                </h3>

                <p
                className="mb-4 flex-grow text-sm leading-relaxed"
                style={{
                  color: 'var(--text-secondary)'
                }}>

                  {language === 'en' ? feature.descEn : feature.descAr}
                </p>

                <div
                className="mt-auto pt-4"
                style={{
                  borderTop: '1px solid var(--border-color)'
                }}>

                  <p
                  className="text-xs mb-2 font-semibold uppercase tracking-wider"
                  style={{
                    color: 'var(--text-muted)'
                  }}>

                    {language === 'en' ? 'Designed for:' : 'موجه لـ:'}
                  </p>
                  <p
                  className="text-sm font-medium"
                  style={{
                    color: 'var(--text-secondary)'
                  }}>

                    {language === 'en' ? feature.benefitEn : feature.benefitAr}
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>);

}