import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../contexts/LanguageContext';
import {
  getDashboardAnalytics,
  DashboardAnalytics,
  CLASS_LABELS,
  CLASS_COLORS,
  InjuryClass } from
'../utils/aiService';
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle2,
  Clock,
  Database,
  Target } from
'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar } from
'recharts';
export function HomePage() {
  const { t, language } = useLanguage();
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getDashboardAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, []);
  const currentDate = new Date().toLocaleDateString(
    language === 'ar' ? 'ar-SA' : 'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );
  if (isLoading || !analytics) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) =>
          <div
            key={i}
            className="h-40 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />

          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
        </div>
      </div>);

  }
  // Transform class distribution for PieChart
  const pieData = Object.entries(analytics.classDistribution).map(
    ([key, value]) => ({
      name:
      language === 'en' ?
      CLASS_LABELS[key as InjuryClass].en :
      CLASS_LABELS[key as InjuryClass].ar,
      value,
      color: CLASS_COLORS[key as InjuryClass]
    })
  );
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-100 mb-2 text-sm font-medium">
              <Clock className="w-4 h-4" />
              {currentDate}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {t('home.welcome')}
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              {language === 'en' ?
              'Advanced AI-Powered Clinical Decision Support System' :
              'نظام دعم القرار الطبي المتقدم المدعوم بالذكاء الاصطناعي'}
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="bg-white/15 hover:bg-white/25 border-0 backdrop-blur-sm text-white">

              <Database className="w-4 h-4 mr-2" />
              {language === 'en' ? 'System Status' : 'حالة النظام'}
            </Button>
          </div>
        </div>
      </div>

      {/* AI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-t-4 border-t-blue-500 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Predictions
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.totalPredictions.toLocaleString()}
              </h3>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600">
              <Brain className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-blue-600 font-medium">
            +12% from last week
          </p>
        </Card>

        <Card className="p-6 border-t-4 border-t-emerald-500 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Avg Confidence
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {(analytics.avgConfidence * 100).toFixed(1)}%
              </h3>
            </div>
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-emerald-600 font-medium">
            High reliability
          </p>
        </Card>

        <Card className="p-6 border-t-4 border-t-red-500 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                High Risk Cases
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {analytics.highRiskPercentage.toFixed(1)}%
              </h3>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-red-600 font-medium">Requires attention</p>
        </Card>

        <Card className="p-6 border-t-4 border-t-purple-500 hover:shadow-lg transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Model Accuracy
              </p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                89.1%
              </h3>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <p className="text-xs text-purple-600 font-medium">MobileNetV2</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          {language === 'en' ? 'Quick Actions' : 'إجراءات سريعة'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/model-performance">
            <Card className="p-4 h-full hover:shadow-md transition-all duration-200 border border-transparent hover:border-violet-200 dark:hover:border-violet-800 group">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-violet-50 dark:bg-violet-900/10 text-violet-500 group-hover:scale-110 transition-transform duration-200">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {language === 'en' ? 'AI Performance' : 'أداء النموذج'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {language === 'en' ? 'View metrics' : 'عرض المقاييس'}
                  </p>
                </div>
                <ArrowRight
                  className={`w-4 h-4 ml-auto text-gray-300 group-hover:text-violet-500 transition-colors ${language === 'ar' ? 'rotate-180' : ''}`} />

              </div>
            </Card>
          </Link>
          {/* Add other quick actions here if needed, or keep existing ones */}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Predictions Trend */}
        <Card className="lg:col-span-2 p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            {language === 'en' ? 'Prediction Volume' : 'حجم التوقعات'}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.dailyPredictions}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1}
                  vertical={false} />

                <XAxis
                  dataKey="date"
                  stroke="#9ca3af"
                  tick={{
                    fontSize: 12
                  }}
                  tickLine={false}
                  axisLine={false}
                  dy={10} />

                <YAxis
                  stroke="#9ca3af"
                  tick={{
                    fontSize: 12
                  }}
                  tickLine={false}
                  axisLine={false}
                  dx={-10} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '12px',
                    color: '#fff'
                  }} />

                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCount)" />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Injury Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            {language === 'en' ? 'Injury Distribution' : 'توزيع الإصابات'}
          </h3>
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value">

                  {pieData.map((entry, index) =>
                  <Cell key={`cell-${index}`} fill={entry.color} />
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }} />

                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mb-8">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.totalPredictions}
              </span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Confidence Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-indigo-500" />
            {language === 'en' ? 'Confidence Distribution' : 'توزيع الثقة'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.confidenceDistribution}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1}
                  vertical={false} />

                <XAxis
                  dataKey="range"
                  stroke="#9ca3af"
                  tick={{
                    fontSize: 12
                  }}
                  tickLine={false}
                  axisLine={false}
                  dy={10} />

                <YAxis
                  stroke="#9ca3af"
                  tick={{
                    fontSize: 12
                  }}
                  tickLine={false}
                  axisLine={false}
                  dx={-10} />

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

                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                  barSize={40} />

              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Predictions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-gray-500" />
              {language === 'en' ? 'Recent Predictions' : 'أحدث التوقعات'}
            </h3>
          </div>
          <div className="space-y-4">
            {analytics.recentPredictions.slice(0, 5).map((pred, index) =>
            <div
              key={index}
              className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors group">

                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold text-xs">
                    AI
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {language === 'en' ?
                    CLASS_LABELS[pred.predictedClass].en :
                    CLASS_LABELS[pred.predictedClass].ar}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(pred.timestamp).toLocaleTimeString()} •{' '}
                      {(pred.confidence * 100).toFixed(0)}% Conf.
                    </p>
                  </div>
                </div>
                <Badge
                variant={
                pred.severity === 'high' ?
                'dangerous' :
                pred.severity === 'medium' ?
                'seasonal' :
                'common'
                }>

                  {pred.severity}
                </Badge>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>);

}