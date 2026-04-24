import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getDiseaseById,
  CATEGORY_LABELS,
  CATEGORY_ICONS } from
'../utils/diseasesData';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  AlertTriangle,
  ShieldCheck,
  Stethoscope,
  Thermometer,
  Info,
  Search } from
'lucide-react';
export function DiseaseDetailPage() {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const disease = id ? getDiseaseById(id) : undefined;
  if (!disease) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
          <Search className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {language === 'en' ? 'Disease Not Found' : 'المرض غير موجود'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          {language === 'en' ?
          "The disease you are looking for doesn't exist or has been removed." :
          'المرض الذي تبحث عنه غير موجود أو تم حذفه.'}
        </p>
        <Button onClick={() => navigate('/diseases')}>
          {language === 'en' ? 'Back to Encyclopedia' : 'العودة للموسوعة'}
        </Button>
      </div>);

  }
  const Icon = CATEGORY_ICONS[disease.category];
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'severe':
        return 'bg-red-500 text-white';
      case 'moderate':
        return 'bg-orange-500 text-white';
      case 'mild':
        return 'bg-emerald-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  const getSeverityLabel = (severity: string) => {
    if (language === 'en')
    return severity.charAt(0).toUpperCase() + severity.slice(1);
    switch (severity) {
      case 'severe':
        return 'خطير';
      case 'moderate':
        return 'متوسط';
      case 'mild':
        return 'خفيف';
      default:
        return severity;
    }
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate('/diseases')}
        className="group">

        {language === 'ar' ?
        <ArrowRight className="w-4 h-4 ml-2 group-hover:-translate-x-1 transition-transform" /> :

        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        }
        {language === 'en' ? 'Back to Encyclopedia' : 'العودة للموسوعة'}
      </Button>

      {/* Header Section */}
      <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-white dark:bg-gray-800">
                {language === 'en' ?
                CATEGORY_LABELS[disease.category].en :
                CATEGORY_LABELS[disease.category].ar}
              </Badge>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(disease.severityLevel)}`}>

                {getSeverityLabel(disease.severityLevel)}
              </span>
              {disease.isContagious &&
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  {language === 'en' ? 'Contagious' : 'معدي'}
                </span>
              }
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-[#2563EB] dark:text-blue-400">
                <Icon className="w-8 h-8" />
              </div>
              {language === 'en' ? disease.nameEn : disease.nameAr}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              {language === 'en' ?
              disease.descriptionEn :
              disease.descriptionAr}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Symptoms */}
        <Card className="p-6 h-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Thermometer className="w-6 h-6 text-red-500" />
            {language === 'en' ? 'Symptoms' : 'الأعراض'}
          </h3>
          <ul className="space-y-3">
            {(language === 'en' ? disease.symptomsEn : disease.symptomsAr).map(
              (s, i) =>
              <li
                key={i}
                className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20 text-red-800 dark:text-red-200">

                  <div className="mt-0.5 p-1 bg-red-100 dark:bg-red-800 rounded-full">
                    <AlertTriangle className="w-3 h-3" />
                  </div>
                  <span className="font-medium">{s}</span>
                </li>

            )}
          </ul>
        </Card>

        {/* Causes */}
        <Card className="p-6 h-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Info className="w-6 h-6 text-purple-500" />
            {language === 'en' ? 'Causes' : 'الأسباب'}
          </h3>
          <ul className="space-y-3">
            {(language === 'en' ? disease.causesEn : disease.causesAr).map(
              (c, i) =>
              <li
                key={i}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">

                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">{c}</span>
                </li>

            )}
          </ul>
        </Card>

        {/* Risk Factors */}
        <Card className="p-6 h-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            {language === 'en' ? 'Risk Factors' : 'عوامل الخطر'}
          </h3>
          <ul className="space-y-3">
            {(language === 'en' ?
            disease.riskFactorsEn :
            disease.riskFactorsAr).
            map((r, i) =>
            <li
              key={i}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">

                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-gray-700 dark:text-gray-300">{r}</span>
              </li>
            )}
          </ul>
        </Card>

        {/* Diagnosis */}
        <Card className="p-6 h-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-teal-500" />
            {language === 'en' ? 'Diagnosis' : 'التشخيص'}
          </h3>
          <ul className="space-y-3">
            {(language === 'en' ?
            disease.diagnosisEn :
            disease.diagnosisAr).
            map((d, i) =>
            <li
              key={i}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">

                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="text-gray-700 dark:text-gray-300">{d}</span>
              </li>
            )}
          </ul>
        </Card>

        {/* Treatment */}
        <Card className="p-6 h-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-blue-500" />
            {language === 'en' ? 'Treatment' : 'العلاج'}
          </h3>
          <ul className="space-y-3">
            {(language === 'en' ?
            disease.treatmentEn :
            disease.treatmentAr).
            map((t, i) =>
            <li
              key={i}
              className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20 text-blue-800 dark:text-blue-200">

                <div className="mt-0.5 p-1 bg-blue-100 dark:bg-blue-800 rounded-full">
                  <Activity className="w-3 h-3" />
                </div>
                <span className="font-medium">{t}</span>
              </li>
            )}
          </ul>
        </Card>

        {/* Prevention */}
        <Card className="p-6 h-full">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            {language === 'en' ? 'Prevention' : 'الوقاية'}
          </h3>
          <ul className="space-y-3">
            {(language === 'en' ?
            disease.preventionEn :
            disease.preventionAr).
            map((p, i) =>
            <li
              key={i}
              className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20 text-emerald-800 dark:text-emerald-200">

                <div className="mt-0.5 p-1 bg-emerald-100 dark:bg-emerald-800 rounded-full">
                  <ShieldCheck className="w-3 h-3" />
                </div>
                <span className="font-medium">{p}</span>
              </li>
            )}
          </ul>
        </Card>
      </div>
    </div>);

}