import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { CircularProgress, ProgressBar } from '../components/ui/ProgressBar';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Activity,
  Scale,
  Ruler,
  User,
  Calendar,
  Heart,
  Flame,
  TrendingUp,
  ShieldCheck,
  Stethoscope,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Dumbbell,
  Apple,
  Printer } from
'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell } from
'recharts';
import { PrintReport } from '../components/ui/PrintReport';
export function PersonalHealthAnalysisPage() {
  const { language } = useLanguage();
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    activityLevel: 'moderate',
    goal: 'maintain',
    bloodSugar: '',
    bloodPressure: '',
    heartRate: ''
  });
  const [results, setResults] = useState({
    bmi: 0,
    bmr: 0,
    bodyFat: 0,
    fitnessScore: 0,
    biologicalAge: 0,
    healthStatus: 'good' as 'good' | 'needsImprovement',
    riskLevel: {
      fat: 'low' as 'low' | 'medium' | 'high',
      inactivity: 'low' as 'low' | 'medium' | 'high',
      muscle: 'low' as 'low' | 'medium' | 'high'
    }
  });
  const handleCalculate = () => {
    if (!formData.age || !formData.height || !formData.weight) return;
    setIsCalculating(true);
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseFloat(formData.age);
      const isMale = formData.gender === 'male';
      // BMI
      const heightM = height / 100;
      const bmi = weight / (heightM * heightM);
      // BMR (Mifflin-St Jeor)
      const bmr = isMale ?
      10 * weight + 6.25 * height - 5 * age + 5 :
      10 * weight + 6.25 * height - 5 * age - 161;
      // Body Fat estimate
      const bodyFat = 1.2 * bmi + 0.23 * age - (isMale ? 10.8 : 0) - 5.4;
      // Fitness Score (mock calculation based on inputs)
      let fitnessScore = 70;
      if (bmi >= 18.5 && bmi < 25) fitnessScore += 15;
      if (formData.activityLevel === 'high') fitnessScore += 10;
      if (formData.activityLevel === 'moderate') fitnessScore += 5;
      if (formData.heartRate && parseInt(formData.heartRate) < 80)
      fitnessScore += 5;
      fitnessScore = Math.min(100, fitnessScore);
      // Biological Age estimate
      let biologicalAge = age;
      if (bmi > 30) biologicalAge += 5;else
      if (bmi > 25) biologicalAge += 2;else
      if (bmi >= 18.5 && bmi < 25) biologicalAge -= 2;
      if (formData.activityLevel === 'high') biologicalAge -= 3;
      if (formData.activityLevel === 'low') biologicalAge += 3;
      // Risk levels
      const fatRisk = bodyFat > 30 ? 'high' : bodyFat > 25 ? 'medium' : 'low';
      const inactivityRisk =
      formData.activityLevel === 'low' ?
      'high' :
      formData.activityLevel === 'moderate' ?
      'medium' :
      'low';
      const muscleRisk = bmi < 18.5 ? 'high' : bmi > 30 ? 'medium' : 'low';
      // Health status
      const healthStatus =
      fitnessScore >= 70 && fatRisk !== 'high' ? 'good' : 'needsImprovement';
      setResults({
        bmi: parseFloat(bmi.toFixed(1)),
        bmr: Math.round(bmr),
        bodyFat: parseFloat(bodyFat.toFixed(1)),
        fitnessScore: Math.round(fitnessScore),
        biologicalAge: Math.round(biologicalAge),
        healthStatus,
        riskLevel: {
          fat: fatRisk as 'low' | 'medium' | 'high',
          inactivity: inactivityRisk as 'low' | 'medium' | 'high',
          muscle: muscleRisk as 'low' | 'medium' | 'high'
        }
      });
      setIsCalculating(false);
      setShowResults(true);
    }, 1500);
  };
  // Mock chart data
  const weightTrendData = [
  {
    month: 'Jan',
    weight: 75
  },
  {
    month: 'Feb',
    weight: 74
  },
  {
    month: 'Mar',
    weight: 73.5
  },
  {
    month: 'Apr',
    weight: 73
  },
  {
    month: 'May',
    weight: 72
  },
  {
    month: 'Jun',
    weight: parseFloat(formData.weight) || 72
  }];

  const bmiComparisonData = [
  {
    name: language === 'ar' ? 'نحافة' : 'Under',
    value: 18.5,
    color: '#3b82f6'
  },
  {
    name: language === 'ar' ? 'طبيعي' : 'Normal',
    value: 24.9,
    color: '#10b981'
  },
  {
    name: language === 'ar' ? 'زيادة' : 'Over',
    value: 29.9,
    color: '#f59e0b'
  },
  {
    name: language === 'ar' ? 'سمنة' : 'Obese',
    value: 40,
    color: '#ef4444'
  }];

  const getAgeData = (ageVal: number) => {
    if (ageVal < 30)
    return {
      common:
      language === 'ar' ?
      ['حب الشباب', 'الصداع النصفي', 'القلق'] :
      ['Acne', 'Migraine', 'Anxiety'],
      prevention:
      language === 'ar' ?
      ['إدارة التوتر', 'التمارين المنتظمة', 'النوم الكافي'] :
      ['Stress management', 'Regular exercise', 'Adequate sleep'],
      checkups:
      language === 'ar' ?
      ['فحص ضغط الدم', 'فحص الجلد', 'فحص الصحة النفسية'] :
      ['Blood pressure', 'Skin check', 'Mental health screening']
    };
    if (ageVal < 50)
    return {
      common:
      language === 'ar' ?
      ['ارتفاع ضغط الدم', 'آلام الظهر', 'السكري'] :
      ['Hypertension', 'Back Pain', 'Diabetes Type 2'],
      prevention:
      language === 'ar' ?
      ['التحكم بالوزن', 'تمارين القلب', 'تقليل الملح'] :
      ['Weight control', 'Cardio exercise', 'Low salt diet'],
      checkups:
      language === 'ar' ?
      ['الكوليسترول', 'فحص السكري', 'فحص السرطان'] :
      ['Cholesterol', 'Diabetes screening', 'Cancer screening']
    };
    return {
      common:
      language === 'ar' ?
      ['التهاب المفاصل', 'أمراض القلب', 'هشاشة العظام'] :
      ['Arthritis', 'Heart Disease', 'Osteoporosis'],
      prevention:
      language === 'ar' ?
      ['منع السقوط', 'صحة العظام', 'نظام غذائي صحي للقلب'] :
      ['Fall prevention', 'Bone health', 'Heart healthy diet'],
      checkups:
      language === 'ar' ?
      ['كثافة العظام', 'اختبار إجهاد القلب', 'فحص السمع'] :
      ['Bone density', 'Cardiac stress test', 'Hearing test']
    };
  };
  const ageData = formData.age ? getAgeData(parseInt(formData.age)) : null;
  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5)
    return {
      label: language === 'ar' ? 'نحافة' : 'Underweight',
      color: 'text-blue-500',
      bg: 'bg-blue-500'
    };
    if (bmi < 25)
    return {
      label: language === 'ar' ? 'طبيعي' : 'Normal',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500'
    };
    if (bmi < 30)
    return {
      label: language === 'ar' ? 'زيادة وزن' : 'Overweight',
      color: 'text-orange-500',
      bg: 'bg-orange-500'
    };
    return {
      label: language === 'ar' ? 'سمنة' : 'Obese',
      color: 'text-red-500',
      bg: 'bg-red-500'
    };
  };
  const getRiskBadge = (level: 'low' | 'medium' | 'high') => {
    const config = {
      low: {
        label: language === 'ar' ? 'منخفض' : 'Low',
        variant: 'common' as const
      },
      medium: {
        label: language === 'ar' ? 'متوسط' : 'Medium',
        variant: 'seasonal' as const
      },
      high: {
        label: language === 'ar' ? 'مرتفع' : 'High',
        variant: 'dangerous' as const
      }
    };
    return config[level];
  };
  const currentDate = new Date().toLocaleDateString(
    language === 'ar' ? 'ar-SA' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );
  // Prepare print report data
  const getPrintSections = () => {
    const sections = [
    {
      title: language === 'ar' ? 'البيانات الأساسية' : 'Basic Information',
      items: [
      {
        label: language === 'ar' ? 'العمر' : 'Age',
        value: `${formData.age} ${language === 'ar' ? 'سنة' : 'years'}`
      },
      {
        label: language === 'ar' ? 'الجنس' : 'Gender',
        value:
        formData.gender === 'male' ?
        language === 'ar' ?
        'ذكر' :
        'Male' :
        language === 'ar' ?
        'أنثى' :
        'Female'
      },
      {
        label: language === 'ar' ? 'الطول' : 'Height',
        value: `${formData.height} cm`
      },
      {
        label: language === 'ar' ? 'الوزن' : 'Weight',
        value: `${formData.weight} kg`
      }]

    },
    {
      title:
      language === 'ar' ? 'ملخص التحليل الصحي' : 'Health Analysis Summary',
      items: [
      {
        label: 'BMI',
        value: `${results.bmi} (${getBMIStatus(results.bmi).label})`,
        highlight: results.bmi >= 18.5 && results.bmi < 25
      },
      {
        label: 'BMR',
        value: `${results.bmr} ${language === 'ar' ? 'سعرة/يوم' : 'kcal/day'}`
      },
      {
        label: language === 'ar' ? 'نسبة الدهون' : 'Body Fat',
        value: `${results.bodyFat}%`
      },
      {
        label: language === 'ar' ? 'درجة اللياقة' : 'Fitness Score',
        value: `${results.fitnessScore}%`,
        highlight: results.fitnessScore >= 70
      },
      {
        label: language === 'ar' ? 'العمر البيولوجي' : 'Biological Age',
        value: `${results.biologicalAge} ${language === 'ar' ? 'سنة' : 'years'}`
      },
      {
        label:
        language === 'ar' ? 'الحالة الصحية العامة' : 'Overall Health',
        value:
        results.healthStatus === 'good' ?
        language === 'ar' ?
        'جيدة' :
        'Good' :
        language === 'ar' ?
        'تحتاج تحسين' :
        'Needs Improvement',
        highlight: results.healthStatus === 'good'
      }]

    },
    {
      title: language === 'ar' ? 'مؤشرات الخطر' : 'Risk Indicators',
      items: [
      {
        label: language === 'ar' ? 'مستوى الدهون' : 'Fat Level',
        value: getRiskBadge(results.riskLevel.fat).label
      },
      {
        label: language === 'ar' ? 'قلة الحركة' : 'Inactivity Risk',
        value: getRiskBadge(results.riskLevel.inactivity).label
      },
      {
        label: language === 'ar' ? 'ضعف العضلات' : 'Muscle Weakness',
        value: getRiskBadge(results.riskLevel.muscle).label
      }]

    }];

    return sections;
  };
  const getPrintRecommendations = () => {
    const recs = [];
    if (results.riskLevel.fat !== 'low') {
      recs.push(
        language === 'ar' ?
        'تمارين كارديو 30 دقيقة يومياً' :
        '30 minutes of cardio daily'
      );
    }
    if (results.riskLevel.muscle !== 'low') {
      recs.push(
        language === 'ar' ?
        'تمارين مقاومة 3 مرات أسبوعياً' :
        'Resistance training 3x per week'
      );
    }
    recs.push(
      language === 'ar' ?
      'المشي 10,000 خطوة يومياً' :
      'Walk 10,000 steps daily'
    );
    recs.push(
      language === 'ar' ?
      `السعرات اليومية المقترحة: ${Math.round(results.bmr * 1.5)} سعرة` :
      `Suggested daily calories: ${Math.round(results.bmr * 1.5)} kcal`
    );
    recs.push(
      language === 'ar' ?
      'شرب 8 أكواب ماء يومياً' :
      'Drink 8 glasses of water daily'
    );
    return recs;
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {language === 'ar' ?
              'التحليل الصحي الشخصي' :
              'Personal Health Analysis'}
            </h1>
            <p className="text-blue-100 text-lg">
              {language === 'ar' ?
              'عرض شامل لتحليل العمر، صحة الجسم، ومستوى اللياقة' :
              'Comprehensive view of age analysis, body health, and fitness level'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {showResults &&
            <Button
              onClick={() => setShowPrintPreview(true)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              variant="outline">

                <Printer className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'طباعة ملخص' : 'Print Summary'}
              </Button>
            }
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5" />
              <span className="text-sm">
                {language === 'ar' ? 'آخر تحديث:' : 'Last updated:'}{' '}
                {currentDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Form */}
      <Card className="p-6 border-t-4 border-t-blue-500">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-500" />
          {language === 'ar' ? 'بيانات المستخدم' : 'User Information'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input
            label={language === 'ar' ? 'العمر' : 'Age'}
            type="number"
            icon={<Calendar className="h-4 w-4" />}
            value={formData.age}
            onChange={(e) =>
            setFormData({
              ...formData,
              age: e.target.value
            })
            }
            placeholder="25" />

          <Select
            label={language === 'ar' ? 'الجنس' : 'Gender'}
            value={formData.gender}
            onChange={(e) =>
            setFormData({
              ...formData,
              gender: e.target.value
            })
            }
            options={[
            {
              value: 'male',
              label: language === 'ar' ? 'ذكر' : 'Male'
            },
            {
              value: 'female',
              label: language === 'ar' ? 'أنثى' : 'Female'
            }]
            } />

          <Input
            label={language === 'ar' ? 'الطول (سم)' : 'Height (cm)'}
            type="number"
            icon={<Ruler className="h-4 w-4" />}
            value={formData.height}
            onChange={(e) =>
            setFormData({
              ...formData,
              height: e.target.value
            })
            }
            placeholder="175" />

          <Input
            label={language === 'ar' ? 'الوزن (كجم)' : 'Weight (kg)'}
            type="number"
            icon={<Scale className="h-4 w-4" />}
            value={formData.weight}
            onChange={(e) =>
            setFormData({
              ...formData,
              weight: e.target.value
            })
            }
            placeholder="70" />

          <Select
            label={language === 'ar' ? 'مستوى النشاط' : 'Activity Level'}
            value={formData.activityLevel}
            onChange={(e) =>
            setFormData({
              ...formData,
              activityLevel: e.target.value
            })
            }
            options={[
            {
              value: 'low',
              label: language === 'ar' ? 'منخفض' : 'Low (Sedentary)'
            },
            {
              value: 'moderate',
              label: language === 'ar' ? 'متوسط' : 'Moderate'
            },
            {
              value: 'high',
              label: language === 'ar' ? 'عالي' : 'High (Active)'
            }]
            } />

          <Select
            label={language === 'ar' ? 'الهدف' : 'Goal'}
            value={formData.goal}
            onChange={(e) =>
            setFormData({
              ...formData,
              goal: e.target.value
            })
            }
            options={[
            {
              value: 'lose',
              label: language === 'ar' ? 'إنقاص الوزن' : 'Lose Weight'
            },
            {
              value: 'gain',
              label: language === 'ar' ? 'زيادة العضلات' : 'Build Muscle'
            },
            {
              value: 'maintain',
              label: language === 'ar' ? 'المحافظة' : 'Maintain'
            }]
            } />

        </div>

        {/* Optional Fields */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 mb-4">
            {language === 'ar' ? 'حقول اختيارية' : 'Optional Fields'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Input
              label={
              language === 'ar' ? 'سكر الدم (mg/dL)' : 'Blood Sugar (mg/dL)'
              }
              type="number"
              value={formData.bloodSugar}
              onChange={(e) =>
              setFormData({
                ...formData,
                bloodSugar: e.target.value
              })
              }
              placeholder="100" />

            <Input
              label={
              language === 'ar' ? 'ضغط الدم (sys/dia)' : 'Blood Pressure'
              }
              type="text"
              value={formData.bloodPressure}
              onChange={(e) =>
              setFormData({
                ...formData,
                bloodPressure: e.target.value
              })
              }
              placeholder="120/80" />

            <Input
              label={language === 'ar' ? 'نبض القلب (bpm)' : 'Heart Rate (bpm)'}
              type="number"
              icon={<Heart className="h-4 w-4" />}
              value={formData.heartRate}
              onChange={(e) =>
              setFormData({
                ...formData,
                heartRate: e.target.value
              })
              }
              placeholder="72" />

          </div>
        </div>

        <Button
          className="w-full mt-6"
          size="lg"
          onClick={handleCalculate}
          isLoading={isCalculating}>

          <Activity className="w-5 h-5 mr-2" />
          {language === 'ar' ? 'تحليل البيانات' : 'Analyze Data'}
        </Button>
      </Card>

      {showResults &&
      <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Card className="p-4 text-center">
              <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{formData.age}</p>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'العمر' : 'Age'}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <Activity className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
              <p className="text-2xl font-bold">{results.bmi}</p>
              <p className="text-xs text-gray-500">BMI</p>
            </Card>
            <Card className="p-4 text-center">
              <Scale className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">
                {formData.weight}
                <span className="text-sm">kg</span>
              </p>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'الوزن' : 'Weight'}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl font-bold">{results.bmr}</p>
              <p className="text-xs text-gray-500">BMR</p>
            </Card>
            <Card className="p-4 text-center">
              <Target className="w-6 h-6 mx-auto mb-2 text-red-500" />
              <p className="text-2xl font-bold">{results.fitnessScore}%</p>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'اللياقة' : 'Fitness'}
              </p>
            </Card>
            <Card className="p-4 text-center">
              <TrendingUp className="w-6 h-6 mx-auto mb-2 text-cyan-500" />
              <p className="text-2xl font-bold">{results.bodyFat}%</p>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'الدهون' : 'Body Fat'}
              </p>
            </Card>
          </div>

          {/* Age Analysis Section */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              {language === 'ar' ? 'تحليل العمر' : 'Age Analysis'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {language === 'ar' ?
                'العمر البيولوجي (تقديري)' :
                'Biological Age (Estimated)'}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-blue-600">
                    {results.biologicalAge}
                  </span>
                  <span className="text-gray-500 mb-1">
                    {language === 'ar' ? 'سنة' : 'years'}
                  </span>
                </div>
                <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                  {results.biologicalAge < parseInt(formData.age) ?
                language === 'ar' ?
                '🎉 أصغر من عمرك الفعلي!' :
                '🎉 Younger than your actual age!' :
                results.biologicalAge > parseInt(formData.age) ?
                language === 'ar' ?
                '⚠️ أكبر من عمرك الفعلي' :
                '⚠️ Older than your actual age' :
                language === 'ar' ?
                '✓ مطابق لعمرك' :
                '✓ Matches your age'}
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-6 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {language === 'ar' ?
                'مقارنة مع نفس الفئة العمرية' :
                'Compared to Same Age Group'}
                </p>
                <div className="flex items-center gap-4">
                  <CircularProgress
                  value={results.fitnessScore}
                  size={80}
                  strokeWidth={8}
                  color={results.fitnessScore >= 70 ? '#10b981' : '#f59e0b'} />

                  <div>
                    <p className="font-bold text-lg">
                      {results.fitnessScore >= 80 ?
                    language === 'ar' ?
                    'أعلى من المتوسط' :
                    'Above Average' :
                    results.fitnessScore >= 60 ?
                    language === 'ar' ?
                    'متوسط' :
                    'Average' :
                    language === 'ar' ?
                    'أقل من المتوسط' :
                    'Below Average'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {language === 'ar' ?
                    'مقارنة باللياقة' :
                    'Fitness comparison'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Age-based conditions */}
            {ageData &&
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-red-500" />
                    <h4 className="font-bold">
                      {language === 'ar' ?
                  'حالات شائعة لعمرك' :
                  'Common for Your Age'}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {ageData.common.map((item, i) =>
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">

                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {item}
                      </li>
                )}
                  </ul>
                </div>
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <h4 className="font-bold">
                      {language === 'ar' ? 'نصائح الوقاية' : 'Prevention Tips'}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {ageData.prevention.map((item, i) =>
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">

                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {item}
                      </li>
                )}
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Stethoscope className="w-5 h-5 text-blue-500" />
                    <h4 className="font-bold">
                      {language === 'ar' ?
                  'فحوصات موصى بها' :
                  'Recommended Checkups'}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {ageData.checkups.map((item, i) =>
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">

                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {item}
                      </li>
                )}
                  </ul>
                </div>
              </div>
          }
          </Card>

          {/* Health Check Section */}
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />
              {language === 'ar' ? 'فحص الصحة' : 'Health Check'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Overall Health Status */}
              <div
              className={`p-6 rounded-xl ${results.healthStatus === 'good' ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'}`}>

                <div className="flex items-center gap-3 mb-4">
                  {results.healthStatus === 'good' ?
                <CheckCircle className="w-8 h-8 text-emerald-500" /> :

                <AlertTriangle className="w-8 h-8 text-orange-500" />
                }
                  <div>
                    <h3 className="font-bold text-lg">
                      {language === 'ar' ?
                    'الحالة الصحية العامة' :
                    'Overall Health Status'}
                    </h3>
                    <p
                    className={`font-medium ${results.healthStatus === 'good' ? 'text-emerald-600' : 'text-orange-600'}`}>

                      {results.healthStatus === 'good' ?
                    language === 'ar' ?
                    'جيدة' :
                    'Good' :
                    language === 'ar' ?
                    'تحتاج تحسين' :
                    'Needs Improvement'}
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>BMI: {results.bmi}</span>
                    <Badge
                    className={`${getBMIStatus(results.bmi).bg} bg-opacity-20 ${getBMIStatus(results.bmi).color} border-none`}>

                      {getBMIStatus(results.bmi).label}
                    </Badge>
                  </div>
                  <ProgressBar
                  value={Math.min(results.bmi / 40 * 100, 100)}
                  color={getBMIStatus(results.bmi).bg}
                  showValue={false} />

                </div>
              </div>

              {/* Risk Indicators */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <h3 className="font-bold mb-4">
                  {language === 'ar' ? 'مؤشرات المخاطر' : 'Risk Indicators'}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span className="text-sm">
                        {language === 'ar' ? 'الدهون' : 'Fat Level'}
                      </span>
                    </div>
                    <Badge
                    variant={getRiskBadge(results.riskLevel.fat).variant}>

                      {getRiskBadge(results.riskLevel.fat).label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">
                        {language === 'ar' ? 'قلة الحركة' : 'Inactivity'}
                      </span>
                    </div>
                    <Badge
                    variant={
                    getRiskBadge(results.riskLevel.inactivity).variant
                    }>

                      {getRiskBadge(results.riskLevel.inactivity).label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-purple-500" />
                      <span className="text-sm">
                        {language === 'ar' ? 'ضعف العضلات' : 'Muscle Weakness'}
                      </span>
                    </div>
                    <Badge
                    variant={getRiskBadge(results.riskLevel.muscle).variant}>

                      {getRiskBadge(results.riskLevel.muscle).label}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                {language === 'ar' ?
              'تغير الوزن مع الوقت' :
              'Weight Trend Over Time'}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightTrendData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis
                    stroke="#6b7280"
                    domain={['dataMin - 5', 'dataMax + 5']} />

                    <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }} />

                    <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{
                      fill: '#3b82f6',
                      strokeWidth: 2
                    }} />

                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-500" />
                {language === 'ar' ? 'مقياس BMI' : 'BMI Scale'}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bmiComparisonData} layout="vertical">
                    <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    opacity={0.1} />

                    <XAxis type="number" stroke="#6b7280" domain={[0, 40]} />
                    <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#6b7280"
                    width={60} />

                    <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }} />

                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                      {bmiComparisonData.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    )}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div
                className={`w-3 h-3 rounded-full ${getBMIStatus(results.bmi).bg}`} />

                <span className="text-sm">
                  {language === 'ar' ? 'موقعك:' : 'Your position:'}{' '}
                  <strong>{results.bmi}</strong> (
                  {getBMIStatus(results.bmi).label})
                </span>
              </div>
            </Card>
          </div>

          {/* Recommendations Section */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/10 dark:to-emerald-900/10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              {language === 'ar' ? 'التوصيات' : 'Recommendations'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Exercise Recommendations */}
              <div className="bg-white dark:bg-gray-900/50 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Dumbbell className="w-5 h-5 text-blue-500" />
                  <h3 className="font-bold">
                    {language === 'ar' ?
                  'تمارين مخصصة' :
                  'Personalized Exercises'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {results.riskLevel.fat !== 'low' &&
                <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>
                        {language === 'ar' ?
                    'تمارين كارديو 30 دقيقة يومياً' :
                    '30 minutes of cardio daily'}
                      </span>
                    </li>
                }
                  {results.riskLevel.muscle !== 'low' &&
                <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                      <span>
                        {language === 'ar' ?
                    'تمارين مقاومة 3 مرات أسبوعياً' :
                    'Resistance training 3x per week'}
                      </span>
                    </li>
                }
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>
                      {language === 'ar' ?
                    'المشي 10,000 خطوة يومياً' :
                    'Walk 10,000 steps daily'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>
                      {language === 'ar' ?
                    'تمارين إطالة صباحية' :
                    'Morning stretching routine'}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Nutrition Recommendations */}
              <div className="bg-white dark:bg-gray-900/50 p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-4">
                  <Apple className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold">
                    {language === 'ar' ? 'نصائح غذائية' : 'Nutrition Tips'}
                  </h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>
                      {language === 'ar' ?
                    `السعرات اليومية المقترحة: ${Math.round(results.bmr * 1.5)} سعرة` :
                    `Suggested daily calories: ${Math.round(results.bmr * 1.5)} kcal`}
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>
                      {language === 'ar' ?
                    'شرب 8 أكواب ماء يومياً' :
                    'Drink 8 glasses of water daily'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>
                      {language === 'ar' ?
                    'تناول البروتين مع كل وجبة' :
                    'Include protein in every meal'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5" />
                    <span>
                      {language === 'ar' ?
                    'تقليل السكريات المصنعة' :
                    'Reduce processed sugars'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      }

      {/* Print Report Modal */}
      <PrintReport
        isOpen={showPrintPreview}
        onClose={() => setShowPrintPreview(false)}
        reportTitle={
        language === 'ar' ?
        'تقرير التحليل الصحي الشخصي' :
        'Personal Health Analysis Report'
        }
        sections={getPrintSections()}
        recommendations={getPrintRecommendations()}
        language={language} />

    </div>);

}