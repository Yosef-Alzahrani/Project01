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
  Dumbbell,
  Flame,
  Timer,
  Calendar,
  Target,
  TrendingUp,
  Info,
  HeartPulse,
  Zap,
  Printer } from
'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid } from
'recharts';
import { BodyModel } from '../components/ui/BodyModel';
import { PrintReport } from '../components/ui/PrintReport';
interface MuscleExercise {
  id: string;
  nameEn: string;
  nameAr: string;
  muscle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  location: 'home' | 'gym' | 'both';
  duration: number;
  calories: number;
  descriptionEn: string;
  descriptionAr: string;
  equipment: string[];
}
export function BodyAnalysisPage() {
  const { t, language } = useLanguage();
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'cardio' | 'strength' | 'fatBurn'>(
    'cardio'
  );
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [exerciseFilter, setExerciseFilter] = useState({
    difficulty: 'all',
    location: 'all'
  });
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    height: '',
    weight: '',
    goal: 'loseWeight'
  });
  const [metrics, setMetrics] = useState({
    bmi: 0,
    bmr: 0,
    bodyFat: 0,
    muscleMass: 0,
    idealWeightMin: 0,
    idealWeightMax: 0
  });
  const muscleExercises: MuscleExercise[] = [
  {
    id: '1',
    nameEn: 'Push Ups',
    nameAr: 'تمرين الضغط',
    muscle: 'chest',
    difficulty: 'beginner',
    location: 'home',
    duration: 10,
    calories: 100,
    descriptionEn: 'Classic chest exercise',
    descriptionAr: 'تمرين صدر كلاسيكي',
    equipment: ['None']
  },
  {
    id: '2',
    nameEn: 'Bench Press',
    nameAr: 'ضغط الصدر',
    muscle: 'chest',
    difficulty: 'intermediate',
    location: 'gym',
    duration: 15,
    calories: 150,
    descriptionEn: 'Barbell chest press',
    descriptionAr: 'ضغط الصدر بالبار',
    equipment: ['Barbell', 'Bench']
  },
  {
    id: '3',
    nameEn: 'Dumbbell Flys',
    nameAr: 'تفتيح بالدمبل',
    muscle: 'chest',
    difficulty: 'intermediate',
    location: 'both',
    duration: 12,
    calories: 120,
    descriptionEn: 'Isolates chest muscles',
    descriptionAr: 'يعزل عضلات الصدر',
    equipment: ['Dumbbells']
  },
  {
    id: '4',
    nameEn: 'Overhead Press',
    nameAr: 'ضغط الكتف',
    muscle: 'shoulders',
    difficulty: 'intermediate',
    location: 'both',
    duration: 12,
    calories: 130,
    descriptionEn: 'Shoulder press',
    descriptionAr: 'ضغط الأكتاف',
    equipment: ['Dumbbells']
  },
  {
    id: '5',
    nameEn: 'Lateral Raises',
    nameAr: 'رفرفة جانبي',
    muscle: 'shoulders',
    difficulty: 'beginner',
    location: 'both',
    duration: 10,
    calories: 80,
    descriptionEn: 'Side shoulder raise',
    descriptionAr: 'رفع جانبي للأكتاف',
    equipment: ['Dumbbells']
  },
  {
    id: '6',
    nameEn: 'Bicep Curls',
    nameAr: 'تمرين البايسبس',
    muscle: 'arms',
    difficulty: 'beginner',
    location: 'both',
    duration: 10,
    calories: 90,
    descriptionEn: 'Arm curl',
    descriptionAr: 'ثني الذراعين',
    equipment: ['Dumbbells']
  },
  {
    id: '7',
    nameEn: 'Tricep Dips',
    nameAr: 'تمرين الترايسبس',
    muscle: 'arms',
    difficulty: 'intermediate',
    location: 'home',
    duration: 10,
    calories: 100,
    descriptionEn: 'Chair dips',
    descriptionAr: 'غمس الكرسي',
    equipment: ['Chair']
  },
  {
    id: '8',
    nameEn: 'Crunches',
    nameAr: 'تمرين البطن',
    muscle: 'abs',
    difficulty: 'beginner',
    location: 'home',
    duration: 10,
    calories: 80,
    descriptionEn: 'Abdominal crunch',
    descriptionAr: 'تمرين البطن',
    equipment: ['Mat']
  },
  {
    id: '9',
    nameEn: 'Plank',
    nameAr: 'تمرين البلانك',
    muscle: 'abs',
    difficulty: 'intermediate',
    location: 'home',
    duration: 5,
    calories: 50,
    descriptionEn: 'Core stability',
    descriptionAr: 'ثبات الجذع',
    equipment: ['Mat']
  },
  {
    id: '10',
    nameEn: 'Pull Ups',
    nameAr: 'تمرين العقلة',
    muscle: 'back',
    difficulty: 'advanced',
    location: 'both',
    duration: 10,
    calories: 120,
    descriptionEn: 'Back pull up',
    descriptionAr: 'سحب الظهر',
    equipment: ['Bar']
  },
  {
    id: '11',
    nameEn: 'Squats',
    nameAr: 'سكوات',
    muscle: 'thighs',
    difficulty: 'beginner',
    location: 'home',
    duration: 15,
    calories: 150,
    descriptionEn: 'Leg squat',
    descriptionAr: 'قرفصاء',
    equipment: ['None']
  },
  {
    id: '12',
    nameEn: 'Lunges',
    nameAr: 'الطعن',
    muscle: 'thighs',
    difficulty: 'intermediate',
    location: 'home',
    duration: 12,
    calories: 130,
    descriptionEn: 'Leg lunge',
    descriptionAr: 'طعن الساق',
    equipment: ['None']
  },
  {
    id: '13',
    nameEn: 'Calf Raises',
    nameAr: 'رفع الساق',
    muscle: 'calves',
    difficulty: 'beginner',
    location: 'home',
    duration: 8,
    calories: 60,
    descriptionEn: 'Calf lift',
    descriptionAr: 'رفع السمانة',
    equipment: ['None']
  },
  {
    id: '14',
    nameEn: 'Glute Bridges',
    nameAr: 'جسر المؤخرة',
    muscle: 'glutes',
    difficulty: 'beginner',
    location: 'home',
    duration: 10,
    calories: 90,
    descriptionEn: 'Hip lift',
    descriptionAr: 'رفع الورك',
    equipment: ['Mat']
  }];

  const filteredExercises = muscleExercises.filter((ex) => {
    if (selectedMuscle && ex.muscle !== selectedMuscle) return false;
    if (
    exerciseFilter.difficulty !== 'all' &&
    ex.difficulty !== exerciseFilter.difficulty)

    return false;
    if (
    exerciseFilter.location !== 'all' &&
    ex.location !== 'both' &&
    ex.location !== exerciseFilter.location)

    return false;
    return true;
  });
  const handleCalculate = () => {
    if (!formData.age || !formData.height || !formData.weight) return;
    setIsCalculating(true);
    // Simulate calculation delay
    setTimeout(() => {
      const weight = parseFloat(formData.weight);
      const height = parseFloat(formData.height);
      const age = parseFloat(formData.age);
      const isMale = formData.gender === 'male';
      // BMI Calculation
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      // BMR Calculation (Mifflin-St Jeor Equation)
      let bmr = 0;
      if (isMale) {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      // Body Fat % (US Navy Method approximation based on BMI for demo)
      // Body Fat % = (1.20 × BMI) + (0.23 × Age) - (10.8 × sex) - 5.4
      const sexFactor = isMale ? 1 : 0;
      const bodyFat = 1.2 * bmi + 0.23 * age - 10.8 * sexFactor - 5.4;
      // Muscle Mass Estimation (Rough estimate)
      const muscleMass = weight * (1 - bodyFat / 100) * 0.9; // 0.9 factor for bone/water exclusion
      // Ideal Weight Range (BMI 18.5 - 24.9)
      const idealMin = 18.5 * (heightInMeters * heightInMeters);
      const idealMax = 24.9 * (heightInMeters * heightInMeters);
      setMetrics({
        bmi: parseFloat(bmi.toFixed(1)),
        bmr: Math.round(bmr),
        bodyFat: parseFloat(bodyFat.toFixed(1)),
        muscleMass: parseFloat(muscleMass.toFixed(1)),
        idealWeightMin: parseFloat(idealMin.toFixed(1)),
        idealWeightMax: parseFloat(idealMax.toFixed(1))
      });
      setIsCalculating(false);
      setShowResults(true);
    }, 1500);
  };
  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5)
    return {
      label: t('bodyAnalysis.metrics.status.underweight'),
      color: 'text-blue-500',
      bg: 'bg-blue-500'
    };
    if (bmi < 25)
    return {
      label: t('bodyAnalysis.metrics.status.normal'),
      color: 'text-emerald-500',
      bg: 'bg-emerald-500'
    };
    if (bmi < 30)
    return {
      label: t('bodyAnalysis.metrics.status.overweight'),
      color: 'text-orange-500',
      bg: 'bg-orange-500'
    };
    return {
      label: t('bodyAnalysis.metrics.status.obese'),
      color: 'text-red-500',
      bg: 'bg-red-500'
    };
  };
  const getFatStatus = (fat: number, gender: string) => {
    const isMale = gender === 'male';
    // Simple ranges
    if (isMale) {
      if (fat < 6)
      return {
        label: t('bodyAnalysis.metrics.status.low'),
        color: 'text-blue-500'
      };
      if (fat < 24)
      return {
        label: t('bodyAnalysis.metrics.status.healthy'),
        color: 'text-emerald-500'
      };
      return {
        label: t('bodyAnalysis.metrics.status.high'),
        color: 'text-red-500'
      };
    } else {
      if (fat < 16)
      return {
        label: t('bodyAnalysis.metrics.status.low'),
        color: 'text-blue-500'
      };
      if (fat < 30)
      return {
        label: t('bodyAnalysis.metrics.status.healthy'),
        color: 'text-emerald-500'
      };
      return {
        label: t('bodyAnalysis.metrics.status.high'),
        color: 'text-red-500'
      };
    }
  };
  // Chart Data
  const compositionData = [
  {
    name: t('bodyAnalysis.charts.fat'),
    value: metrics.bodyFat,
    color: '#f97316'
  },
  {
    name: t('bodyAnalysis.charts.muscle'),
    value: metrics.muscleMass / parseFloat(formData.weight || '1') * 100,
    color: '#3b82f6'
  },
  {
    name: t('bodyAnalysis.charts.bone'),
    value: 4,
    color: '#94a3b8'
  },
  {
    name: t('bodyAnalysis.charts.water'),
    value:
    100 -
    metrics.bodyFat -
    metrics.muscleMass / parseFloat(formData.weight || '1') * 100 -
    4,
    color: '#10b981'
  }];

  const calorieData = [
  {
    name: 'BMR',
    calories: metrics.bmr
  },
  {
    name: 'Activity',
    calories: Math.round(metrics.bmr * 0.5)
  },
  {
    name: 'Total',
    calories: Math.round(metrics.bmr * 1.5)
  }];

  // Exercises Data
  const exercises = {
    cardio: [
    {
      name: 'HIIT Sprint',
      duration: 20,
      calories: 300,
      difficulty: 5,
      equipment: 'None'
    },
    {
      name: 'Jump Rope',
      duration: 15,
      calories: 200,
      difficulty: 4,
      equipment: 'Rope'
    },
    {
      name: 'Cycling',
      duration: 45,
      calories: 400,
      difficulty: 3,
      equipment: 'Bike'
    }],

    strength: [
    {
      name: 'Push-ups',
      duration: 10,
      calories: 100,
      difficulty: 3,
      equipment: 'None'
    },
    {
      name: 'Squats',
      duration: 15,
      calories: 150,
      difficulty: 3,
      equipment: 'None'
    },
    {
      name: 'Deadlifts',
      duration: 30,
      calories: 250,
      difficulty: 5,
      equipment: 'Barbell'
    }],

    fatBurn: [
    {
      name: 'Burpees',
      duration: 10,
      calories: 150,
      difficulty: 5,
      equipment: 'None'
    },
    {
      name: 'Mountain Climbers',
      duration: 10,
      calories: 120,
      difficulty: 4,
      equipment: 'None'
    },
    {
      name: 'Plank',
      duration: 5,
      calories: 50,
      difficulty: 3,
      equipment: 'None'
    }]

  };
  const weekSchedule = [
  {
    day: 'Sun',
    type: 'Cardio',
    icon: HeartPulse,
    color: 'text-red-500 bg-red-100 dark:bg-red-900/20'
  },
  {
    day: 'Mon',
    type: 'Strength',
    icon: Dumbbell,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
  },
  {
    day: 'Tue',
    type: 'Fat Burn',
    icon: Flame,
    color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/20'
  },
  {
    day: 'Wed',
    type: 'Rest',
    icon: Zap,
    color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/20'
  },
  {
    day: 'Thu',
    type: 'Strength',
    icon: Dumbbell,
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20'
  },
  {
    day: 'Fri',
    type: 'Cardio',
    icon: HeartPulse,
    color: 'text-red-500 bg-red-100 dark:bg-red-900/20'
  },
  {
    day: 'Sat',
    type: 'Active Rest',
    icon: Activity,
    color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/20'
  }];

  // Prepare print report data
  const getPrintSections = () => {
    const goalLabels: Record<
      string,
      {
        en: string;
        ar: string;
      }> =
    {
      loseWeight: {
        en: 'Lose Weight',
        ar: 'إنقاص الوزن'
      },
      buildMuscle: {
        en: 'Build Muscle',
        ar: 'بناء العضلات'
      },
      maintain: {
        en: 'Maintain Weight',
        ar: 'المحافظة على الوزن'
      },
      improveFitness: {
        en: 'Improve Fitness',
        ar: 'تحسين اللياقة'
      }
    };
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
      },
      {
        label: language === 'ar' ? 'الهدف' : 'Goal',
        value: goalLabels[formData.goal]?.[language] || formData.goal
      }]

    },
    {
      title:
      language === 'ar' ? 'ملخص تركيب الجسم' : 'Body Composition Summary',
      items: [
      {
        label: 'BMI',
        value: `${metrics.bmi} (${getBMIStatus(metrics.bmi).label})`,
        highlight: metrics.bmi >= 18.5 && metrics.bmi < 25
      },
      {
        label: 'BMR',
        value: `${metrics.bmr} ${language === 'ar' ? 'سعرة/يوم' : 'kcal/day'}`
      },
      {
        label: language === 'ar' ? 'نسبة الدهون' : 'Body Fat',
        value: `${metrics.bodyFat}%`
      },
      {
        label: language === 'ar' ? 'الكتلة العضلية' : 'Muscle Mass',
        value: `${metrics.muscleMass} kg`
      },
      {
        label: language === 'ar' ? 'الوزن المثالي' : 'Ideal Weight',
        value: `${metrics.idealWeightMin} - ${metrics.idealWeightMax} kg`
      }]

    },
    {
      title: language === 'ar' ? 'الجدول الأسبوعي' : 'Weekly Schedule',
      items: weekSchedule.map((day) => ({
        label: day.day,
        value: day.type
      }))
    }];

    // Add selected muscle exercises if any
    if (selectedMuscle) {
      const muscleExercisesList = filteredExercises.slice(0, 5);
      if (muscleExercisesList.length > 0) {
        sections.push({
          title:
          language === 'ar' ?
          `تمارين ${t(`bodyAnalysis.bodyModel.muscles.${selectedMuscle}`)}` :
          `${selectedMuscle.charAt(0).toUpperCase() + selectedMuscle.slice(1)} Exercises`,
          items: muscleExercisesList.map((ex) => ({
            label: language === 'ar' ? ex.nameAr : ex.nameEn,
            value: `${ex.duration} ${language === 'ar' ? 'دقيقة' : 'min'} • ${ex.calories} ${language === 'ar' ? 'سعرة' : 'kcal'}`
          }))
        });
      }
    }
    return sections;
  };
  const getPrintRecommendations = () => {
    const recs = [];
    if (metrics.bodyFat > 25) {
      recs.push(
        language === 'ar' ?
        'التركيز على تمارين حرق الدهون (HIIT والكارديو)' :
        'Focus on fat burning exercises (HIIT and cardio)'
      );
    }
    if (metrics.muscleMass < parseFloat(formData.weight) * 0.4) {
      recs.push(
        language === 'ar' ?
        'زيادة تمارين القوة والمقاومة' :
        'Increase strength and resistance training'
      );
    }
    recs.push(
      language === 'ar' ?
      'الحفاظ على 150 دقيقة نشاط معتدل أسبوعياً' :
      'Maintain 150 minutes of moderate activity weekly'
    );
    recs.push(
      language === 'ar' ?
      'الالتزام بالجدول الأسبوعي لمدة 4 أسابيع على الأقل' :
      'Stick to the weekly schedule for at least 4 weeks'
    );
    recs.push(
      language === 'ar' ?
      `السعرات اليومية المقترحة: ${Math.round(metrics.bmr * 1.5)} سعرة` :
      `Suggested daily calories: ${Math.round(metrics.bmr * 1.5)} kcal`
    );
    return recs;
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="text-center py-8">
        <div className="flex justify-center items-center gap-4 mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
            {t('bodyAnalysis.title')}
          </h1>
          {showResults &&
          <Button
            onClick={() => setShowPrintPreview(true)}
            variant="outline"
            size="sm"
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">

              <Printer className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'طباعة ملخص' : 'Print Summary'}
            </Button>
          }
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('bodyAnalysis.subtitle')}
        </p>
      </div>

      {/* Input Form */}
      <Card className="max-w-4xl mx-auto p-8 border-t-4 border-t-emerald-500">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Input
            label={t('bodyAnalysis.form.age')}
            type="number"
            icon={<Calendar className="h-4 w-4" />}
            value={formData.age}
            onChange={(e) =>
            setFormData({
              ...formData,
              age: e.target.value
            })
            } />

          <Select
            label={t('bodyAnalysis.form.gender')}
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
              label: t('healthCheck.male')
            },
            {
              value: 'female',
              label: t('healthCheck.female')
            }]
            } />

          <Input
            label={t('bodyAnalysis.form.height')}
            type="number"
            icon={<Ruler className="h-4 w-4" />}
            value={formData.height}
            onChange={(e) =>
            setFormData({
              ...formData,
              height: e.target.value
            })
            } />

          <Input
            label={t('bodyAnalysis.form.weight')}
            type="number"
            icon={<Scale className="h-4 w-4" />}
            value={formData.weight}
            onChange={(e) =>
            setFormData({
              ...formData,
              weight: e.target.value
            })
            } />

          <Select
            label={t('bodyAnalysis.form.goal')}
            value={formData.goal}
            onChange={(e) =>
            setFormData({
              ...formData,
              goal: e.target.value
            })
            }
            options={[
            {
              value: 'loseWeight',
              label: t('bodyAnalysis.form.goals.loseWeight')
            },
            {
              value: 'buildMuscle',
              label: t('bodyAnalysis.form.goals.buildMuscle')
            },
            {
              value: 'maintain',
              label: t('bodyAnalysis.form.goals.maintain')
            },
            {
              value: 'improveFitness',
              label: t('bodyAnalysis.form.goals.improveFitness')
            }]
            } />

          <div className="flex items-end">
            <Button
              className="w-full h-11"
              onClick={handleCalculate}
              isLoading={isCalculating}>

              {t('bodyAnalysis.form.calculate')}
            </Button>
          </div>
        </div>
      </Card>

      {showResults &&
      <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Weight Card */}
            <Card className="p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Scale className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-700 dark:text-gray-300">
                  {t('bodyAnalysis.metrics.weight')}
                </h3>
              </div>
              <div className="text-3xl font-bold mb-2">
                {formData.weight}{' '}
                <span className="text-sm text-gray-500 font-normal">kg</span>
              </div>
              <div className="text-sm text-gray-500">
                Ideal: {metrics.idealWeightMin} - {metrics.idealWeightMax} kg
              </div>
              <div className="mt-4 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-3/4"></div>
              </div>
            </Card>

            {/* BMI Card */}
            <Card className="p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div
                className={`p-2 rounded-lg ${getBMIStatus(metrics.bmi).bg} bg-opacity-20 ${getBMIStatus(metrics.bmi).color}`}>

                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-700 dark:text-gray-300">
                  {t('bodyAnalysis.metrics.bmi')}
                </h3>
              </div>
              <div className="text-3xl font-bold mb-2">{metrics.bmi}</div>
              <Badge
              className={`${getBMIStatus(metrics.bmi).bg} bg-opacity-20 ${getBMIStatus(metrics.bmi).color} border-none`}>

                {getBMIStatus(metrics.bmi).label}
              </Badge>
            </Card>

            {/* Body Fat Card */}
            <Card className="p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Flame className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-700 dark:text-gray-300">
                  {t('bodyAnalysis.metrics.bodyFat')}
                </h3>
              </div>
              <div className="text-3xl font-bold mb-2">{metrics.bodyFat}%</div>
              <div
              className={`text-sm font-medium ${getFatStatus(metrics.bodyFat, formData.gender).color}`}>

                {getFatStatus(metrics.bodyFat, formData.gender).label}
              </div>
              <div className="mt-4">
                <ProgressBar
                value={metrics.bodyFat}
                max={50}
                color="bg-orange-500"
                showValue={false} />

              </div>
            </Card>

            {/* Muscle Mass Card */}
            <Card className="p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Dumbbell className="w-24 h-24" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-700 dark:text-gray-300">
                  {t('bodyAnalysis.metrics.muscleMass')}
                </h3>
              </div>
              <div className="text-3xl font-bold mb-2">
                {metrics.muscleMass}{' '}
                <span className="text-sm text-gray-500 font-normal">kg</span>
              </div>
              <div className="text-sm text-gray-500">
                {(
              metrics.muscleMass / parseFloat(formData.weight) *
              100).
              toFixed(1)}
                % of total weight
              </div>
              <div className="mt-4">
                <ProgressBar
                value={
                metrics.muscleMass / parseFloat(formData.weight) * 100
                }
                max={60}
                color="bg-emerald-500"
                showValue={false} />

              </div>
            </Card>
          </div>

          {/* Charts & Explanations */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-6 lg:col-span-1">
              <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                {t('bodyAnalysis.charts.composition')}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                    data={compositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value">

                      {compositionData.map((entry, index) =>
                    <Cell key={`cell-${index}`} fill={entry.color} />
                    )}
                    </Pie>
                    <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }} />

                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {compositionData.map((item, index) =>
              <div key={index} className="flex items-center gap-2 text-sm">
                    <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: item.color
                  }}>
                </div>
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.name}: {item.value.toFixed(1)}%
                    </span>
                  </div>
              )}
              </div>
            </Card>

            <Card className="p-6 lg:col-span-2">
              <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-500" />
                {t('bodyAnalysis.charts.calories')}
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calorieData} layout="vertical">
                    <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    opacity={0.1} />

                    <XAxis type="number" stroke="#6b7280" />
                    <YAxis
                    dataKey="name"
                    type="category"
                    stroke="#6b7280"
                    width={80} />

                    <RechartsTooltip
                    cursor={{
                      fill: 'transparent'
                    }}
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff'
                    }} />

                    <Bar
                    dataKey="calories"
                    fill="#10b981"
                    radius={[0, 4, 4, 0]}
                    barSize={30} />

                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Your BMR (Basal Metabolic Rate) is{' '}
                  <strong>{metrics.bmr} kcal/day</strong>. This is what your
                  body burns at rest. To maintain your current weight with
                  moderate activity, you need approximately{' '}
                  <strong>{Math.round(metrics.bmr * 1.5)} kcal/day</strong>.
                </p>
              </div>
            </Card>
          </div>

          {/* Interactive Muscle Map Section */}
          <Card className="p-6 overflow-hidden">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-2">
                <User className="w-6 h-6 text-emerald-500" />
                {t('bodyAnalysis.bodyModel.title')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                {t('bodyAnalysis.bodyModel.subtitle')}
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Body Model */}
              <div className="lg:w-1/3 flex justify-center border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 pb-8 lg:pb-0 lg:pr-8">
                <BodyModel
                selectedMuscle={selectedMuscle}
                onMuscleSelect={setSelectedMuscle} />

              </div>

              {/* Exercises Panel */}
              <div className="lg:w-2/3 space-y-6">
                {/* Filters */}
                <div className="flex flex-wrap gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                  <div className="w-full sm:w-auto flex-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      {t('bodyAnalysis.bodyModel.filters.difficulty')}
                    </label>
                    <Select
                    options={[
                    {
                      value: 'all',
                      label: t('bodyAnalysis.bodyModel.filters.both')
                    },
                    {
                      value: 'beginner',
                      label: t('bodyAnalysis.bodyModel.filters.beginner')
                    },
                    {
                      value: 'intermediate',
                      label: t(
                        'bodyAnalysis.bodyModel.filters.intermediate'
                      )
                    },
                    {
                      value: 'advanced',
                      label: t('bodyAnalysis.bodyModel.filters.advanced')
                    }]
                    }
                    value={exerciseFilter.difficulty}
                    onChange={(e) =>
                    setExerciseFilter({
                      ...exerciseFilter,
                      difficulty: e.target.value
                    })
                    } />

                  </div>
                  <div className="w-full sm:w-auto flex-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                      {t('bodyAnalysis.bodyModel.filters.location')}
                    </label>
                    <Select
                    options={[
                    {
                      value: 'all',
                      label: t('bodyAnalysis.bodyModel.filters.both')
                    },
                    {
                      value: 'home',
                      label: t('bodyAnalysis.bodyModel.filters.home')
                    },
                    {
                      value: 'gym',
                      label: t('bodyAnalysis.bodyModel.filters.gym')
                    }]
                    }
                    value={exerciseFilter.location}
                    onChange={(e) =>
                    setExerciseFilter({
                      ...exerciseFilter,
                      location: e.target.value
                    })
                    } />

                  </div>
                </div>

                {/* Exercises List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {selectedMuscle ?
                filteredExercises.length > 0 ?
                filteredExercises.map((ex) =>
                <div
                  key={ex.id}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors bg-white dark:bg-gray-900">

                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-gray-900 dark:text-white">
                              {language === 'en' ? ex.nameEn : ex.nameAr}
                            </h4>
                            <Badge
                      variant={
                      ex.difficulty === 'beginner' ?
                      'common' :
                      ex.difficulty === 'intermediate' ?
                      'seasonal' :
                      'dangerous'
                      }>

                              {t(
                        `bodyAnalysis.bodyModel.filters.${ex.difficulty}`
                      )}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                            {language === 'en' ?
                    ex.descriptionEn :
                    ex.descriptionAr}
                          </p>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300">
                            <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              <Timer className="w-3 h-3" /> {ex.duration} min
                            </span>
                            <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              <Flame className="w-3 h-3" /> {ex.calories} kcal
                            </span>
                            <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                              <Dumbbell className="w-3 h-3" />{' '}
                              {ex.equipment.join(', ')}
                            </span>
                          </div>
                        </div>
                ) :

                <div className="col-span-full text-center py-8 text-gray-500">
                        No exercises found for these filters.
                      </div> :


                <div className="col-span-full text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
                      <User className="w-12 h-12 mx-auto mb-2 opacity-20" />
                      <p>{t('bodyAnalysis.bodyModel.subtitle')}</p>
                    </div>
                }
                </div>
              </div>
            </div>
          </Card>

          {/* Exercise Plan */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Dumbbell className="w-6 h-6 text-emerald-500" />
                {t('bodyAnalysis.exercises.title')}
              </h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {(['cardio', 'strength', 'fatBurn'] as const).map((tab) =>
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                    px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap
                    ${activeTab === tab ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}
                  `}>

                  {t(`bodyAnalysis.exercises.${tab}`)}
                </button>
            )}
            </div>

            {/* Exercise Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exercises[activeTab].map((exercise, index) =>
            <Card
              key={index}
              className="p-6 border-l-4 border-l-emerald-500 hover:shadow-lg transition-shadow">

                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg">{exercise.name}</h3>
                    <Badge variant="default">{exercise.equipment}</Badge>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-blue-500" />
                      <span>
                        {exercise.duration} {t('bodyAnalysis.exercises.min')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>
                        {exercise.calories} {t('bodyAnalysis.exercises.kcal')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-red-500" />
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) =>
                    <div
                      key={i}
                      className={`w-1.5 h-3 rounded-sm ${i < exercise.difficulty ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'}`} />

                    )}
                      </div>
                    </div>
                  </div>
                </Card>
            )}
            </div>
          </div>

          {/* Weekly Schedule */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              {t('bodyAnalysis.schedule.title')}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {weekSchedule.map((day, index) =>
            <div key={index} className="flex flex-col gap-2">
                  <div className="text-center font-bold text-gray-500 text-sm uppercase">
                    {day.day}
                  </div>
                  <div
                className={`
                    p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center h-32 transition-transform hover:scale-105
                    ${day.color}
                  `}>

                    <day.icon className="w-6 h-6" />
                    <span className="font-medium text-sm">{day.type}</span>
                  </div>
                </div>
            )}
            </div>
          </Card>

          {/* Smart Recommendations */}
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 border-emerald-100 dark:border-emerald-900/30">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-500" />
              {t('bodyAnalysis.recommendations.title')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('bodyAnalysis.recommendations.basedOn')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.bodyFat > 25 &&
            <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <Flame className="w-5 h-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Focus on Fat Burn</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Your body fat percentage suggests prioritizing HIIT and
                      cardio sessions.
                    </p>
                  </div>
                </div>
            }
              {metrics.muscleMass < parseFloat(formData.weight) * 0.4 &&
            <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                  <Dumbbell className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">
                      Increase Strength Training
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Adding more compound lifts will help increase your muscle
                      mass.
                    </p>
                  </div>
                </div>
            }
              <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <HeartPulse className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Heart Health</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Maintain at least 150 minutes of moderate activity per week.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <Activity className="w-5 h-5 text-emerald-500 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm">Consistency is Key</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Stick to the weekly schedule for at least 4 weeks to see
                    results.
                  </p>
                </div>
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
        'تقرير تحليل الجسم والتمارين' :
        'Body Analysis & Exercise Report'
        }
        sections={getPrintSections()}
        recommendations={getPrintRecommendations()}
        language={language} />

    </div>);

}