// AI Service Layer - Connects to FastAPI backend (real predictions only)

const API_BASE_URL =
  String(import.meta.env.VITE_API_BASE_URL || '')
    .trim()
    .replace(/\/$/, '');

// ============ TYPES ============

export type InjuryClass =
  | 'Abrasions'
  | 'Bruises'
  | 'Burns'
  | 'Cut'
  | 'Diabetic Wounds'
  | 'Laceration'
  | 'Normal'
  | 'Pressure Wounds'
  | 'Surgical Wounds'
  | 'Venous Wounds';

export interface PredictionResult {
  predictedClass: InjuryClass | 'uncertain';
  confidence: number;
  allProbabilities: Record<InjuryClass, number>;
  severity: 'low' | 'medium' | 'high' | 'unknown';
  modelVersion: string;
  inferenceTimeMs: number;
  isUncertain: boolean;
  preprocessingInfo: {
    originalSize?: string;
    resizedTo: string;
    normalization: string;
  };
}

export interface ClassificationReport {
  accuracy: number;
  weightedPrecision: number;
  weightedRecall: number;
  weightedF1: number;
  perClassMetrics: Record<
    InjuryClass,
    {
      precision: number;
      recall: number;
      f1Score: number;
      support: number;
    }>;

  confusionMatrix: number[][];
  rocCurveData: Record<
    InjuryClass,
    {fpr: number[];tpr: number[];auc: number;}>;

  trainingHistory: {
    epochs: number[];
    trainLoss: number[];
    valLoss: number[];
    trainAccuracy: number[];
    valAccuracy: number[];
  };
  modelInfo: {
    architecture: string;
    baseModel: string;
    totalParams: number;
    trainableParams: number;
    inputShape: string;
    optimizer: string;
    learningRate: number;
    batchSize: number;
    epochs: number;
    datasetSize: number;
    trainSize: number;
    valSize: number;
    testSize: number;
  };
}

export interface DashboardAnalytics {
  totalPredictions: number;
  avgConfidence: number;
  highRiskPercentage: number;
  classDistribution: Record<InjuryClass, number>;
  recentPredictions: Array<{
    id: string;
    timestamp: string;
    predictedClass: InjuryClass;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
  }>;
  confidenceDistribution: Array<{range: string;count: number;}>;
  dailyPredictions: Array<{
    date: string;
    count: number;
    avgConfidence: number;
  }>;
}

// ============ CLASS LABELS ============

export const CLASS_LABELS: Record<InjuryClass, {en: string; ar: string}> = {
  'Abrasions':       { en: 'Abrasions',        ar: 'سحجات' },
  'Bruises':         { en: 'Bruises',           ar: 'كدمات' },
  'Burns':           { en: 'Burns',             ar: 'حروق' },
  'Cut':             { en: 'Cut',               ar: 'جرح قطعي' },
  'Diabetic Wounds': { en: 'Diabetic Wounds',   ar: 'جروح السكري' },
  'Laceration':      { en: 'Laceration',        ar: 'تهتك' },
  'Normal':          { en: 'Normal',            ar: 'طبيعي' },
  'Pressure Wounds': { en: 'Pressure Wounds',   ar: 'قرح الضغط' },
  'Surgical Wounds': { en: 'Surgical Wounds',   ar: 'جروح جراحية' },
  'Venous Wounds':   { en: 'Venous Wounds',     ar: 'جروح وريدية' },
};

export const CLASS_COLORS: Record<InjuryClass, string> = {
  'Abrasions':       '#10b981',
  'Bruises':         '#8b5cf6',
  'Burns':           '#ef4444',
  'Cut':             '#f59e0b',
  'Diabetic Wounds': '#dc2626',
  'Laceration':      '#f97316',
  'Normal':          '#06b6d4',
  'Pressure Wounds': '#e11d48',
  'Surgical Wounds': '#2563eb',
  'Venous Wounds':   '#7c3aed',
};

export const SEVERITY_MAP: Record<InjuryClass, 'low' | 'medium' | 'high'> = {
  'Abrasions':       'low',
  'Bruises':         'low',
  'Burns':           'high',
  'Cut':             'medium',
  'Diabetic Wounds': 'high',
  'Laceration':      'medium',
  'Normal':          'low',
  'Pressure Wounds': 'high',
  'Surgical Wounds': 'medium',
  'Venous Wounds':   'medium',
};

// ============ API FUNCTIONS ============

export async function predictInjury(
  imageFile: File
): Promise<PredictionResult> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_BASE_URL}/api/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => 'Unknown error');
    throw new Error(`Prediction failed: ${detail}`);
  }

  return response.json();
}

export async function getModelMetrics(): Promise<ClassificationReport> {
  const response = await fetch(`${API_BASE_URL}/api/model/metrics`);
  if (!response.ok) throw new Error('Failed to fetch metrics');
  return response.json();
}

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
  const response = await fetch(`${API_BASE_URL}/api/analytics`);
  if (!response.ok) throw new Error('Failed to fetch analytics');
  return response.json();
}

// Medical recommendations per class
export const MEDICAL_RECOMMENDATIONS: Record<
  InjuryClass,
  {
    titleEn: string;
    titleAr: string;
    descEn: string;
    descAr: string;
    actionEn: string;
    actionAr: string;
    urgency: 'home' | 'doctor' | 'emergency';
    medicationsEn: string[];
    medicationsAr: string[];
    stepsEn: string[];
    stepsAr: string[];
  }> =
{
  'Abrasions': {
    titleEn: 'Abrasion — Skin Scrape',
    titleAr: 'سحجة — خدش جلدي',
    descEn: 'Superficial wound caused by friction or skin scraping. Safe for home care.',
    descAr: 'جرح سطحي ناتج عن احتكاك أو خدش الجلد. آمن للعناية المنزلية.',
    actionEn: 'Home Care Sufficient',
    actionAr: 'العناية المنزلية كافية',
    urgency: 'home',
    medicationsEn: ['Antiseptic solution (Betadine)', 'Antibiotic ointment (Neosporin)', 'Non-stick bandage'],
    medicationsAr: ['محلول مطهر (بيتادين)', 'مرهم مضاد حيوي (نيوسبورين)', 'ضمادة غير لاصقة'],
    stepsEn: ['Rinse with clean water 5–10 min', 'Apply antiseptic gently', 'Cover with sterile bandage', 'Change dressing daily', 'Watch for signs of infection'],
    stepsAr: ['اشطف بماء نظيف 5–10 دقائق', 'ضع مطهراً بلطف', 'غطِّ بضمادة معقمة', 'بدّل الضمادة يومياً', 'راقب علامات الالتهاب'],
  },
  'Bruises': {
    titleEn: 'Bruise — Contusion',
    titleAr: 'كدمة — رضّة',
    descEn: 'Discoloration from bleeding under skin caused by blunt force impact.',
    descAr: 'تغير لون الجلد ناتج عن نزيف تحت الجلد من صدمة.',
    actionEn: 'Home Care Sufficient',
    actionAr: 'العناية المنزلية كافية',
    urgency: 'home',
    medicationsEn: ['Ice pack (20 min on/off)', 'Ibuprofen for pain', 'Arnica gel (topical)'],
    medicationsAr: ['كمادات ثلج (20 دقيقة متقطعة)', 'إيبوبروفين للألم', 'جل الأرنيكا (موضعي)'],
    stepsEn: ['Apply ice wrapped in cloth immediately', 'Elevate the affected area', 'Compress with elastic bandage', 'Rest the area', 'See doctor if pain is severe or bruise grows'],
    stepsAr: ['ضع ثلجاً ملفوفاً فوراً', 'ارفع المنطقة المصابة', 'اضغط بضمادة مرنة', 'أرِح المنطقة', 'استشر الطبيب إن اشتد الألم أو كبرت الكدمة'],
  },
  'Burns': {
    titleEn: 'Burn — Thermal Injury',
    titleAr: 'حرق — إصابة حرارية',
    descEn: 'Tissue damage caused by heat, chemicals, electricity, or radiation.',
    descAr: 'تلف الأنسجة الناتج عن الحرارة أو الكيماويات أو الكهرباء أو الإشعاع.',
    actionEn: 'Seek Medical Attention',
    actionAr: 'اطلب الرعاية الطبية',
    urgency: 'doctor',
    medicationsEn: ['Cool running water 20 min (NOT ice)', 'Silver sulfadiazine cream (Rx)', 'Non-stick wound dressing', 'Paracetamol / Ibuprofen for pain'],
    medicationsAr: ['ماء بارد جارٍ 20 دقيقة (ليس ثلجاً)', 'كريم سيلفر سلفاديازين (بوصفة)', 'ضمادة جرح غير لاصقة', 'باراسيتامول / إيبوبروفين للألم'],
    stepsEn: ['Cool burn under running water 20 min', 'Do NOT use ice, butter, or toothpaste', 'Remove jewelry near the burn', 'Cover loosely with sterile dressing', 'Seek care for burns >2 cm or on face/hands'],
    stepsAr: ['برّد الحرق بماء جارٍ 20 دقيقة', 'لا تستخدم الثلج أو الزبدة أو المعجون', 'أزل المجوهرات بالقرب من الحرق', 'غطِّ بضمادة فضفاضة معقمة', 'اطلب الرعاية للحروق >2 سم أو على الوجه/اليدين'],
  },
  'Cut': {
    titleEn: 'Cut — Incised Wound',
    titleAr: 'جرح قطعي',
    descEn: 'Clean-edged wound caused by a sharp object. Depth determines care needed.',
    descAr: 'جرح ذو حواف نظيفة ناتج عن أداة حادة. العمق يحدد مستوى الرعاية.',
    actionEn: 'Medical Evaluation Recommended',
    actionAr: 'يُنصح بالتقييم الطبي',
    urgency: 'doctor',
    medicationsEn: ['Antiseptic solution', 'Stitch strips / Steri-Strips', 'Antibiotic ointment', 'Tetanus prophylaxis if needed'],
    medicationsAr: ['محلول مطهر', 'شرائط تخييط / ستيري-ستريبس', 'مرهم مضاد حيوي', 'تطعيم التيتانوس إذا لزم'],
    stepsEn: ['Apply firm pressure to stop bleeding', 'Clean wound with antiseptic', 'Close with stitch strips if small', 'Seek stitches if >2 cm or gaping', 'Monitor for infection 48 h'],
    stepsAr: ['اضغط بثبات لإيقاف النزيف', 'نظف الجرح بمطهر', 'أغلق بشرائط تخييط إن كان صغيراً', 'اطلب الخياطة إن كان >2 سم أو متسعاً', 'راقب علامات الالتهاب 48 ساعة'],
  },
  'Diabetic Wounds': {
    titleEn: 'Diabetic Wound — Diabetic Ulcer',
    titleAr: 'جرح سكري — قرحة سكرية',
    descEn: 'Chronic wound common in diabetic patients, often on feet. Requires specialized care.',
    descAr: 'جرح مزمن شائع لدى مرضى السكري، غالباً في القدمين. يتطلب رعاية متخصصة.',
    actionEn: 'URGENT — See Specialist Immediately',
    actionAr: 'عاجل — راجع أخصائي فوراً',
    urgency: 'emergency',
    medicationsEn: ['Wound-specific dressings (hydrogel/foam)', 'Antibiotics if infected (Rx)', 'Blood sugar control medications', 'Offloading devices for foot ulcers'],
    medicationsAr: ['ضمادات متخصصة للجروح (هيدروجيل/فوم)', 'مضادات حيوية إن كان ملتهباً (بوصفة)', 'أدوية ضبط السكر', 'أجهزة تخفيف الضغط لقرح القدم'],
    stepsEn: ['Clean wound gently with saline', 'Apply prescribed wound dressing', 'Monitor blood sugar levels closely', 'Keep foot elevated and offloaded', 'See diabetic wound specialist urgently', 'Never walk barefoot'],
    stepsAr: ['نظف الجرح بلطف بمحلول ملحي', 'ضع الضمادة الموصوفة', 'راقب مستوى السكر عن كثب', 'ارفع القدم وخفف الضغط عنها', 'راجع أخصائي جروح السكري بشكل عاجل', 'لا تمشِ حافي القدمين أبداً'],
  },
  'Laceration': {
    titleEn: 'Laceration — Torn Wound',
    titleAr: 'تهتك — جرح ممزق',
    descEn: 'Irregular jagged wound with torn tissue edges, often from blunt force.',
    descAr: 'جرح غير منتظم بحواف ممزقة، غالباً من ضربة حادة.',
    actionEn: 'Seek Medical Attention',
    actionAr: 'اطلب الرعاية الطبية',
    urgency: 'doctor',
    medicationsEn: ['Sterile gauze for pressure', 'Sutures or staples (medical professional)', 'Antibiotics if infection risk', 'Tetanus injection if not current'],
    medicationsAr: ['شاش معقم للضغط', 'غرز أو تدبيس (متخصص طبي)', 'مضادات حيوية إن كان هناك خطر التهاب', 'حقنة تيتانوس إن لم تكن محدّثة'],
    stepsEn: ['Apply firm pressure 10–15 min', 'Do not remove embedded objects', 'Elevate if on limb', 'Seek medical care for stitching', 'Keep wound moist and covered'],
    stepsAr: ['اضغط بثبات 10–15 دقيقة', 'لا تزل الأجسام المغروسة بالجرح', 'ارفع الطرف المصاب', 'اطلب رعاية طبية للخياطة', 'حافظ على رطوبة الجرح وتغطيته'],
  },
  'Normal': {
    titleEn: 'Normal — No Wound Detected',
    titleAr: 'طبيعي — لا يوجد جرح',
    descEn: 'The image appears to show normal, healthy skin with no visible wound.',
    descAr: 'يبدو أن الصورة تُظهر جلداً طبيعياً وصحياً بدون جرح ظاهر.',
    actionEn: 'No Action Needed',
    actionAr: 'لا حاجة لإجراء',
    urgency: 'home',
    medicationsEn: ['No medications needed'],
    medicationsAr: ['لا حاجة لأدوية'],
    stepsEn: ['No treatment required', 'If you have concerns, consult a doctor'],
    stepsAr: ['لا حاجة لعلاج', 'إن كانت لديك مخاوف، استشر طبيباً'],
  },
  'Pressure Wounds': {
    titleEn: 'Pressure Wound — Bedsore',
    titleAr: 'قرحة ضغط — قرحة الفراش',
    descEn: 'Damage to skin and underlying tissue from prolonged pressure. Common in bedridden patients.',
    descAr: 'تلف الجلد والأنسجة تحته من الضغط المطوّل. شائع لدى المرضى طريحي الفراش.',
    actionEn: 'URGENT — Seek Medical Care',
    actionAr: 'عاجل — اطلب الرعاية الطبية',
    urgency: 'emergency',
    medicationsEn: ['Pressure-relieving mattress/cushion', 'Wound dressings (foam/hydrocolloid)', 'Antibiotics if infected (Rx)', 'Nutritional supplements (protein/vitamins)'],
    medicationsAr: ['فرشة/وسادة تخفيف الضغط', 'ضمادات جروح (فوم/هيدروكولويد)', 'مضادات حيوية إن كان ملتهباً (بوصفة)', 'مكملات غذائية (بروتين/فيتامينات)'],
    stepsEn: ['Reposition patient every 2 hours', 'Clean wound gently with saline', 'Apply appropriate wound dressing', 'Use pressure-relieving devices', 'Ensure adequate nutrition and hydration', 'Consult wound care specialist'],
    stepsAr: ['غيّر وضعية المريض كل ساعتين', 'نظف الجرح بلطف بمحلول ملحي', 'ضع ضمادة جرح مناسبة', 'استخدم أجهزة تخفيف الضغط', 'تأكد من التغذية والترطيب الكافي', 'استشر أخصائي رعاية الجروح'],
  },
  'Surgical Wounds': {
    titleEn: 'Surgical Wound — Post-operative',
    titleAr: 'جرح جراحي — بعد العملية',
    descEn: 'Wound resulting from a surgical procedure. Requires proper post-operative care.',
    descAr: 'جرح ناتج عن إجراء جراحي. يتطلب رعاية مناسبة بعد العملية.',
    actionEn: 'Follow Surgeon Instructions',
    actionAr: 'اتبع تعليمات الجراح',
    urgency: 'doctor',
    medicationsEn: ['Prescribed antibiotics', 'Pain management (as prescribed)', 'Sterile wound dressings', 'Antiseptic solution for cleaning'],
    medicationsAr: ['مضادات حيوية موصوفة', 'مسكنات الألم (حسب الوصفة)', 'ضمادات جروح معقمة', 'محلول مطهر للتنظيف'],
    stepsEn: ['Keep wound clean and dry', 'Change dressing as instructed', 'Watch for signs of infection (redness, swelling, pus)', 'Avoid heavy lifting or straining', 'Attend all follow-up appointments', 'Contact surgeon if wound opens or bleeds'],
    stepsAr: ['حافظ على نظافة وجفاف الجرح', 'غيّر الضمادة حسب التعليمات', 'راقب علامات الالتهاب (احمرار، تورم، صديد)', 'تجنب رفع الأثقال أو الإجهاد', 'احضر جميع مواعيد المتابعة', 'تواصل مع الجراح إن انفتح الجرح أو نزف'],
  },
  'Venous Wounds': {
    titleEn: 'Venous Wound — Venous Ulcer',
    titleAr: 'جرح وريدي — قرحة وريدية',
    descEn: 'Chronic wound caused by poor venous blood return, typically on lower legs.',
    descAr: 'جرح مزمن ناتج عن ضعف عودة الدم الوريدي، عادةً في أسفل الساقين.',
    actionEn: 'Seek Specialist Care',
    actionAr: 'راجع أخصائي',
    urgency: 'doctor',
    medicationsEn: ['Compression bandages/stockings', 'Wound dressings (alginate/foam)', 'Pentoxifylline (Rx)', 'Antibiotics if infected'],
    medicationsAr: ['ضمادات/جوارب ضاغطة', 'ضمادات جروح (ألجينات/فوم)', 'بنتوكسيفيلين (بوصفة)', 'مضادات حيوية إن كان ملتهباً'],
    stepsEn: ['Apply compression therapy as prescribed', 'Elevate legs above heart level when resting', 'Clean wound gently with saline', 'Apply appropriate wound dressing', 'Exercise regularly (walking)', 'See vascular specialist for evaluation'],
    stepsAr: ['طبّق علاج الضغط حسب الوصفة', 'ارفع الساقين فوق مستوى القلب عند الراحة', 'نظف الجرح بلطف بمحلول ملحي', 'ضع ضمادة جرح مناسبة', 'مارس الرياضة بانتظام (المشي)', 'راجع أخصائي أوعية دموية للتقييم'],
  },
};