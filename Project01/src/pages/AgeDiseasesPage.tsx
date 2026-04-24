import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { useLanguage } from '../contexts/LanguageContext';
import { User, Calendar, ShieldCheck, Stethoscope } from 'lucide-react';
export function AgeDiseasesPage() {
  const { t, language } = useLanguage();
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [analyzed, setAnalyzed] = useState(false);
  const handleAnalyze = () => {
    if (age) setAnalyzed(true);
  };
  // Mock data generation based on age
  const getAgeData = (ageVal: number) => {
    if (ageVal < 12)
    return {
      common: ['Chickenpox', 'Asthma', 'Ear Infections'],
      prevention: ['Vaccination schedule', 'Hand hygiene', 'Balanced diet'],
      checkups: ['Growth monitoring', 'Vision test', 'Dental checkup']
    };
    if (ageVal < 30)
    return {
      common: ['Acne', 'Migraine', 'Anxiety'],
      prevention: ['Stress management', 'Regular exercise', 'Safe habits'],
      checkups: ['Blood pressure', 'Skin check', 'Mental health screening']
    };
    if (ageVal < 50)
    return {
      common: ['Hypertension', 'Back Pain', 'Diabetes Type 2'],
      prevention: ['Weight control', 'Cardio exercise', 'Low salt diet'],
      checkups: ['Cholesterol', 'Diabetes screening', 'Cancer screening']
    };
    return {
      common: ['Arthritis', 'Heart Disease', 'Osteoporosis'],
      prevention: ['Fall prevention', 'Bone health', 'Heart healthy diet'],
      checkups: ['Bone density', 'Cardiac stress test', 'Hearing test']
    };
  };
  const data = age ? getAgeData(parseInt(age)) : null;
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          {t('ageAnalysis.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('ageAnalysis.subtitle')}
        </p>
      </div>

      <Card className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <Input
            label={t('healthCheck.age')}
            type="number"
            icon={<Calendar className="h-4 w-4" />}
            value={age}
            onChange={(e) => setAge(e.target.value)} />

          <Select
            label={t('healthCheck.gender')}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
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

          <Button onClick={handleAnalyze} className="w-full">
            {t('ageAnalysis.analyze')}
          </Button>
        </div>
      </Card>

      {analyzed && data &&
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-700">
          <Card className="p-6 border-t-4 border-t-red-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                <User className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">
                {t('ageAnalysis.commonForAge')}
              </h3>
            </div>
            <ul className="space-y-3">
              {data.common.map((item, i) =>
            <li
              key={i}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300">

                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {item}
                </li>
            )}
            </ul>
          </Card>

          <Card className="p-6 border-t-4 border-t-emerald-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">
                {t('ageAnalysis.preventionTips')}
              </h3>
            </div>
            <ul className="space-y-3">
              {data.prevention.map((item, i) =>
            <li
              key={i}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300">

                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {item}
                </li>
            )}
            </ul>
          </Card>

          <Card className="p-6 border-t-4 border-t-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                <Stethoscope className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg">{t('ageAnalysis.checkups')}</h3>
            </div>
            <ul className="space-y-3">
              {data.checkups.map((item, i) =>
            <li
              key={i}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300">

                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {item}
                </li>
            )}
            </ul>
          </Card>
        </div>
      }
    </div>);

}