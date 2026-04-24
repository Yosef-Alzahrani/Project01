import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Star, BarChart3, Users, TrendingUp } from 'lucide-react';
interface RatingData {
  ratings: number[];
}
const STORAGE_KEY = 'medgrade_site_ratings';
const VOTED_KEY = 'medgrade_has_rated';
function loadRatings(): RatingData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.ratings)) {
        return parsed;
      }
    }
  } catch {
    // Ignore malformed localStorage data
  }
  return {
    ratings: []
  };
}
function saveRating(stars: number, feedback: string): RatingData {
  const data = loadRatings();
  data.ratings.push(stars);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  localStorage.setItem(VOTED_KEY, 'true');
  return data;
}
function getDistribution(ratings: number[]): Record<number, number> {
  const dist: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };
  for (const r of ratings) {
    if (r >= 1 && r <= 5) {
      dist[r] = (dist[r] || 0) + 1;
    }
  }
  return dist;
}
function getAverage(ratings: number[]): number {
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return Math.round(sum / ratings.length * 10) / 10;
}
export function SiteRatingPage() {
  const { language } = useLanguage();
  const [selectedStars, setSelectedStars] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ratingData, setRatingData] = useState<RatingData>({
    ratings: []
  });
  useEffect(() => {
    const data = loadRatings();
    setRatingData(data);
    const voted = localStorage.getItem(VOTED_KEY);
    if (voted === 'true') {
      setHasVoted(true);
    }
  }, []);
  const feedbackOptions = [
  {
    en: 'Excellent',
    ar: 'ممتاز'
  },
  {
    en: 'Great',
    ar: 'رائع'
  },
  {
    en: 'Very Good',
    ar: 'جيد جدًا'
  },
  {
    en: 'Good',
    ar: 'جيد'
  },
  {
    en: 'Needs Improvement',
    ar: 'يحتاج تحسين'
  }];

  const handleSubmit = () => {
    if (selectedStars === 0) return;
    const data = saveRating(selectedStars, selectedFeedback);
    setRatingData(data);
    setHasVoted(true);
    setSubmitted(true);
  };
  const distribution = getDistribution(ratingData.ratings);
  const average = getAverage(ratingData.ratings);
  const totalRatings = ratingData.ratings.length;
  const maxCount = Math.max(...Object.values(distribution), 1);
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-3 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <Star className="w-8 h-8 text-amber-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          {language === 'en' ? 'Rate This Platform' : 'قيّم هذه المنصة'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">
          {language === 'en' ?
          'Your anonymous feedback helps us improve MedGrade AI.' :
          'تقييمك المجهول يساعدنا في تحسين MedGrade AI.'}
        </p>
      </div>

      {/* Rating Form */}
      {!hasVoted ?
      <Card className="p-8">
          <div className="text-center space-y-8">
            {/* Stars */}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                {language === 'en' ? 'Select your rating' : 'اختر تقييمك'}
              </p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) =>
              <button
                key={star}
                onClick={() => setSelectedStars(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-1 transition-transform hover:scale-110 focus:outline-none"
                aria-label={`${star} star${star > 1 ? 's' : ''}`}>

                    <Star
                  className={`w-10 h-10 transition-colors ${star <= (hoveredStar || selectedStars) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}`} />

                  </button>
              )}
              </div>
              {selectedStars > 0 &&
            <p className="mt-2 text-sm text-amber-500 font-medium">
                  {selectedStars} / 5
                </p>
            }
            </div>

            {/* Feedback Options */}
            {selectedStars > 0 &&
          <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">
                  {language === 'en' ?
              'Quick feedback (optional)' :
              'تعليق سريع (اختياري)'}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {feedbackOptions.map((option, idx) =>
              <button
                key={idx}
                onClick={() =>
                setSelectedFeedback(
                  selectedFeedback === (
                  language === 'en' ? option.en : option.ar) ?
                  '' :
                  language === 'en' ?
                  option.en :
                  option.ar
                )
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${selectedFeedback === (language === 'en' ? option.en : option.ar) ? 'bg-blue-600 text-white border-blue-600' : 'bg-transparent text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:text-blue-500'}`}>

                      {language === 'en' ? option.en : option.ar}
                    </button>
              )}
                </div>
              </div>
          }

            {/* Submit */}
            {selectedStars > 0 &&
          <Button onClick={handleSubmit} className="px-8">
                {language === 'en' ? 'Submit Rating' : 'إرسال التقييم'}
              </Button>
          }
          </div>
        </Card> :

      <Card className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
            <Star className="w-8 h-8 text-emerald-500 fill-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {language === 'en' ? 'Thank you!' : 'شكرًا لك!'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {language === 'en' ?
          'Your anonymous rating has been recorded.' :
          'تم تسجيل تقييمك المجهول.'}
          </p>
        </Card>
      }

      {/* Statistics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          {language === 'en' ? 'Rating Statistics' : 'إحصائيات التقييم'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-5 text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {totalRatings}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Total Ratings' : 'إجمالي التقييمات'}
            </p>
          </Card>
          <Card className="p-5 text-center">
            <Star className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {average > 0 ? average : '—'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Average Rating' : 'متوسط التقييم'}
            </p>
          </Card>
          <Card className="p-5 text-center">
            <TrendingUp className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {totalRatings > 0 ?
              `${Math.round(distribution[5] / totalRatings * 100)}%` :
              '—'}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? '5-Star Rate' : 'نسبة 5 نجوم'}
            </p>
          </Card>
        </div>

        {/* Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {language === 'en' ? 'Star Distribution' : 'توزيع النجوم'}
          </h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((star) =>
            <div key={star} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-16 justify-end">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {star}
                  </span>
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-500"
                  style={{
                    width:
                    totalRatings > 0 ?
                    `${distribution[star] / maxCount * 100}%` :
                    '0%'
                  }} />

                </div>
                <span className="text-sm font-mono text-gray-500 w-8 text-right">
                  {distribution[star]}
                </span>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Privacy Note */}
      <div className="text-center text-xs text-gray-400 dark:text-gray-500 pt-4">
        {language === 'en' ?
        'All ratings are completely anonymous. No personal data, names, or timestamps are collected.' :
        'جميع التقييمات مجهولة تمامًا. لا يتم جمع أي بيانات شخصية أو أسماء أو تواريخ.'}
      </div>
    </div>);

}