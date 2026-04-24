export const translations = {
  en: {
    appTitle: 'MedGrade AI',
    nav: {
      home: 'Dashboard',
      healthCheck: 'Health Check',
      diseases: 'Encyclopedia',
      ageAnalysis: 'Age Analysis',
      patientFiles: 'Patient Files',
      login: 'Login',
      register: 'Register'
    },
    home: {
      welcome: 'Welcome to MedGrade AI',
      subtitle: 'AI-Powered Clinical Decision Support System',
      stats: 'Global Statistics',
      topDiseases: 'Top 10 Global Diseases',
      news: 'Health News',
      activeCases: 'Active Cases',
      recovered: 'Recovered',
      critical: 'Critical',
      dailyNew: 'Daily New Cases'
    },
    healthCheck: {
      title: 'Personal Health Assessment',
      subtitle: 'Enter your vitals for a comprehensive analysis',
      age: 'Age',
      height: 'Height (cm)',
      weight: 'Weight (kg)',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      calculate: 'Calculate Health Score',
      results: 'Your Health Analysis',
      bmi: 'BMI',
      heartRate: 'Heart Rate',
      bloodPressure: 'Blood Pressure',
      bloodSugar: 'Blood Sugar',
      score: 'Overall Health Score',
      recommendations: 'Recommendations'
    },
    diseases: {
      title: 'Disease Encyclopedia',
      searchPlaceholder: 'Search diseases (English/Arabic)...',
      advancedSearch: 'Advanced Search',
      resetFilters: 'Reset Filters',
      applyFilters: 'Apply',
      filters: {
        title: 'Filters',
        category: 'Category',
        contagious: 'Contagious',
        type: 'Type',
        ageGroup: 'Age Group',
        severity: 'Severity',
        yes: 'Yes',
        no: 'No',
        chronic: 'Chronic',
        acute: 'Acute',
        children: 'Children',
        adults: 'Adults',
        elderly: 'Elderly'
      },
      tabs: {
        common: 'Most Common',
        searched: 'Most Searched',
        category: 'By Category',
        new: 'Recently Added'
      },
      card: {
        viewDetails: 'View Details',
        severity: 'Severity'
      },
      modal: {
        summary: 'Quick Summary',
        symptoms: 'Symptoms',
        causes: 'Causes',
        prevention: 'Prevention',
        doctor: 'When to See Doctor',
        diagnosis: 'Diagnosis',
        treatment: 'Treatment',
        faq: 'FAQ',
        sources: 'Sources',
        lastUpdated: 'Last Updated',
        reliability: 'Reliability',
        related: 'Related Diseases',
        high: 'High',
        medium: 'Medium'
      },
      disclaimer:
      'Information is for education only and not a substitute for medical consultation',
      categories: {
        all: 'All',
        common: 'Common',
        dangerous: 'Dangerous',
        seasonal: 'Seasonal',
        chronic: 'Chronic'
      },
      severity: 'Severity',
      symptoms: 'Symptoms',
      prevention: 'Prevention',
      learnMore: 'Learn More'
    },
    ageAnalysis: {
      title: 'Age-Based Risk Analysis',
      subtitle: 'Discover health risks specific to your demographic',
      analyze: 'Analyze Risks',
      commonForAge: 'Common Conditions for Age',
      preventionTips: 'Prevention Tips',
      checkups: 'Recommended Checkups'
    },
    patientFiles: {
      title: 'Patient File Management',
      uploadTitle: 'Upload Patient Data',
      uploadDesc: 'Drag & drop CSV, Excel, or JSON files here',
      processing: 'Processing files...',
      table: {
        name: 'Patient Name',
        id: 'ID',
        disease: 'Disease',
        category: 'Category',
        severity: 'Severity'
      },
      export: 'Export Data',
      exportPdf: 'Export as PDF',
      exportExcel: 'Export as Excel'
    },
    bodyAnalysis: {
      title: 'Body Analysis & Exercise Plan',
      subtitle: 'Advanced InBody metrics and personalized workout generation',
      form: {
        age: 'Age',
        gender: 'Gender',
        height: 'Height (cm)',
        weight: 'Weight (kg)',
        goal: 'Goal',
        goals: {
          loseWeight: 'Lose Weight',
          buildMuscle: 'Build Muscle',
          maintain: 'Maintain Weight',
          improveFitness: 'Improve Fitness'
        },
        calculate: 'Analyze Body & Generate Plan'
      },
      metrics: {
        weight: 'Weight',
        bmi: 'BMI',
        bodyFat: 'Body Fat',
        muscleMass: 'Muscle Mass',
        bmr: 'BMR',
        calories: 'kcal/day',
        status: {
          underweight: 'Underweight',
          normal: 'Normal',
          overweight: 'Overweight',
          obese: 'Obese',
          low: 'Low',
          healthy: 'Healthy',
          high: 'High',
          good: 'Good',
          excellent: 'Excellent'
        }
      },
      charts: {
        composition: 'Body Composition',
        calories: 'Daily Calorie Needs',
        fat: 'Fat',
        muscle: 'Muscle',
        water: 'Water',
        bone: 'Bone'
      },
      exercises: {
        title: 'Your Personalized Plan',
        cardio: 'Cardio',
        strength: 'Strength',
        fatBurn: 'Fat Burn',
        duration: 'Duration',
        calories: 'Calories',
        difficulty: 'Difficulty',
        min: 'min',
        kcal: 'kcal'
      },
      schedule: {
        title: 'Weekly Schedule',
        rest: 'Rest Day',
        totalBurn: 'Weekly Burn Target'
      },
      recommendations: {
        title: 'Smart Recommendations',
        basedOn: 'Based on your analysis:'
      },
      bodyModel: {
        title: 'Interactive Muscle Map',
        subtitle: 'Click on a muscle group to see specific exercises',
        front: 'Front View',
        back: 'Back View',
        muscles: {
          chest: 'Chest',
          shoulders: 'Shoulders',
          arms: 'Arms',
          abs: 'Abs',
          back: 'Back',
          glutes: 'Glutes',
          thighs: 'Thighs',
          calves: 'Calves'
        },
        filters: {
          difficulty: 'Difficulty',
          location: 'Location',
          beginner: 'Beginner',
          intermediate: 'Intermediate',
          advanced: 'Advanced',
          home: 'Home',
          gym: 'Gym',
          both: 'Any'
        },
        exercise: {
          target: 'Target',
          equipment: 'Equipment'
        }
      }
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Success',
      submit: 'Submit',
      cancel: 'Cancel',
      viewDetails: 'View Details'
    }
  },
  ar: {
    appTitle: 'MedGrade AI',
    nav: {
      home: 'لوحة التحكم',
      healthCheck: 'فحص الصحة',
      diseases: 'موسوعة الأمراض',
      ageAnalysis: 'تحليل العمر',
      patientFiles: 'ملفات المرضى',
      login: 'تسجيل الدخول',
      register: 'تسجيل جديد'
    },
    home: {
      welcome: 'مرحباً بكم في MedGrade AI',
      subtitle: 'نظام دعم القرار السريري المدعوم بالذكاء الاصطناعي',
      stats: 'الإحصائيات العالمية',
      topDiseases: 'أكثر 10 أمراض انتشاراً',
      news: 'أخبار الصحة',
      activeCases: 'حالات نشطة',
      recovered: 'حالات شفاء',
      critical: 'حالات حرجة',
      dailyNew: 'حالات جديدة يومياً'
    },
    healthCheck: {
      title: 'التقييم الصحي الشخصي',
      subtitle: 'أدخل بياناتك الحيوية للحصول على تحليل شامل',
      age: 'العمر',
      height: 'الطول (سم)',
      weight: 'الوزن (كجم)',
      gender: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
      calculate: 'حساب النتيجة الصحية',
      results: 'تحليل صحتك',
      bmi: 'مؤشر كتلة الجسم',
      heartRate: 'نبض القلب',
      bloodPressure: 'ضغط الدم',
      bloodSugar: 'سكر الدم',
      score: 'النتيجة الصحية العامة',
      recommendations: 'التوصيات'
    },
    diseases: {
      title: 'موسوعة الأمراض',
      searchPlaceholder: 'ابحث عن مرض (عربي/إنجليزي)...',
      advancedSearch: 'بحث متقدم',
      resetFilters: 'إعادة تعيين',
      applyFilters: 'تطبيق',
      filters: {
        title: 'الفلاتر',
        category: 'التصنيف',
        contagious: 'معدي',
        type: 'النوع',
        ageGroup: 'الفئة العمرية',
        severity: 'الخطورة',
        yes: 'نعم',
        no: 'لا',
        chronic: 'مزمن',
        acute: 'حاد',
        children: 'أطفال',
        adults: 'بالغين',
        elderly: 'كبار السن'
      },
      tabs: {
        common: 'الأكثر شيوعاً',
        searched: 'الأكثر بحثاً',
        category: 'حسب التصنيف',
        new: 'المضاف حديثاً'
      },
      card: {
        viewDetails: 'عرض التفاصيل',
        severity: 'الخطورة'
      },
      modal: {
        summary: 'ملخص سريع',
        symptoms: 'الأعراض',
        causes: 'الأسباب',
        prevention: 'الوقاية',
        doctor: 'متى تراجع طبيب',
        diagnosis: 'التشخيص',
        treatment: 'العلاج العام',
        faq: 'أسئلة شائعة',
        sources: 'المصادر',
        lastUpdated: 'آخر تحديث',
        reliability: 'الموثوقية',
        related: 'أمراض مشابهة',
        high: 'عالية',
        medium: 'متوسطة'
      },
      disclaimer: 'المعلومات للتثقيف وليست بديلاً عن الاستشارة الطبية',
      categories: {
        all: 'الكل',
        common: 'شائع',
        dangerous: 'خطير',
        seasonal: 'موسمي',
        chronic: 'مزمن'
      },
      severity: 'الخطورة',
      symptoms: 'الأعراض',
      prevention: 'الوقاية',
      learnMore: 'المزيد من المعلومات'
    },
    ageAnalysis: {
      title: 'تحليل المخاطر حسب العمر',
      subtitle: 'اكتشف المخاطر الصحية الخاصة بفئتك العمرية',
      analyze: 'تحليل المخاطر',
      commonForAge: 'حالات شائعة لهذا العمر',
      preventionTips: 'نصائح للوقاية',
      checkups: 'فحوصات موصى بها'
    },
    patientFiles: {
      title: 'إدارة ملفات المرضى',
      uploadTitle: 'رفع بيانات المرضى',
      uploadDesc: 'اسحب وأفلت ملفات CSV أو Excel أو JSON هنا',
      processing: 'جاري معالجة الملفات...',
      table: {
        name: 'اسم المريض',
        id: 'المعرف',
        disease: 'المرض',
        category: 'التصنيف',
        severity: 'الخطورة'
      },
      export: 'تصدير البيانات',
      exportPdf: 'تصدير PDF',
      exportExcel: 'تصدير Excel'
    },
    bodyAnalysis: {
      title: 'تحليل الجسم وخطة التمارين',
      subtitle: 'مؤشرات InBody متقدمة وتوليد تمارين مخصصة',
      form: {
        age: 'العمر',
        gender: 'الجنس',
        height: 'الطول (سم)',
        weight: 'الوزن (كجم)',
        goal: 'الهدف',
        goals: {
          loseWeight: 'إنقاص الوزن',
          buildMuscle: 'بناء العضلات',
          maintain: 'الحفاظ على الوزن',
          improveFitness: 'تحسين اللياقة'
        },
        calculate: 'تحليل الجسم وتوليد الخطة'
      },
      metrics: {
        weight: 'الوزن',
        bmi: 'مؤشر كتلة الجسم',
        bodyFat: 'نسبة الدهون',
        muscleMass: 'كتلة العضلات',
        bmr: 'معدل الأيض',
        calories: 'سعرة/يوم',
        status: {
          underweight: 'نحافة',
          normal: 'طبيعي',
          overweight: 'زيادة وزن',
          obese: 'سمنة',
          low: 'منخفض',
          healthy: 'صحي',
          high: 'مرتفع',
          good: 'جيد',
          excellent: 'ممتاز'
        }
      },
      charts: {
        composition: 'تكوين الجسم',
        calories: 'احتياج السعرات اليومي',
        fat: 'دهون',
        muscle: 'عضلات',
        water: 'ماء',
        bone: 'عظام'
      },
      exercises: {
        title: 'خطتك المخصصة',
        cardio: 'كارديو',
        strength: 'قوة عضلية',
        fatBurn: 'حرق دهون',
        duration: 'المدة',
        calories: 'السعرات',
        difficulty: 'الصعوبة',
        min: 'دقيقة',
        kcal: 'سعرة'
      },
      schedule: {
        title: 'الجدول الأسبوعي',
        rest: 'يوم راحة',
        totalBurn: 'هدف الحرق الأسبوعي'
      },
      recommendations: {
        title: 'اقتراحات ذكية',
        basedOn: 'بناءً على تحليلك:'
      },
      bodyModel: {
        title: 'خريطة العضلات التفاعلية',
        subtitle: 'اضغط على أي عضلة لعرض التمارين الخاصة بها',
        front: 'من الأمام',
        back: 'من الخلف',
        muscles: {
          chest: 'الصدر',
          shoulders: 'الأكتاف',
          arms: 'الذراعين',
          abs: 'البطن',
          back: 'الظهر',
          glutes: 'المؤخرة',
          thighs: 'الفخذين',
          calves: 'الساقين'
        },
        filters: {
          difficulty: 'المستوى',
          location: 'المكان',
          beginner: 'مبتدئ',
          intermediate: 'متوسط',
          advanced: 'متقدم',
          home: 'منزل',
          gym: 'نادي',
          both: 'الكل'
        },
        exercise: {
          target: 'يستهدف',
          equipment: 'المعدات'
        }
      }
    },
    common: {
      loading: 'جاري التحميل...',
      error: 'حدث خطأ',
      success: 'تم بنجاح',
      submit: 'إرسال',
      cancel: 'إلغاء',
      viewDetails: 'عرض التفاصيل'
    }
  }
};

export type Language = 'en' | 'ar';
export type TranslationKey = keyof typeof translations.en;