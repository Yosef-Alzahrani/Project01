import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import {
  diseasesData,
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  DiseaseCategory,
  SeverityLevel } from
'../utils/diseasesData';
import {
  Search,
  Filter,
  ChevronRight,
  Activity,
  AlertCircle } from
'lucide-react';
const ITEMS_PER_PAGE = 20;
export function DiseasesPage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    DiseaseCategory | 'all'>(
    'all');
  const [selectedSeverity, setSelectedSeverity] = useState<
    SeverityLevel | 'all'>(
    'all');
  const [sortBy, setSortBy] = useState<'name' | 'severity'>('name');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const observerTarget = useRef<HTMLDivElement>(null);
  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchTerm, selectedCategory, selectedSeverity, sortBy]);
  // Filter and sort logic
  const filteredAndSortedDiseases = useMemo(() => {
    let result = diseasesData;
    // Filter by Category
    if (selectedCategory !== 'all') {
      result = result.filter((d) => d.category === selectedCategory);
    }
    // Filter by Severity
    if (selectedSeverity !== 'all') {
      result = result.filter((d) => d.severityLevel === selectedSeverity);
    }
    // Filter by Search Term (Live Search)
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (d) =>
        d.nameEn.toLowerCase().includes(query) ||
        d.nameAr.includes(query) ||
        d.symptomsEn.some((s) => s.toLowerCase().includes(query)) ||
        d.symptomsAr.some((s) => s.includes(query))
      );
    }
    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = language === 'en' ? a.nameEn : a.nameAr;
        const nameB = language === 'en' ? b.nameEn : b.nameAr;
        return nameA.localeCompare(nameB);
      } else {
        const severityWeight = {
          severe: 3,
          moderate: 2,
          mild: 1
        };
        return severityWeight[b.severityLevel] - severityWeight[a.severityLevel];
      }
    });
    return result;
  }, [searchTerm, selectedCategory, selectedSeverity, sortBy, language]);
  const visibleDiseases = filteredAndSortedDiseases.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedDiseases.length;
  // Lazy loading observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
      }
    },
    [hasMore]
  );
  useEffect(() => {
    const element = observerTarget.current;
    if (!element) return;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    });
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [handleObserver]);
  const getSeverityColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'severe':
        return 'bg-red-500 text-white';
      case 'moderate':
        return 'bg-orange-500 text-white';
      case 'mild':
        return 'bg-emerald-500 text-white';
    }
  };
  const getSeverityLabel = (severity: SeverityLevel) => {
    if (language === 'en')
    return severity.charAt(0).toUpperCase() + severity.slice(1);
    switch (severity) {
      case 'severe':
        return 'خطير';
      case 'moderate':
        return 'متوسط';
      case 'mild':
        return 'خفيف';
    }
  };
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header & Search */}
      <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#2563EB]" />
              {t('diseases.title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {language === 'en' ?
              'Comprehensive medical encyclopedia & database' :
              'موسوعة وقاعدة بيانات طبية شاملة'}
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <select
              className="h-11 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 text-sm font-medium focus:border-[#2563EB] focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'severity')}>

              <option value="name">
                {language === 'en' ? 'Sort by Name' : 'ترتيب بالاسم'}
              </option>
              <option value="severity">
                {language === 'en' ? 'Sort by Severity' : 'ترتيب بالخطورة'}
              </option>
            </select>
          </div>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <Input
            placeholder={
            language === 'en' ?
            'Search diseases or symptoms...' :
            'ابحث عن الأمراض أو الأعراض...'
            }
            icon={<Search className="h-5 w-5 text-gray-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-14 text-lg shadow-sm" />

        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-72 flex-shrink-0 space-y-6">
          <div className="bg-white/80 dark:bg-gray-900/60 backdrop-blur-md p-5 rounded-xl border border-gray-200 dark:border-gray-800 sticky top-24 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {t('diseases.filters.title')}
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSeverity('all');
                  setSearchTerm('');
                }}
                className="text-xs text-[#2563EB] hover:underline font-medium">

                {t('diseases.resetFilters')}
              </button>
            </div>

            <div className="space-y-6">
              {/* Severity Filter */}
              <div>
                <label className="text-sm font-bold text-gray-900 dark:text-white mb-3 block">
                  {t('diseases.filters.severity')}
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedSeverity('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedSeverity === 'all' ? 'bg-[#2563EB] text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>

                    {language === 'en' ? 'All' : 'الكل'}
                  </button>
                  {(['mild', 'moderate', 'severe'] as SeverityLevel[]).map(
                    (sev) =>
                    <button
                      key={sev}
                      onClick={() => setSelectedSeverity(sev)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedSeverity === sev ? getSeverityColor(sev) : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'}`}>

                        {getSeverityLabel(sev)}
                      </button>

                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                <label className="text-sm font-bold text-gray-900 dark:text-white mb-3 block">
                  {t('diseases.filters.category')}
                </label>
                <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === 'all' ? 'bg-blue-50 text-[#2563EB] dark:bg-blue-900/20 dark:text-blue-300 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>

                    <span>
                      {language === 'en' ? 'All Categories' : 'جميع التصنيفات'}
                    </span>
                  </button>
                  {Object.entries(CATEGORY_LABELS).map(([id, label]) => {
                    const Icon = CATEGORY_ICONS[id as DiseaseCategory];
                    return (
                      <button
                        key={id}
                        onClick={() =>
                        setSelectedCategory(id as DiseaseCategory)
                        }
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === id ? 'bg-blue-50 text-[#2563EB] dark:bg-blue-900/20 dark:text-blue-300 font-medium' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>

                        <Icon className="w-4 h-4 opacity-70" />
                        <span className="flex-1 text-start">
                          {language === 'en' ? label.en : label.ar}
                        </span>
                      </button>);

                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
            {language === 'en' ?
            `Showing ${visibleDiseases.length} of ${filteredAndSortedDiseases.length} diseases` :
            `عرض ${visibleDiseases.length} من أصل ${filteredAndSortedDiseases.length} مرض`}
          </div>

          {filteredAndSortedDiseases.length === 0 ?
          <div className="text-center py-16 bg-white/80 dark:bg-gray-900/60 backdrop-blur-md rounded-2xl border border-dashed border-gray-200 dark:border-gray-800">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {language === 'en' ? 'No results found' : 'لا توجد نتائج'}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {language === 'en' ?
              "We couldn't find any diseases matching your search criteria. Try adjusting your filters or search term." :
              'لم نتمكن من العثور على أي أمراض تطابق معايير البحث الخاصة بك. حاول تعديل الفلاتر أو مصطلح البحث.'}
              </p>
              <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSeverity('all');
                setSearchTerm('');
              }}>

                {t('diseases.resetFilters')}
              </Button>
            </div> :

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleDiseases.map((disease) => {
              const Icon = CATEGORY_ICONS[disease.category];
              return (
                <Card
                  key={disease.id}
                  className="p-5 flex flex-col h-full"
                  onClick={() => navigate(`/diseases/${disease.id}`)}>

                    <div className="flex justify-between items-start mb-4">
                      <Badge
                      variant="outline"
                      className="bg-white dark:bg-gray-800">

                        {language === 'en' ?
                      CATEGORY_LABELS[disease.category].en :
                      CATEGORY_LABELS[disease.category].ar}
                      </Badge>
                      <div
                      className={`px-2 py-0.5 rounded text-xs font-bold ${getSeverityColor(disease.severityLevel)}`}>

                        {getSeverityLabel(disease.severityLevel)}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-[#2563EB] dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#2563EB] transition-colors line-clamp-1">
                        {language === 'en' ? disease.nameEn : disease.nameAr}
                      </h3>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                      {language === 'en' ?
                    disease.descriptionEn :
                    disease.descriptionAr}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-end">
                      <span className="text-sm font-medium text-[#2563EB] dark:text-blue-400 group-hover:underline flex items-center gap-1">
                        {t('diseases.card.viewDetails')}
                        <ChevronRight
                        className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />

                      </span>
                    </div>
                  </Card>);

            })}
            </div>
          }

          {/* Lazy Loading Trigger */}
          {hasMore &&
          <div ref={observerTarget} className="py-8 flex justify-center">
              <div className="w-8 h-8 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        </div>
      </div>
    </div>);

}