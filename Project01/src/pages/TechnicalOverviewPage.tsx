import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../contexts/LanguageContext';
import {
  BookOpen,
  Brain,
  Cpu,
  Database,
  FileCode,
  Layers,
  Monitor,
  Server,
  Settings,
  Target,
  Zap,
  ArrowRight,
  CheckCircle2,
  Image,
  GitBranch,
  AlertTriangle,
  BarChart3,
  PieChart } from
'lucide-react';
export function TechnicalOverviewPage() {
  const { language } = useLanguage();
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-cyan-700 dark:from-teal-900 dark:to-cyan-900 rounded-2xl p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
              <BookOpen className="w-3 h-3 mr-1" />
              Documentation
            </Badge>
            <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-500/30 backdrop-blur-sm">
              {language === 'en' ? '3 Wound Classes' : '3 فئات جروح'}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {language === 'en' ? 'Technical Overview' : 'نظرة تقنية عامة'}
          </h1>
          <p className="text-teal-100 text-lg max-w-2xl">
            {language === 'en' ?
            'AI-Powered Wound Classification System — ResNet50' :
            'نظام تصنيف الجروح المدعوم بالذكاء الاصطناعي — ResNet50'}
          </p>
        </div>
      </div>

      {/* Problem Definition */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-teal-500" />
          {language === 'en' ? 'Problem Statement' : 'تعريف المشكلة'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl border border-teal-100 dark:border-teal-900/30">
              <p className="text-sm font-bold text-teal-800 dark:text-teal-200 uppercase mb-1">
                {language === 'en' ? 'Problem Type' : 'نوع المشكلة'}
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Multi-Class Image Classification
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-sm font-bold text-gray-500 uppercase mb-1">
                {language === 'en' ? 'Objective' : 'الهدف'}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {language === 'en' ?
              'Classify wound images into 7 types (Abrasions, Bruises, Burns, Cut, Ingrown Nails, Laceration, Stab Wound) to provide an initial wound assessment that supports clinical decision-making.' :
              'تصنيف صور الجروح إلى 7 أنواع لتقديم تقييم أولي يدعم اتخاذ القرار السريري.'}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-500 uppercase mb-3">
              {language === 'en' ?
              'Classification Classes (7)' :
              'فئات التصنيف (7)'}
            </p>
            <div className="space-y-3">
              {[
              { color: 'emerald', en: 'Abrasions', ar: 'سحجات', desc: { en: 'Skin scrape from friction — Low risk', ar: 'خدش جلدي — خطورة منخفضة' } },
              { color: 'violet', en: 'Bruises', ar: 'كدمات', desc: { en: 'Blunt force contusion — Low risk', ar: 'رضّة حادة — خطورة منخفضة' } },
              { color: 'red', en: 'Burns', ar: 'حروق', desc: { en: 'Thermal / chemical injury — High risk', ar: 'حروق حرارية/كيميائية — خطورة عالية' } },
              { color: 'amber', en: 'Cut', ar: 'جرح قطعي', desc: { en: 'Sharp-object incised wound — Medium risk', ar: 'جرح حاد الحواف — خطورة متوسطة' } },
              { color: 'cyan', en: 'Ingrown Nails', ar: 'أظافر متضمنة', desc: { en: 'Nail growing into skin — Low risk', ar: 'ظفر ينمو داخل الجلد — خطورة منخفضة' } },
              { color: 'orange', en: 'Laceration', ar: 'تهتك', desc: { en: 'Torn jagged wound — Medium risk', ar: 'جرح ممزق — خطورة متوسطة' } },
              { color: 'red', en: 'Stab Wound', ar: 'جرح طعني', desc: { en: 'Penetrating puncture wound — High risk / Emergency', ar: 'جرح نافذ — خطورة عالية / طوارئ' } },
              ].map((cls) => (
              <div key={cls.en} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700">
                <span className={`w-3 h-3 rounded-full bg-${cls.color}-500 flex-shrink-0`} />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {cls.en} {language === 'ar' && `— ${cls.ar}`}
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === 'en' ? cls.desc.en : cls.desc.ar}
                  </p>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
          <p className="text-sm font-bold text-blue-800 dark:text-blue-200 uppercase mb-2">
            {language === 'en' ? 'Clinical Impact' : 'التأثير السريري'}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <li className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {language === 'en' ?
              'Faster triage decisions' :
              'قرارات فرز أسرع'}
            </li>
            <li className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {language === 'en' ?
              'Reduced misclassification' :
              'تقليل التصنيف الخاطئ'}
            </li>
            <li className="flex items-start gap-2 text-sm text-blue-700 dark:text-blue-300">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              {language === 'en' ?
              'Accessible first-aid guidance' :
              'إرشادات إسعافات أولية متاحة'}
            </li>
          </ul>
        </div>
      </Card>

      {/* System Architecture */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Layers className="w-6 h-6 text-indigo-500" />
          {language === 'en' ? 'System Architecture' : 'هيكلية النظام'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Frontend */}
          <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500 rounded-lg text-white">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Frontend
              </h3>
            </div>
            <ul className="space-y-2 text-sm">
              {[
              'React.js + TypeScript',
              'Vite (Build Tool)',
              'Tailwind CSS',
              'Recharts (Visualization)',
              'React Router',
              'Axios (HTTP Client)'].
              map((item) =>
              <li
                key={item}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300">

                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item}
                </li>
              )}
            </ul>
          </div>

          {/* Backend */}
          <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-500 rounded-lg text-white">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                Backend API
              </h3>
            </div>
            <ul className="space-y-2 text-sm">
              {[
              'Python 3.10+',
              'FastAPI Framework',
              'Uvicorn (ASGI Server)',
              'REST API Endpoints',
              'Pydantic (Validation)',
              'CORS Middleware'].
              map((item) =>
              <li
                key={item}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300">

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item}
                </li>
              )}
            </ul>
          </div>

          {/* AI Model */}
          <div className="p-5 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500 rounded-lg text-white">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">
                AI Model
              </h3>
            </div>
            <ul className="space-y-2 text-sm">
              {[
              'TensorFlow / Keras',
              'CNN Architecture',
              'ResNet50 (Base)',
              'Transfer Learning',
              '7-Class Softmax Output',
              'scikit-learn (Metrics)'].
              map((item) =>
              <li
                key={item}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300">

                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  {item}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Card>

      {/* Model Architecture */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-purple-500" />
          {language === 'en' ? 'Model Architecture' : 'هيكلية النموذج'}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
              <p className="text-sm font-bold text-purple-800 dark:text-purple-200 uppercase mb-1">
                Base Model
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                ResNet50 (ImageNet Pretrained)
              </p>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
              <p className="text-sm font-bold text-gray-500 uppercase mb-2">
                {language === 'en' ?
                'Why ResNet50?' :
                'لماذا ResNet50؟'}
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {language === 'en' ?
                  'Deep residual learning with proven medical imaging performance' :
                  'تعلم عميق بالبقايا وأداء مثبت في التصوير الطبي'}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {language === 'en' ?
                  'Skip connections prevent vanishing gradient during training' :
                  'اتصالات التخطي تمنع تلاشي التدرج أثناء التدريب'}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {language === 'en' ?
                  'Excellent feature extraction for texture-rich wound images' :
                  'استخراج مميزات ممتاز لصور الجروح الغنية بالملمس'}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {language === 'en' ?
                  'Widely used benchmark in medical imaging research' :
                  'معيار مستخدم بشكل واسع في أبحاث التصوير الطبي'}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  {language === 'en' ?
                  '~25.6M parameters, battle-tested ImageNet architecture' :
                  '~25.6 مليون معامل، هيكل ImageNet محكم'}
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-sm font-bold text-gray-500 uppercase mb-4">
              {language === 'en' ? 'Architecture Flow' : 'تدفق الهيكلية'}
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center">
                  <p className="text-xs font-bold text-blue-800 dark:text-blue-200">
                    Input
                  </p>
                  <p className="text-sm font-mono text-blue-600 dark:text-blue-300">
                    299×299×3
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-center">
                  <p className="text-xs font-bold text-purple-800 dark:text-purple-200">
                    ResNet50
                  </p>
                  <p className="text-sm font-mono text-purple-600 dark:text-purple-300">
                    Feature Extractor
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-center">
                  <p className="text-xs font-bold text-teal-800 dark:text-teal-200">
                    Global Avg Pool
                  </p>
                  <p className="text-sm font-mono text-teal-600 dark:text-teal-300">
                    2048 features
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-center">
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-200">
                    Dense + Dropout
                  </p>
                  <p className="text-sm font-mono text-amber-600 dark:text-amber-300">
                    256 (ReLU) + 0.5
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
              </div>
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-center">
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200">
                  Output Layer
                </p>
                <p className="text-sm font-mono text-emerald-600 dark:text-emerald-300">
                  Dense 7 (Softmax) → Class Probabilities
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Confidence Threshold */}
      <Card className="p-6 border-l-4 border-l-amber-500">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-500" />
          {language === 'en' ? 'Confidence Threshold' : 'حد الثقة'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
              <p className="text-sm font-bold text-amber-800 dark:text-amber-200 uppercase mb-1">
                Threshold
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                60%
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {language === 'en' ?
                'Minimum confidence required' :
                'الحد الأدنى المطلوب للثقة'}
              </p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {language === 'en' ?
              'If the model\'s highest class probability is below 60%, the result is marked as "Uncertain" instead of returning a potentially incorrect classification. This reduces dangerous misclassifications in critical medical scenarios.' :
              'إذا كان أعلى احتمال للفئة أقل من 60%، يتم تصنيف النتيجة كـ "غير مؤكد" بدلاً من إرجاع تصنيف قد يكون خاطئاً. هذا يقلل من التصنيفات الخاطئة الخطيرة في السيناريوهات الطبية الحرجة.'}
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-sm font-bold text-gray-500 uppercase mb-3">
              {language === 'en' ? 'Decision Logic' : 'منطق القرار'}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Confidence ≥ 60%' : 'الثقة ≥ 60%'}
                  </p>
                  <p className="text-xs text-gray-500">
                    →{' '}
                    {language === 'en' ?
                    'Return predicted class + recommendations' :
                    'إرجاع الفئة المتوقعة + التوصيات'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {language === 'en' ? 'Confidence < 60%' : 'الثقة < 60%'}
                  </p>
                  <p className="text-xs text-gray-500">
                    →{' '}
                    {language === 'en' ?
                    'Return "Uncertain" — consult a doctor' :
                    'إرجاع "غير مؤكد" — استشر طبيباً'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Data Distribution */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <PieChart className="w-6 h-6 text-blue-500" />
          {language === 'en' ? 'Data Distribution' : 'توزيع البيانات'}
        </h2>

            <p className="text-sm font-bold text-gray-500 uppercase mb-3">
              {language === 'en' ?
              'Data Distribution (7 Classes)' :
              'توزيع البيانات (7 فئات)'}
            </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { color: 'emerald', label: 'Abrasions',     arLabel: 'سحجات',          count: '~457' },
              { color: 'violet',  label: 'Bruises',       arLabel: 'كدمات',          count: '~457' },
              { color: 'red',     label: 'Burns',         arLabel: 'حروق',           count: '~457' },
              { color: 'amber',   label: 'Cut',           arLabel: 'جرح قطعي',     count: '~457' },
              { color: 'cyan',    label: 'Ingrown Nails', arLabel: 'أظافر متضمنة', count: '~457' },
              { color: 'orange',  label: 'Laceration',    arLabel: 'تهتك',            count: '~457' },
              { color: 'rose',    label: 'Stab Wound',    arLabel: 'جرح طعني',     count: '~456' },
            ].map((cls) => (
              <div key={cls.label} className={`p-3 bg-${cls.color}-50 dark:bg-${cls.color}-900/20 rounded-xl border border-${cls.color}-100 dark:border-${cls.color}-900/30 text-center`}>
                <span className={`w-3 h-3 rounded-full bg-${cls.color}-500 inline-block mb-2`} />
                <p className="text-xs font-bold text-gray-500 uppercase">{language === 'en' ? cls.label : cls.arLabel}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{cls.count}</p>
                <p className="text-xs text-gray-500">{language === 'en' ? 'training images' : 'صورة تدريب'}</p>
              </div>
            ))}
          </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
          <p className="text-sm font-bold text-blue-800 dark:text-blue-200 uppercase mb-2">
            {language === 'en' ? 'Class Balance' : 'توازن الفئات'}
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {language === 'en' ?
            'The dataset covers 7 wound types from multiple sources. Balanced sampling ensures the model learns each type equally, reducing bias toward common wound categories.' :
            'يغطي مجموعة البيانات 7 أنواع من الجروح من مصادر متعددة. التوازن يضمن تعلم النموذج لكل نوع بالتساوي.'}
          </p>
        </div>

        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
          <p className="text-sm font-bold text-gray-500 uppercase mb-2">
            {language === 'en' ? 'Data Sources' : 'مصادر البيانات'}
          </p>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Medetec Wound Database</strong> —{' '}
                {language === 'en' ?
                'Open wound images classified by severity' :
                'صور جروح مفتوحة مصنفة حسب الشدة'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0" />
              <span>
                <strong>PIID (Pressure Injury Images Dataset)</strong> —{' '}
                {language === 'en' ?
                'Stage 1→Minor, Stage 2→Moderate, Stage 3-4→Severe' :
                'المرحلة 1→بسيط، المرحلة 2→متوسط، المرحلة 3-4→شديد'}
              </span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Preprocessing Pipeline */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Image className="w-6 h-6 text-cyan-500" />
          {language === 'en' ? 'Preprocessing Pipeline' : 'خط معالجة الصور'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Image className="w-5 h-5 text-cyan-600" />
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Image Resize
            </p>
            <p className="text-xs text-gray-500 mt-1">299 × 299 px</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Settings className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Normalization
            </p>
            <p className="text-xs text-gray-500 mt-1">ResNet50 preprocess_input</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <GitBranch className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Augmentation
            </p>
            <p className="text-xs text-gray-500 mt-1">Rotate, Flip, Zoom</p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileCode className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              Libraries
            </p>
            <p className="text-xs text-gray-500 mt-1">OpenCV, NumPy, PIL</p>
          </div>
        </div>
      </Card>

      {/* Training Configuration */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-amber-500" />
          {language === 'en' ? 'Training Configuration' : 'إعدادات التدريب'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Optimizer
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              Adam
            </p>
            <p className="text-xs text-gray-500">lr = 0.0001</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Loss Function
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              Categorical
            </p>
            <p className="text-xs text-gray-500">Cross-Entropy</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Batch Size
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              32
            </p>
            <p className="text-xs text-gray-500">samples/batch</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-xs font-bold text-gray-500 uppercase">Epochs</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              30
            </p>
            <p className="text-xs text-gray-500">with early stopping</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Dataset Size
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              3,200
            </p>
            <p className="text-xs text-gray-500">total images</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Train Split
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              70%
            </p>
            <p className="text-xs text-gray-500">2,240 images</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Validation
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              15%
            </p>
            <p className="text-xs text-gray-500">480 images</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <p className="text-xs font-bold text-gray-500 uppercase">
              Test Split
            </p>
            <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
              15%
            </p>
            <p className="text-xs text-gray-500">480 images</p>
          </div>
        </div>
      </Card>

      {/* Evaluation Methodology */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Database className="w-6 h-6 text-indigo-500" />
          {language === 'en' ? 'Evaluation Methodology' : 'منهجية التقييم'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">
              {language === 'en' ? 'Per-Class Metrics' : 'مقاييس لكل فئة'}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {language === 'en' ?
              'Precision, Recall, and F1 Score are computed for each of the 3 wound classes:' :
              'يتم حساب الدقة والاستدعاء ومقياس F1 لكل فئة من فئات الجروح الثلاث:'}
            </p>
            <ul className="space-y-3">
              {[
              {
                label: 'minor_wound',
                color: 'emerald',
                name: language === 'en' ? 'Minor Wound' : 'جرح بسيط'
              },
              {
                label: 'moderate_wound',
                color: 'amber',
                name: language === 'en' ? 'Moderate Wound' : 'جرح متوسط'
              },
              {
                label: 'severe_wound',
                color: 'red',
                name: language === 'en' ? 'Severe Wound' : 'جرح شديد'
              }].
              map((cls) =>
              <li
                key={cls.label}
                className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">

                  <span
                  className={`w-3 h-3 rounded-full bg-${cls.color}-500 mt-1 flex-shrink-0`} />

                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      {cls.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Precision · Recall · F1 Score
                    </p>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-500 uppercase">
              {language === 'en' ? 'Visualization Tools' : 'أدوات التصور'}
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-rose-600">CM</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    Confusion Matrix
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === 'en' ?
                    '3×3 matrix showing actual vs predicted wound classes' :
                    'مصفوفة 3×3 تعرض الفئات الفعلية مقابل المتوقعة'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-indigo-600">ROC</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    ROC Curve
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === 'en' ?
                    'TPR vs FPR with AUC per wound class' :
                    'TPR مقابل FPR مع AUC لكل فئة جرح'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-teal-600">TH</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    Training History
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === 'en' ?
                    'Loss & accuracy curves over 30 epochs' :
                    'منحنيات الخسارة والدقة عبر 30 حقبة'}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-amber-600">CT</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">
                    Confidence Threshold
                  </p>
                  <p className="text-xs text-gray-500">
                    {language === 'en' ?
                    'Below 60% confidence → "Uncertain" result' :
                    'أقل من 60% ثقة → نتيجة "غير مؤكد"'}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </div>);

} 