import React, { useEffect, useState, Fragment } from 'react';
import {
  getModelMetrics,
  ClassificationReport,
  CLASS_LABELS,
  CLASS_COLORS,
  InjuryClass } from
'../utils/aiService';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Activity,
  BarChart3,
  Brain,
  CheckCircle2,
  Database,
  GitBranch,
  Layers,
  LineChart as LineChartIcon,
  Target,
  Zap,
  AlertCircle } from
'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine } from
'recharts';
export function ModelPerformancePage() {
  const { t, language } = useLanguage();
  const [metrics, setMetrics] = useState<ClassificationReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getModelMetrics();
        setMetrics(data);
      } catch (err: any) {
        console.error('Failed to load model metrics:', err);
        setError(
          err.message ||
          'Backend not connected. Please configure API_BASE_URL in services/mlApi.ts'
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Backend Not Connected
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md">
          {error}
        </p>
      </div>);

  }
  if (isLoading || !metrics) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-12">
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) =>
          <div
            key={i}
            className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />

          )}
        </div>
        <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
      </div>);

  }
  const classes = Object.keys(CLASS_LABELS) as InjuryClass[];
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-700 dark:from-violet-900 dark:to-indigo-900 rounded-2xl p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-white/20 text-white border-none backdrop-blur-sm">
              <Brain className="w-3 h-3 mr-1" />
              Data Science
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {language === 'en' ?
            'AI Model Performance' :
            'أداء نموذج الذكاء الاصطناعي'}
          </h1>
          <p className="text-violet-100 text-lg max-w-2xl">
            {language === 'en' ?
            'Comprehensive evaluation metrics for the CNN wound classification model (3 classes).' :
            'مقاييس تقييم شاملة لنموذج تصنيف الجروح بالشبكات العصبية (3 فئات).'}
          </p>
        </div>
      </div>

      {/* Model Info Card */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Layers className="w-5 h-5 text-violet-500" />
          {language === 'en' ? 'Model Architecture' : 'هيكلية النموذج'}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase font-bold">
              Base Model
            </p>
            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
              {metrics.modelInfo.baseModel}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase font-bold">
              Input Shape
            </p>
            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
              {metrics.modelInfo.inputShape}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase font-bold">
              Total Params
            </p>
            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
              {metrics.modelInfo.totalParams.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-500 uppercase font-bold">
              Dataset Size
            </p>
            <p className="font-mono text-sm font-bold text-gray-900 dark:text-white">
              {metrics.modelInfo.datasetSize.toLocaleString()} images
            </p>
          </div>
        </div>
      </Card>

      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 border-t-4 border-t-blue-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Accuracy</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {(metrics.accuracy * 100).toFixed(1)}%
              </h3>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{
                width: `${metrics.accuracy * 100}%`
              }} />

          </div>
        </Card>

        <Card className="p-6 border-t-4 border-t-emerald-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Precision</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {(metrics.weightedPrecision * 100).toFixed(1)}%
              </h3>
            </div>
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
              <Target className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full"
              style={{
                width: `${metrics.weightedPrecision * 100}%`
              }} />

          </div>
        </Card>

        <Card className="p-6 border-t-4 border-t-purple-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Recall</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {(metrics.weightedRecall * 100).toFixed(1)}%
              </h3>
            </div>
            <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-purple-600">
              <GitBranch className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{
                width: `${metrics.weightedRecall * 100}%`
              }} />

          </div>
        </Card>

        <Card className="p-6 border-t-4 border-t-amber-500">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">F1 Score</p>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                {(metrics.weightedF1 * 100).toFixed(1)}%
              </h3>
            </div>
            <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2">
            <div
              className="bg-amber-500 h-2 rounded-full"
              style={{
                width: `${metrics.weightedF1 * 100}%`
              }} />

          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Per-Class Metrics Table */}
        <Card className="p-6 overflow-hidden">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            {language === 'en' ? 'Per-Class Metrics' : 'مقاييس الأداء لكل فئة'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Class</th>
                  <th className="px-4 py-3">Precision</th>
                  <th className="px-4 py-3">Recall</th>
                  <th className="px-4 py-3">F1 Score</th>
                  <th className="px-4 py-3 rounded-r-lg">Support</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {classes.map((cls) => {
                  const m = metrics.perClassMetrics[cls];
                  return (
                    <tr
                      key={cls}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">

                      <td className="px-4 py-3 font-medium">
                        <span
                          className="inline-block w-2 h-2 rounded-full mr-2"
                          style={{
                            backgroundColor: CLASS_COLORS[cls]
                          }} />

                        {language === 'en' ?
                        CLASS_LABELS[cls].en :
                        CLASS_LABELS[cls].ar}
                      </td>
                      <td className="px-4 py-3">
                        {(m.precision * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3">
                        {(m.recall * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3">
                        {(m.f1Score * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3">{m.support}</td>
                    </tr>);

                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Confusion Matrix */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-500" />
            {language === 'en' ? 'Confusion Matrix' : 'مصفوفة الارتباك'}
          </h3>
          <div className="overflow-x-auto">
            <div className="min-w-[300px]">
              <div className="grid grid-cols-[auto_repeat(3,1fr)] gap-1">
                {/* Header Row */}
                <div className="h-8" /> {/* Empty corner */}
                {classes.map((cls, i) =>
                <div
                  key={i}
                  className="h-8 flex items-end justify-center pb-1">

                    <span
                    className="text-[10px] font-bold text-gray-500 uppercase transform -rotate-45 origin-bottom-left translate-x-4 whitespace-nowrap"
                    style={{
                      color: CLASS_COLORS[cls]
                    }}>

                      {language === 'en' ?
                    CLASS_LABELS[cls].en.split(' ')[0] :
                    CLASS_LABELS[cls].ar.split(' ')[0]}
                    </span>
                  </div>
                )}
                {/* Matrix Rows */}
                {metrics.confusionMatrix.map((row, i) =>
                <Fragment key={i}>
                    <div className="flex items-center justify-end pr-2">
                      <span
                      className="text-[10px] font-bold text-gray-500 uppercase text-right"
                      style={{
                        color: CLASS_COLORS[classes[i]]
                      }}>

                        {language === 'en' ?
                      CLASS_LABELS[classes[i]].en.split(' ')[0] :
                      CLASS_LABELS[classes[i]].ar.split(' ')[0]}
                      </span>
                    </div>
                    {row.map((value, j) => {
                    // Calculate intensity based on value relative to row sum
                    const rowSum = row.reduce((a, b) => a + b, 0);
                    const intensity = value / rowSum;
                    const isDiagonal = i === j;
                    let bg = 'bg-gray-100 dark:bg-gray-800';
                    let text = 'text-gray-900 dark:text-gray-100';
                    if (isDiagonal) {
                      // Green scale for correct predictions
                      const opacity = Math.max(0.1, intensity);
                      bg = `rgba(16, 185, 129, ${opacity})`; // emerald-500
                      text =
                      intensity > 0.5 ?
                      'text-white' :
                      'text-emerald-900 dark:text-emerald-100';
                    } else if (value > 0) {
                      // Red scale for errors
                      const opacity = Math.min(0.8, value / (rowSum * 0.5)); // Scale relative to errors
                      bg = `rgba(239, 68, 68, ${opacity})`; // red-500
                      text =
                      opacity > 0.5 ?
                      'text-white' :
                      'text-red-900 dark:text-red-100';
                    }
                    return (
                      <div
                        key={j}
                        className={`aspect-square flex items-center justify-center text-xs font-medium rounded ${text}`}
                        style={{
                          backgroundColor: bg
                        }}
                        title={`Actual: ${CLASS_LABELS[classes[i]].en}, Predicted: ${CLASS_LABELS[classes[j]].en}, Count: ${value}`}>

                          {value}
                        </div>);

                  })}
                  </Fragment>
                )}
              </div>
              <div className="mt-4 text-center text-xs text-gray-500">
                X-Axis: Predicted Class | Y-Axis: Actual Class
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* ROC Curve */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <LineChartIcon className="w-5 h-5 text-indigo-500" />
          ROC Curves (Receiver Operating Characteristic)
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                opacity={0.1} />

              <XAxis
                dataKey="fpr"
                type="number"
                domain={[0, 1]}
                label={{
                  value: 'False Positive Rate',
                  position: 'insideBottom',
                  offset: -5
                }}
                tick={{
                  fontSize: 12
                }} />

              <YAxis
                dataKey="tpr"
                type="number"
                domain={[0, 1]}
                label={{
                  value: 'True Positive Rate',
                  angle: -90,
                  position: 'insideLeft'
                }}
                tick={{
                  fontSize: 12
                }} />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#fff'
                }} />

              <Legend />
              <ReferenceLine
                segment={[
                {
                  x: 0,
                  y: 0
                },
                {
                  x: 1,
                  y: 1
                }]
                }
                stroke="#6b7280"
                strokeDasharray="3 3" />

              {classes.map((cls) => {
                const data = metrics.rocCurveData[cls];
                // Transform data for recharts: array of objects { fpr, tpr }
                const chartData = data.fpr.map((f, i) => ({
                  fpr: f,
                  tpr: data.tpr[i]
                }));
                return (
                  <Line
                    key={cls}
                    data={chartData}
                    type="monotone"
                    dataKey="tpr"
                    name={`${CLASS_LABELS[cls].en} (AUC: ${data.auc.toFixed(2)})`}
                    stroke={CLASS_COLORS[cls]}
                    strokeWidth={2}
                    dot={false} />);


              })}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Training History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Training & Validation Loss
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={metrics.trainingHistory.epochs.map((e, i) => ({
                  epoch: e,
                  train: metrics.trainingHistory.trainLoss[i],
                  val: metrics.trainingHistory.valLoss[i]
                }))}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1} />

                <XAxis
                  dataKey="epoch"
                  label={{
                    value: 'Epoch',
                    position: 'insideBottom',
                    offset: -5
                  }} />

                <YAxis
                  label={{
                    value: 'Loss',
                    angle: -90,
                    position: 'insideLeft'
                  }} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }} />

                <Legend />
                <Line
                  type="monotone"
                  dataKey="train"
                  name="Train Loss"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false} />

                <Line
                  type="monotone"
                  dataKey="val"
                  name="Val Loss"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false} />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Training & Validation Accuracy
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={metrics.trainingHistory.epochs.map((e, i) => ({
                  epoch: e,
                  train: metrics.trainingHistory.trainAccuracy[i],
                  val: metrics.trainingHistory.valAccuracy[i]
                }))}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1} />

                <XAxis
                  dataKey="epoch"
                  label={{
                    value: 'Epoch',
                    position: 'insideBottom',
                    offset: -5
                  }} />

                <YAxis
                  domain={[0, 1]}
                  label={{
                    value: 'Accuracy',
                    angle: -90,
                    position: 'insideLeft'
                  }} />

                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff'
                  }} />

                <Legend />
                <Line
                  type="monotone"
                  dataKey="train"
                  name="Train Acc"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false} />

                <Line
                  type="monotone"
                  dataKey="val"
                  name="Val Acc"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={false} />

              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>);

}