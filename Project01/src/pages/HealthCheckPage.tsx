import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { CircularProgress, ProgressBar } from '../components/ui/ProgressBar';
import { useLanguage } from '../contexts/LanguageContext';
import { Activity, Heart, Scale, Ruler, User } from 'lucide-react';
export function HealthCheckPage() {
  const { t } = useLanguage();
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    weight: '',
    gender: 'male'
  });
  const handleCalculate = () => {
    setIsCalculating(true);
    // Simulate calculation delay
    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);
    }, 2000);
  };
  // Mock results
  const results = {
    score: 85,
    bmi: 22.4,
    heartRate: 72,
    bloodPressure: 120,
    bloodSugar: 95
  };
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          {t('healthCheck.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('healthCheck.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card className="p-6 h-fit">
          <div className="space-y-6">
            <Input
              label={t('healthCheck.age')}
              type="number"
              icon={<User className="h-4 w-4" />}
              value={formData.age}
              onChange={(e) =>
              setFormData({
                ...formData,
                age: e.target.value
              })
              } />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('healthCheck.height')}
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
                label={t('healthCheck.weight')}
                type="number"
                icon={<Scale className="h-4 w-4" />}
                value={formData.weight}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  weight: e.target.value
                })
                } />

            </div>
            <Select
              label={t('healthCheck.gender')}
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

            <Button
              className="w-full mt-4"
              size="lg"
              onClick={handleCalculate}
              isLoading={isCalculating}>

              {t('healthCheck.calculate')}
            </Button>
          </div>
        </Card>

        {/* Results Display */}
        <div className="space-y-6">
          {showResults ?
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
              <Card className="p-8 flex flex-col items-center justify-center bg-gradient-to-b from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/20">
                <CircularProgress
                value={results.score}
                size={200}
                strokeWidth={15}
                label={t('healthCheck.score')}
                sublabel="Excellent"
                color="#10b981" />

              </Card>

              <Card className="p-6 space-y-6">
                <h3 className="font-bold text-lg mb-4">
                  {t('healthCheck.results')}
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('healthCheck.bmi')}</span>
                    <span className="font-bold">{results.bmi}</span>
                  </div>
                  <ProgressBar
                  value={65}
                  color="bg-blue-500"
                  showValue={false} />

                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('healthCheck.heartRate')}</span>
                    <span className="font-bold">{results.heartRate} bpm</span>
                  </div>
                  <ProgressBar
                  value={72}
                  color="bg-red-500"
                  showValue={false} />

                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('healthCheck.bloodPressure')}</span>
                    <span className="font-bold">
                      {results.bloodPressure}/80
                    </span>
                  </div>
                  <ProgressBar
                  value={80}
                  color="bg-purple-500"
                  showValue={false} />

                </div>
              </Card>
            </div> :

          <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
              <div className="text-center text-gray-500">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Enter your details to see your health analysis</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>);

}