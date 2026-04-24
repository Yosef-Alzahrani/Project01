import React, { useState, useRef } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../contexts/LanguageContext';
import {
  predictInjury,
  PredictionResult,
  CLASS_LABELS,
  CLASS_COLORS,
  MEDICAL_RECOMMENDATIONS,
  InjuryClass } from
'../utils/aiService';
import {
  Upload,
  Camera,
  CheckCircle,
  AlertTriangle,
  Activity,
  Shield,
  Clock,
  Building2,
  Heart,
  RefreshCw,
  Brain,
  Ban,
  Pill,
  HelpCircle,
  Check } from
'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell } from
'recharts';
export function WoundAssessmentPage() {
  const { t, language } = useLanguage();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      startAnalysis(file);
    }
  };
  const startAnalysis = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisStep(0);
    setResult(null);
    setTimeout(() => setAnalysisStep(1), 800);
    setTimeout(() => setAnalysisStep(2), 1600);
    try {
      const prediction = await predictInjury(file);
      setTimeout(() => {
        setResult(prediction);
        setIsAnalyzing(false);
      }, 2400);
    } catch (error) {
      console.error('Prediction failed:', error);
      setIsAnalyzing(false);
    }
  };
  const resetAssessment = () => {
    setImage(null);
    setImagePreview(null);
    setIsAnalyzing(false);
    setAnalysisStep(0);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-emerald-500 text-white';
      case 'medium':
        return 'bg-amber-500 text-white';
      case 'high':
        return 'bg-red-600 text-white';
      case 'unknown':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
              <Brain className="w-3 h-3 mr-1" />
              Deep Learning
            </Badge>
            <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-500/30 backdrop-blur-sm">
              <span className="relative flex h-2 w-2 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {language === 'en' ? '7 Classification Classes' : '7 فئات تصنيف'}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {language === 'en' ?
            'AI Wound Assessment' :
            'تقييم الجروح بالذكاء الاصطناعي'}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {language === 'en' ?
            'CNN-powered wound classification using ResNet50 transfer learning — 7 wound types: Abrasions, Bruises, Burns, Cut, Ingrown Nails, Laceration and Stab Wounds.' :
            'تصنيف الجروح بالشبكات العصبية باستخدام ResNet50 — 7 أنواع: سحجات، كدمات، حروق، جروح قطعية، أظافر متضمنة، تهتك، وجروح طعنية.'}
          </p>
        </div>
      </div>

      {/* Disclaimer Banner */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-800 dark:text-amber-200 font-bold">
            {language === 'en' ? 'Medical Disclaimer' : 'تنويه طبي'}
          </p>
          <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
            {language === 'en' ?
            'This AI assessment is for guidance only and does not replace professional medical consultation. In case of emergency, call your local emergency number immediately.' :
            'هذا التقييم بالذكاء الاصطناعي إرشادي فقط ولا يغني عن استشارة الطبيب المختص. في حالات الطوارئ، اتصل برقم الطوارئ المحلي فوراً.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Upload / Image */}
        <div className="lg:col-span-1">
          {!image ?
          <Card
            className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer text-center h-full flex flex-col justify-center items-center gap-4 group"
            onClick={() => fileInputRef.current?.click()}>

              <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-10 h-10 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {language === 'en' ? 'Upload wound image' : 'ارفع صورة الجرح'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {language === 'en' ?
                'Drag & drop or click to browse' :
                'اسحب وأفلت أو اضغط للتصفح'}
                </p>
              </div>
              <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload} />

              <Button variant="outline" className="mt-4">
                <Camera className="w-4 h-4 mr-2" />
                {language === 'en' ? 'Take Photo' : 'التقاط صورة'}
              </Button>
            </Card> :

          <Card className="p-4 overflow-hidden h-full">
              <div className="relative rounded-xl overflow-hidden aspect-square bg-black">
                <img
                src={imagePreview!}
                alt="Assessment"
                className="w-full h-full object-contain" />

                {isAnalyzing &&
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-500" />
                    </div>
                    <p className="mt-4 font-medium animate-pulse">
                      {language === 'en' ?
                  ['Preprocessing...', 'Inference...', 'Diagnosing...'][
                  analysisStep] :

                  ['جاري المعالجة...', 'تحليل النموذج...', 'تشخيص...'][
                  analysisStep]
                  }
                    </p>
                  </div>
              }
              </div>
              {!isAnalyzing && result &&
            <div className="mt-4">
                  <Button
                variant="outline"
                className="w-full"
                onClick={resetAssessment}>

                    <RefreshCw className="w-4 h-4 mr-2" />
                    {language === 'en' ? 'New Assessment' : 'تقييم جديد'}
                  </Button>
                </div>
            }
            </Card>
          }
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-2">
          {!image ?
          <Card className="p-6 h-full">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                {language === 'en' ?
              'Guidelines for best results' :
              'إرشادات للحصول على أفضل النتائج'}
              </h3>
              <ul className="space-y-4">
                {[
              {
                en: 'Ensure the photo is clear and in focus',
                ar: 'تأكد من أن الصورة واضحة وفي بؤرة التركيز'
              },
              {
                en: 'Use good lighting, avoid shadows',
                ar: 'استخدم إضاءة جيدة، وتجنب الظلال'
              },
              {
                en: 'Do not use any filters or effects',
                ar: 'لا تستخدم أي فلاتر أو تأثيرات'
              },
              {
                en: 'Include some surrounding skin for context',
                ar: 'قم بتضمين بعض الجلد المحيط للسياق'
              }].
              map((item, i) =>
              <li
                key={i}
                className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">

                    <div className="mt-0.5 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-xs">
                      {i + 1}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'en' ? item.en : item.ar}
                    </span>
                  </li>
              )}
              </ul>
            </Card> :
          isAnalyzing ?
          <Card className="p-6 h-full flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                {language === 'en' ?
              'AI Analysis in Progress' :
              'تحليل الذكاء الاصطناعي قيد التقدم'}
              </h3>
              <div className="space-y-6 max-w-md mx-auto w-full">
                {[
              {
                en: 'Preprocessing image...',
                ar: 'جاري معالجة الصورة...'
              },
              {
                en: 'Running CNN inference...',
                ar: 'تشغيل نموذج الشبكات العصبية...'
              },
              {
                en: 'Generating diagnosis...',
                ar: 'إعداد التشخيص...'
              }].
              map((item, i) =>
              <div key={i} className="flex items-center gap-4">
                    <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-500 ${analysisStep > i ? 'bg-emerald-500 text-white' : analysisStep === i ? 'bg-blue-500 text-white animate-pulse' : 'bg-gray-200 dark:bg-gray-700 text-gray-400'}`}>

                      {analysisStep > i ?
                  <Check className="w-5 h-5" /> :

                  <span>{i + 1}</span>
                  }
                    </div>
                    <span
                  className={`font-medium transition-colors duration-300 ${analysisStep >= i ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>

                      {language === 'en' ? item.en : item.ar}
                    </span>
                  </div>
              )}
              </div>
            </Card> :
          result ?
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              {/* Uncertain Result */}
              {result.isUncertain &&
            <Card className="p-6 border-l-8 border-l-gray-400 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full">
                      <HelpCircle className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {language === 'en' ?
                    'Uncertain Result' :
                    'نتيجة غير مؤكدة'}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {language === 'en' ?
                    `The model confidence is ${(result.confidence * 100).toFixed(1)}%, which is below the 60% threshold. The result may not be reliable.` :
                    `نسبة ثقة النموذج ${(result.confidence * 100).toFixed(1)}%، وهي أقل من حد الـ 60%. النتيجة قد لا تكون موثوقة.`}
                      </p>
                      <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                        {language === 'en' ?
                    'Please consult a medical professional for accurate assessment.' :
                    'يرجى استشارة طبيب مختص للحصول على تقييم دقيق.'}
                      </p>
                    </div>
                  </div>
                </Card>
            }

              {/* Primary Result Card */}
              <Card
              className={`p-6 border-l-8 ${result.isUncertain ? 'border-l-gray-400' : result.severity === 'low' ? 'border-l-emerald-500' : result.severity === 'medium' ? 'border-l-amber-500' : 'border-l-red-600'}`}>

                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                  <div>
                    <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold mb-2 ${getSeverityColor(result.severity as string)}`}>

                      {result.isUncertain ?
                    <HelpCircle className="w-4 h-4" /> :
                    result.severity === 'low' ?
                    <Shield className="w-4 h-4" /> :
                    result.severity === 'medium' ?
                    <AlertTriangle className="w-4 h-4" /> :

                    <Ban className="w-4 h-4" />
                    }
                      {result.isUncertain ?
                    language === 'en' ?
                    'Uncertain' :
                    'غير مؤكد' :
                    language === 'en' ?
                    result.severity === 'low' ?
                    'Low Risk' :
                    result.severity === 'medium' ?
                    'Medium Risk' :
                    'High Risk' :
                    result.severity === 'low' ?
                    'خطورة منخفضة' :
                    result.severity === 'medium' ?
                    'خطورة متوسطة' :
                    'خطورة عالية'}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {result.isUncertain ?
                    language === 'en' ?
                    'Uncertain Classification' :
                    'تصنيف غير مؤكد' :
                    language === 'en' ?
                    CLASS_LABELS[result.predictedClass as InjuryClass]?.
                    en :
                    CLASS_LABELS[result.predictedClass as InjuryClass]?.
                    ar}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'en' ?
                    `Confidence: ${(result.confidence * 100).toFixed(1)}%` :
                    `نسبة الثقة: ${(result.confidence * 100).toFixed(1)}%`}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="outline" className="font-mono text-xs">
                      {result.modelVersion}
                    </Badge>
                    <Badge variant="outline" className="font-mono text-xs">
                      {result.inferenceTimeMs.toFixed(0)}ms
                    </Badge>
                  </div>
                </div>

                {/* Probability Chart */}
                <div className="h-36 w-full mt-4">
                  <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                    {language === 'en' ?
                  'Class Probabilities (7 Classes)' :
                  'احتمالات الفئات (7 فئات)'}
                  </p>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    layout="vertical"
                    data={Object.entries(result.allProbabilities).
                    map(([cls, prob]) => ({
                      name:
                      language === 'en' ?
                      CLASS_LABELS[cls as InjuryClass]?.en :
                      CLASS_LABELS[cls as InjuryClass]?.ar,
                      prob: (prob as number) * 100,
                      color: CLASS_COLORS[cls as InjuryClass],
                      key: cls
                    })).
                    filter((d) => d.name).
                    sort((a, b) => b.prob - a.prob)}
                    margin={{
                      top: 0,
                      right: 30,
                      left: 40,
                      bottom: 0
                    }}>

                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis
                      dataKey="name"
                      type="category"
                      width={100}
                      tick={{
                        fontSize: 12
                      }} />

                      <Tooltip
                      cursor={{
                        fill: 'transparent'
                      }}
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff'
                      }} />

                      <Bar dataKey="prob" radius={[0, 4, 4, 0]} barSize={14}>
                        {Object.entries(result.allProbabilities).
                      filter(([cls]) => CLASS_COLORS[cls as InjuryClass]).
                      sort(([, a], [, b]) => (b as number) - (a as number)).
                      map(([cls], index) =>
                      <Cell
                        key={`cell-${index}`}
                        fill={CLASS_COLORS[cls as InjuryClass]} />

                      )}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Model Info Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                  <div>
                    <span className="block font-bold">Architecture</span>
                    ResNet50
                  </div>
                  <div>
                    <span className="block font-bold">Input Size</span>
                    {result.preprocessingInfo.resizedTo}
                  </div>
                  <div>
                    <span className="block font-bold">Inference</span>
                    {result.inferenceTimeMs.toFixed(0)}ms
                  </div>
                  <div>
                    <span className="block font-bold">Score</span>
                    {(result.confidence * 100).toFixed(1)}%
                  </div>
                </div>

                {/* Conservative Decision Notice */}
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900/30 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    {language === 'en' ?
                  'Confidence threshold of 50% applied — results below this are marked as uncertain. The ResNet50 model classifies 7 wound types using preprocess_input normalization.' :
                  'يُطبَّق حد ثقة 50% — النتائج دون هذا الحد تُصنَّف كغير مؤكدة. يصنف نموذج ResNet50 سبعة أنواع من الجروح.'}
                  </p>
                </div>
              </Card>

              {/* Recommendation & Action - only show if not uncertain */}
              {!result.isUncertain && result.predictedClass !== 'uncertain' &&
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 h-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-500" />
                      {language === 'en' ?
                  'Required Action' :
                  'الإجراء المطلوب'}
                    </h3>
                    {(() => {
                  const rec =
                  MEDICAL_RECOMMENDATIONS[
                  result.predictedClass as InjuryClass];

                  if (!rec) return null;
                  return (
                    <div className="text-center py-6">
                          <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${rec.urgency === 'emergency' ? 'bg-red-100 dark:bg-red-900/30 animate-pulse' : rec.urgency === 'doctor' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-emerald-100 dark:bg-emerald-900/30'}`}>

                            {rec.urgency === 'emergency' ?
                        <Building2 className="w-8 h-8 text-red-600" /> :
                        rec.urgency === 'doctor' ?
                        <Clock className="w-8 h-8 text-amber-600" /> :

                        <Heart className="w-8 h-8 text-emerald-600" />
                        }
                          </div>
                          <h4
                        className={`text-xl font-bold mb-2 ${rec.urgency === 'emergency' ? 'text-red-600' : rec.urgency === 'doctor' ? 'text-amber-600' : 'text-emerald-600'}`}>

                            {language === 'en' ? rec.actionEn : rec.actionAr}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 mb-6">
                            {language === 'en' ? rec.descEn : rec.descAr}
                          </p>
                          {rec.urgency === 'emergency' &&
                      <Button variant="danger" className="w-full">
                              {language === 'en' ?
                        'Find Nearest Hospital' :
                        'البحث عن أقرب مستشفى'}
                            </Button>
                      }
                          {rec.urgency === 'doctor' &&
                      <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                              {language === 'en' ?
                        'Book Appointment' :
                        'حجز موعد'}
                            </Button>
                      }
                        </div>);

                })()}
                  </Card>

                  <Card className="p-6 h-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Pill className="w-5 h-5 text-blue-500" />
                      {language === 'en' ?
                  'Care & Treatment' :
                  'العناية والعلاج'}
                    </h3>
                    {(() => {
                  const rec =
                  MEDICAL_RECOMMENDATIONS[
                  result.predictedClass as InjuryClass];

                  if (!rec) return null;
                  return (
                    <div className="space-y-4">
                          {rec.medicationsEn.length > 0 &&
                      <div>
                              <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">
                                {language === 'en' ?
                          'Recommended Medications' :
                          'الأدوية الموصى بها'}
                              </h4>
                              <ul className="space-y-2">
                                {(language === 'en' ?
                          rec.medicationsEn :
                          rec.medicationsAr).
                          map((med, i) =>
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm">

                                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                                    <span className="font-bold text-gray-900 dark:text-white">
                                      {med}
                                    </span>
                                  </li>
                          )}
                              </ul>
                            </div>
                      }
                          <div
                        className={
                        rec.medicationsEn.length > 0 ?
                        'border-t border-gray-100 dark:border-gray-800 pt-4' :
                        ''
                        }>

                            <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">
                              {language === 'en' ? 'Steps' : 'الخطوات'}
                            </h4>
                            <ol className="space-y-2">
                              {(language === 'en' ?
                          rec.stepsEn :
                          rec.stepsAr).
                          map((step, i) =>
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">

                                  <span className="font-bold text-blue-500">
                                    {i + 1}.
                                  </span>
                                  {step}
                                </li>
                          )}
                            </ol>
                          </div>
                        </div>);

                })()}
                  </Card>
                </div>
            }
            </div> :
          null}
        </div>
      </div>
    </div>);

}