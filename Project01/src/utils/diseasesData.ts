import {
  Stethoscope,
  Hand,
  Heart,
  Brain,
  Wind,
  Apple,
  Zap,
  Bug,
  Bone,
  SmilePlus,
  Droplets,
  Eye,
  Ear,
  Baby,
  Ribbon,
  Activity } from
'lucide-react';

export type DiseaseCategory =
'internal' |
'dermatology' |
'cardiology' |
'neurology' |
'respiratory' |
'gastro' |
'endocrine' |
'infectious' |
'orthopedic' |
'psychiatric' |
'urological' |
'ophthalmology' |
'ent' |
'pediatric' |
'oncology';

export type SeverityLevel = 'mild' | 'moderate' | 'severe';

export interface Disease {
  id: string;
  nameEn: string;
  nameAr: string;
  category: DiseaseCategory;
  severityLevel: SeverityLevel;
  isContagious: boolean;
  descriptionEn: string;
  descriptionAr: string;
  symptomsEn: string[];
  symptomsAr: string[];
  causesEn: string[];
  causesAr: string[];
  riskFactorsEn: string[];
  riskFactorsAr: string[];
  diagnosisEn: string[];
  diagnosisAr: string[];
  treatmentEn: string[];
  treatmentAr: string[];
  preventionEn: string[];
  preventionAr: string[];
}

export const CATEGORY_LABELS: Record<
  DiseaseCategory,
  {en: string;ar: string;}> =
{
  internal: { en: 'Internal Medicine', ar: 'الباطنة' },
  dermatology: { en: 'Dermatology', ar: 'الجلدية' },
  cardiology: { en: 'Cardiology', ar: 'القلب' },
  neurology: { en: 'Neurology', ar: 'الأعصاب' },
  respiratory: { en: 'Respiratory', ar: 'الجهاز التنفسي' },
  gastro: { en: 'Gastroenterology', ar: 'الجهاز الهضمي' },
  endocrine: { en: 'Endocrinology', ar: 'الغدد الصماء' },
  infectious: { en: 'Infectious Diseases', ar: 'الأمراض المعدية' },
  orthopedic: { en: 'Orthopedics', ar: 'العظام' },
  psychiatric: { en: 'Psychiatry', ar: 'الطب النفسي' },
  urological: { en: 'Urology', ar: 'المسالك البولية' },
  ophthalmology: { en: 'Ophthalmology', ar: 'العيون' },
  ent: { en: 'ENT', ar: 'الأنف والأذن والحنجرة' },
  pediatric: { en: 'Pediatrics', ar: 'الأطفال' },
  oncology: { en: 'Oncology', ar: 'الأورام' }
};

export const CATEGORY_ICONS: Record<DiseaseCategory, any> = {
  internal: Stethoscope,
  dermatology: Hand,
  cardiology: Heart,
  neurology: Brain,
  respiratory: Wind,
  gastro: Apple,
  endocrine: Zap,
  infectious: Bug,
  orthopedic: Bone,
  psychiatric: SmilePlus,
  urological: Droplets,
  ophthalmology: Eye,
  ent: Ear,
  pediatric: Baby,
  oncology: Ribbon
};

// Helper functions for API-like access
export function getDiseaseById(id: string): Disease | undefined {
  return diseasesData.find((d) => d.id === id);
}

export function searchDiseases(
query: string,
language: 'en' | 'ar')
: Disease[] {
  const lowerQuery = query.toLowerCase();
  return diseasesData.filter((d) => {
    const nameMatch =
    d.nameEn.toLowerCase().includes(lowerQuery) ||
    d.nameAr.includes(lowerQuery);
    const descMatch =
    d.descriptionEn.toLowerCase().includes(lowerQuery) ||
    d.descriptionAr.includes(lowerQuery);
    const sympMatch =
    d.symptomsEn.some((s) => s.toLowerCase().includes(lowerQuery)) ||
    d.symptomsAr.some((s) => s.includes(lowerQuery));

    return nameMatch || descMatch || sympMatch;
  });
}

export function filterByCategory(category: string): Disease[] {
  if (category === 'all') return diseasesData;
  return diseasesData.filter((d) => d.category === category);
}

// Comprehensive Database
export const diseasesData: Disease[] = [
// --- CARDIOLOGY ---
{
  id: 'cardio-1',
  nameEn: 'Hypertension',
  nameAr: 'ارتفاع ضغط الدم',
  category: 'cardiology',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'A condition in which the force of the blood against the artery walls is too high.',
  descriptionAr:
  'حالة تكون فيها قوة دفع الدم ضد جدران الشرايين مرتفعة للغاية.',
  symptomsEn: ['Headache', 'Shortness of breath', 'Nosebleeds', 'Dizziness'],
  symptomsAr: ['صداع', 'ضيق في التنفس', 'نزيف الأنف', 'دوار'],
  causesEn: ['Genetics', 'High salt intake', 'Stress', 'Obesity'],
  causesAr: ['الوراثة', 'تناول الملح بكثرة', 'التوتر', 'السمنة'],
  riskFactorsEn: [
  'Age',
  'Family history',
  'Being overweight',
  'Not physically active'],

  riskFactorsAr: [
  'العمر',
  'التاريخ العائلي',
  'زيادة الوزن',
  'قلة النشاط البدني'],

  diagnosisEn: ['Blood pressure measurement', 'ECG', 'Blood tests'],
  diagnosisAr: ['قياس ضغط الدم', 'تخطيط القلب', 'تحاليل الدم'],
  treatmentEn: [
  'ACE inhibitors',
  'Beta blockers',
  'Diuretics',
  'Lifestyle changes'],

  treatmentAr: [
  'مثبطات الإنزيم المحول للأنجيوتنسين',
  'حاصرات بيتا',
  'مدرات البول',
  'تغييرات نمط الحياة'],

  preventionEn: [
  'Healthy diet',
  'Regular exercise',
  'Reduce sodium',
  'Manage stress'],

  preventionAr: [
  'نظام غذائي صحي',
  'ممارسة الرياضة بانتظام',
  'تقليل الصوديوم',
  'إدارة التوتر']

},
{
  id: 'cardio-2',
  nameEn: 'Coronary Artery Disease',
  nameAr: 'مرض الشريان التاجي',
  category: 'cardiology',
  severityLevel: 'severe',
  isContagious: false,
  descriptionEn:
  'Narrowing or blockage of the coronary arteries, usually caused by atherosclerosis.',
  descriptionAr:
  'تضيق أو انسداد الشرايين التاجية، وعادة ما يكون بسبب تصلب الشرايين.',
  symptomsEn: [
  'Chest pain (angina)',
  'Shortness of breath',
  'Heart attack',
  'Fatigue'],

  symptomsAr: [
  'ألم في الصدر (ذبحة صدرية)',
  'ضيق في التنفس',
  'نوبة قلبية',
  'تعب'],

  causesEn: ['Plaque buildup', 'Inflammation in blood vessels'],
  causesAr: ['تراكم اللويحات', 'التهاب في الأوعية الدموية'],
  riskFactorsEn: [
  'High cholesterol',
  'Smoking',
  'Diabetes',
  'High blood pressure'],

  riskFactorsAr: [
  'ارتفاع الكوليسترول',
  'التدخين',
  'السكري',
  'ارتفاع ضغط الدم'],

  diagnosisEn: [
  'ECG',
  'Echocardiogram',
  'Stress test',
  'Cardiac catheterization'],

  diagnosisAr: [
  'تخطيط القلب',
  'مخطط صدى القلب',
  'اختبار الإجهاد',
  'القسطرة القلبية'],

  treatmentEn: ['Statins', 'Aspirin', 'Angioplasty', 'Bypass surgery'],
  treatmentAr: ['الستاتين', 'الأسبرين', 'رأب الوعاء', 'جراحة المجازة'],
  preventionEn: [
  'Quit smoking',
  'Control blood pressure',
  'Healthy diet',
  'Exercise'],

  preventionAr: [
  'الإقلاع عن التدخين',
  'السيطرة على ضغط الدم',
  'نظام غذائي صحي',
  'ممارسة الرياضة']

},
{
  id: 'cardio-3',
  nameEn: 'Heart Failure',
  nameAr: 'قصور القلب',
  category: 'cardiology',
  severityLevel: 'severe',
  isContagious: false,
  descriptionEn:
  "A chronic condition in which the heart doesn't pump blood as well as it should.",
  descriptionAr: 'حالة مزمنة لا يضخ فيها القلب الدم كما ينبغي.',
  symptomsEn: [
  'Shortness of breath',
  'Fatigue',
  'Swollen legs',
  'Rapid heartbeat'],

  symptomsAr: ['ضيق في التنفس', 'تعب', 'تورم الساقين', 'سرعة ضربات القلب'],
  causesEn: [
  'Coronary artery disease',
  'High blood pressure',
  'Faulty heart valves'],

  causesAr: ['مرض الشريان التاجي', 'ارتفاع ضغط الدم', 'صمامات القلب المعيبة'],
  riskFactorsEn: ['Diabetes', 'Sleep apnea', 'Obesity', 'Viruses'],
  riskFactorsAr: ['السكري', 'انقطاع النفس النومي', 'السمنة', 'الفيروسات'],
  diagnosisEn: ['Blood tests', 'Chest X-ray', 'Echocardiogram'],
  diagnosisAr: ['تحاليل الدم', 'الأشعة السينية للصدر', 'مخطط صدى القلب'],
  treatmentEn: [
  'Diuretics',
  'Beta blockers',
  'Pacemaker',
  'Heart transplant'],

  treatmentAr: [
  'مدرات البول',
  'حاصرات بيتا',
  'جهاز تنظيم ضربات القلب',
  'زراعة القلب'],

  preventionEn: [
  'Control conditions that cause heart failure',
  'Stay active',
  'Reduce salt'],

  preventionAr: [
  'السيطرة على الحالات التي تسبب قصور القلب',
  'البقاء نشطاً',
  'تقليل الملح']

},
{
  id: 'cardio-4',
  nameEn: 'Atrial Fibrillation',
  nameAr: 'الرجفان الأذيني',
  category: 'cardiology',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'An irregular, often rapid heart rate that commonly causes poor blood flow.',
  descriptionAr:
  'معدل ضربات قلب غير منتظم وغالباً ما يكون سريعاً يسبب ضعف تدفق الدم.',
  symptomsEn: [
  'Palpitations',
  'Weakness',
  'Reduced ability to exercise',
  'Dizziness'],

  symptomsAr: ['خفقان', 'ضعف', 'انخفاض القدرة على ممارسة الرياضة', 'دوار'],
  causesEn: ['High blood pressure', 'Heart attacks', 'Abnormal heart valves'],
  causesAr: [
  'ارتفاع ضغط الدم',
  'النوبات القلبية',
  'صمامات القلب غير الطبيعية'],

  riskFactorsEn: [
  'Age',
  'Heart disease',
  'High blood pressure',
  'Binge drinking'],

  riskFactorsAr: [
  'العمر',
  'أمراض القلب',
  'ارتفاع ضغط الدم',
  'الإفراط في الشرب'],

  diagnosisEn: ['ECG', 'Holter monitor', 'Echocardiogram'],
  diagnosisAr: ['تخطيط القلب', 'جهاز هولتر', 'مخطط صدى القلب'],
  treatmentEn: [
  'Blood thinners',
  'Heart rate control medications',
  'Cardioversion'],

  treatmentAr: [
  'مميعات الدم',
  'أدوية التحكم في معدل ضربات القلب',
  'تقويم نظم القلب'],

  preventionEn: [
  'Heart-healthy diet',
  'Regular physical activity',
  'Avoid excessive alcohol'],

  preventionAr: [
  'نظام غذائي صحي للقلب',
  'النشاط البدني المنتظم',
  'تجنب الكحول المفرط']

},

// --- RESPIRATORY ---
{
  id: 'resp-1',
  nameEn: 'Asthma',
  nameAr: 'الربو',
  category: 'respiratory',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'A condition in which your airways narrow and swell and may produce extra mucus.',
  descriptionAr:
  'حالة تضيق فيها المسالك الهوائية وتتضخم وقد تنتج مخاطاً إضافياً.',
  symptomsEn: [
  'Shortness of breath',
  'Chest tightness',
  'Wheezing',
  'Coughing'],

  symptomsAr: ['ضيق التنفس', 'ضيق الصدر', 'أزيز', 'سعال'],
  causesEn: [
  'Airborne allergens',
  'Respiratory infections',
  'Physical activity'],

  causesAr: [
  'مسببات الحساسية المحمولة جواً',
  'التهابات الجهاز التنفسي',
  'النشاط البدني'],

  riskFactorsEn: ['Family history', 'Allergies', 'Overweight', 'Smoking'],
  riskFactorsAr: ['التاريخ العائلي', 'الحساسية', 'زيادة الوزن', 'التدخين'],
  diagnosisEn: ['Spirometry', 'Peak flow', 'Allergy testing'],
  diagnosisAr: ['قياس التنفس', 'تدفق الذروة', 'اختبار الحساسية'],
  treatmentEn: [
  'Inhaled corticosteroids',
  'Short-acting beta agonists',
  'Allergy medications'],

  treatmentAr: [
  'الكورتيكوستيرويدات المستنشقة',
  'منبهات بيتا قصيرة المفعول',
  'أدوية الحساسية'],

  preventionEn: [
  'Identify and avoid triggers',
  'Get vaccinated for influenza',
  'Monitor breathing'],

  preventionAr: [
  'تحديد وتجنب المثيرات',
  'الحصول على لقاح الإنفلونزا',
  'مراقبة التنفس']

},
{
  id: 'resp-2',
  nameEn: 'Chronic Obstructive Pulmonary Disease (COPD)',
  nameAr: 'مرض الانسداد الرئوي المزمن',
  category: 'respiratory',
  severityLevel: 'severe',
  isContagious: false,
  descriptionEn:
  'A chronic inflammatory lung disease that causes obstructed airflow from the lungs.',
  descriptionAr: 'مرض رئوي التهابي مزمن يسبب انسداد تدفق الهواء من الرئتين.',
  symptomsEn: [
  'Shortness of breath',
  'Wheezing',
  'Chest tightness',
  'Chronic cough'],

  symptomsAr: ['ضيق التنفس', 'أزيز', 'ضيق الصدر', 'سعال مزمن'],
  causesEn: ['Tobacco smoking', 'Indoor air pollution', 'Occupational dusts'],
  causesAr: ['تدخين التبغ', 'تلوث الهواء الداخلي', 'الغبار المهني'],
  riskFactorsEn: [
  'Exposure to tobacco smoke',
  'Asthma',
  'Occupational exposure to dusts'],

  riskFactorsAr: ['التعرض لدخان التبغ', 'الربو', 'التعرض المهني للغبار'],
  diagnosisEn: [
  'Lung function tests',
  'Chest X-ray',
  'CT scan',
  'Arterial blood gas analysis'],

  diagnosisAr: [
  'اختبارات وظائف الرئة',
  'الأشعة السينية للصدر',
  'الأشعة المقطعية',
  'تحليل غازات الدم الشرياني'],

  treatmentEn: [
  'Bronchodilators',
  'Inhaled steroids',
  'Oxygen therapy',
  'Pulmonary rehabilitation'],

  treatmentAr: [
  'موسعات الشعب الهوائية',
  'المنشطات المستنشقة',
  'العلاج بالأكسجين',
  'إعادة التأهيل الرئوي'],

  preventionEn: [
  'Quit smoking',
  'Avoid occupational exposures',
  'Get vaccinated'],

  preventionAr: [
  'الإقلاع عن التدخين',
  'تجنب التعرض المهني',
  'الحصول على التطعيم']

},
{
  id: 'resp-3',
  nameEn: 'Pneumonia',
  nameAr: 'الالتهاب الرئوي',
  category: 'respiratory',
  severityLevel: 'severe',
  isContagious: true,
  descriptionEn:
  'An infection that inflames the air sacs in one or both lungs.',
  descriptionAr:
  'عدوى تؤدي إلى التهاب الأكياس الهوائية في إحدى الرئتين أو كلتيهما.',
  symptomsEn: [
  'Chest pain',
  'Cough with phlegm',
  'Fatigue',
  'Fever, sweating and shaking chills'],

  symptomsAr: ['ألم في الصدر', 'سعال مع بلغم', 'تعب', 'حمى وتعرق وقشعريرة'],
  causesEn: ['Bacteria', 'Viruses', 'Fungi'],
  causesAr: ['البكتيريا', 'الفيروسات', 'الفطريات'],
  riskFactorsEn: [
  'Age (under 2 or over 65)',
  'Hospitalization',
  'Chronic disease',
  'Smoking'],

  riskFactorsAr: [
  'العمر (أقل من 2 أو أكثر من 65)',
  'التنويم في المستشفى',
  'مرض مزمن',
  'التدخين'],

  diagnosisEn: [
  'Chest X-ray',
  'Blood tests',
  'Pulse oximetry',
  'Sputum test'],

  diagnosisAr: [
  'الأشعة السينية للصدر',
  'تحاليل الدم',
  'قياس التأكسج النبضي',
  'اختبار البلغم'],

  treatmentEn: [
  'Antibiotics',
  'Cough medicine',
  'Fever reducers',
  'Pain relievers'],

  treatmentAr: [
  'المضادات الحيوية',
  'أدوية السعال',
  'خافضات الحرارة',
  'مسكنات الألم'],

  preventionEn: [
  'Get vaccinated',
  'Practice good hygiene',
  "Don't smoke",
  'Keep immune system strong'],

  preventionAr: [
  'الحصول على التطعيم',
  'ممارسة النظافة الجيدة',
  'عدم التدخين',
  'الحفاظ على قوة جهاز المناعة']

},

// --- ENDOCRINE ---
{
  id: 'endo-1',
  nameEn: 'Type 2 Diabetes',
  nameAr: 'السكري من النوع الثاني',
  category: 'endocrine',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'A chronic condition that affects the way the body processes blood sugar (glucose).',
  descriptionAr:
  'حالة مزمنة تؤثر على طريقة معالجة الجسم لسكر الدم (الجلوكوز).',
  symptomsEn: [
  'Increased thirst',
  'Frequent urination',
  'Increased hunger',
  'Unintended weight loss'],

  symptomsAr: [
  'زيادة العطش',
  'كثرة التبول',
  'زيادة الجوع',
  'فقدان الوزن غير المقصود'],

  causesEn: [
  'Insulin resistance',
  'Pancreas inability to produce enough insulin'],

  causesAr: [
  'مقاومة الأنسولين',
  'عدم قدرة البنكرياس على إنتاج ما يكفي من الأنسولين'],

  riskFactorsEn: [
  'Weight',
  'Fat distribution',
  'Inactivity',
  'Family history'],

  riskFactorsAr: ['الوزن', 'توزيع الدهون', 'الخمول', 'التاريخ العائلي'],
  diagnosisEn: [
  'A1C test',
  'Fasting blood sugar test',
  'Oral glucose tolerance test'],

  diagnosisAr: [
  'اختبار A1C',
  'اختبار سكر الدم الصائم',
  'اختبار تحمل الجلوكوز الفموي'],

  treatmentEn: [
  'Weight loss',
  'Healthy eating',
  'Regular exercise',
  'Diabetes medication or insulin therapy'],

  treatmentAr: [
  'فقدان الوزن',
  'الأكل الصحي',
  'ممارسة الرياضة بانتظام',
  'أدوية السكري أو العلاج بالأنسولين'],

  preventionEn: [
  'Eat healthy foods',
  'Get active',
  'Lose weight',
  'Avoid sitting for long periods'],

  preventionAr: [
  'تناول الأطعمة الصحية',
  'كن نشطاً',
  'افقد الوزن',
  'تجنب الجلوس لفترات طويلة']

},
{
  id: 'endo-2',
  nameEn: 'Hypothyroidism',
  nameAr: 'قصور الغدة الدرقية',
  category: 'endocrine',
  severityLevel: 'mild',
  isContagious: false,
  descriptionEn:
  "A condition in which your thyroid gland doesn't produce enough of certain crucial hormones.",
  descriptionAr:
  'حالة لا تنتج فيها الغدة الدرقية ما يكفي من بعض الهرمونات الحيوية.',
  symptomsEn: [
  'Fatigue',
  'Increased sensitivity to cold',
  'Constipation',
  'Dry skin',
  'Weight gain'],

  symptomsAr: [
  'تعب',
  'زيادة الحساسية للبرد',
  'إمساك',
  'جفاف الجلد',
  'زيادة الوزن'],

  causesEn: [
  "Autoimmune disease (Hashimoto's)",
  'Thyroid surgery',
  'Radiation therapy'],

  causesAr: [
  'مرض مناعي ذاتي (هاشيموتو)',
  'جراحة الغدة الدرقية',
  'العلاج الإشعاعي'],

  riskFactorsEn: [
  'Being female',
  'Older than 60',
  'Family history of thyroid disease'],

  riskFactorsAr: [
  'أن تكوني أنثى',
  'أكبر من 60 عاماً',
  'تاريخ عائلي لمرض الغدة الدرقية'],

  diagnosisEn: ['Blood tests (TSH and thyroxine)'],
  diagnosisAr: ['تحاليل الدم (TSH والثيروكسين)'],
  treatmentEn: ['Synthetic thyroid hormone (Levothyroxine)'],
  treatmentAr: ['هرمون الغدة الدرقية الاصطناعي (ليفوثيروكسين)'],
  preventionEn: ['No sure way to prevent, early detection is key'],
  preventionAr: ['لا توجد طريقة مؤكدة للوقاية، الاكتشاف المبكر هو المفتاح']
},
{
  id: 'endo-3',
  nameEn: 'Hyperthyroidism',
  nameAr: 'فرط نشاط الغدة الدرقية',
  category: 'endocrine',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'A condition in which your thyroid gland produces too much of the hormone thyroxine.',
  descriptionAr: 'حالة تنتج فيها الغدة الدرقية الكثير من هرمون الثيروكسين.',
  symptomsEn: [
  'Unintentional weight loss',
  'Rapid heartbeat',
  'Irregular heartbeat',
  'Increased appetite'],

  symptomsAr: [
  'فقدان الوزن غير المقصود',
  'سرعة ضربات القلب',
  'عدم انتظام ضربات القلب',
  'زيادة الشهية'],

  causesEn: [
  "Graves' disease",
  'Hyperfunctioning thyroid nodules',
  'Thyroiditis'],

  causesAr: [
  'مرض جريفز',
  'عقد الغدة الدرقية مفرطة النشاط',
  'التهاب الغدة الدرقية'],

  riskFactorsEn: [
  'Family history',
  'Being female',
  'Personal history of certain chronic illnesses'],

  riskFactorsAr: [
  'التاريخ العائلي',
  'أن تكوني أنثى',
  'تاريخ شخصي لبعض الأمراض المزمنة'],

  diagnosisEn: [
  'Blood tests (TSH, T3, T4)',
  'Radioiodine uptake test',
  'Thyroid scan'],

  diagnosisAr: [
  'تحاليل الدم (TSH، T3، T4)',
  'اختبار امتصاص اليود المشع',
  'فحص الغدة الدرقية'],

  treatmentEn: [
  'Anti-thyroid medications',
  'Radioactive iodine',
  'Beta blockers',
  'Surgery'],

  treatmentAr: [
  'الأدوية المضادة للغدة الدرقية',
  'اليود المشع',
  'حاصرات بيتا',
  'الجراحة'],

  preventionEn: ['Cannot be prevented, but can be managed'],
  preventionAr: ['لا يمكن الوقاية منه، ولكن يمكن إدارته']
},

// --- NEUROLOGY ---
{
  id: 'neuro-1',
  nameEn: 'Migraine',
  nameAr: 'الصداع النصفي (الشقيقة)',
  category: 'neurology',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'A headache that can cause severe throbbing pain or a pulsing sensation, usually on one side of the head.',
  descriptionAr:
  'صداع يمكن أن يسبب ألماً نابضاً شديداً أو إحساساً بالنبض، عادة في جانب واحد من الرأس.',
  symptomsEn: [
  'Pain on one side of head',
  'Throbbing pain',
  'Sensitivity to light and sound',
  'Nausea'],

  symptomsAr: [
  'ألم في جانب واحد من الرأس',
  'ألم نابض',
  'حساسية للضوء والصوت',
  'غثيان'],

  causesEn: ['Genetics', 'Environmental factors', 'Changes in brainstem'],
  causesAr: ['الوراثة', 'العوامل البيئية', 'تغيرات في جذع الدماغ'],
  riskFactorsEn: [
  'Family history',
  'Age',
  'Sex (women are more likely)',
  'Hormonal changes'],

  riskFactorsAr: [
  'التاريخ العائلي',
  'العمر',
  'الجنس (النساء أكثر عرضة)',
  'التغيرات الهرمونية'],

  diagnosisEn: ['Neurological exam', 'MRI', 'CT scan'],
  diagnosisAr: ['الفحص العصبي', 'الرنين المغناطيسي', 'الأشعة المقطعية'],
  treatmentEn: [
  'Pain relievers',
  'Triptans',
  'Preventive medications',
  'Botox injections'],

  treatmentAr: [
  'مسكنات الألم',
  'أدوية التريبتان',
  'الأدوية الوقائية',
  'حقن البوتوكس'],

  preventionEn: [
  'Avoid triggers',
  'Establish a daily routine',
  'Exercise regularly',
  'Manage stress'],

  preventionAr: [
  'تجنب المثيرات',
  'إنشاء روتين يومي',
  'ممارسة الرياضة بانتظام',
  'إدارة التوتر']

},
{
  id: 'neuro-2',
  nameEn: "Alzheimer's Disease",
  nameAr: 'مرض الزهايمر',
  category: 'neurology',
  severityLevel: 'severe',
  isContagious: false,
  descriptionEn:
  'A progressive neurologic disorder that causes the brain to shrink and brain cells to die.',
  descriptionAr:
  'اضطراب عصبي تدريجي يؤدي إلى انكماش الدماغ وموت خلايا الدماغ.',
  symptomsEn: [
  'Memory loss',
  'Difficulty planning',
  'Confusion with time or place',
  'Changes in mood'],

  symptomsAr: [
  'فقدان الذاكرة',
  'صعوبة في التخطيط',
  'ارتباك في الزمان أو المكان',
  'تغيرات في المزاج'],

  causesEn: ['Plaques (amyloid)', 'Tangles (tau)', 'Genetics'],
  causesAr: ['لويحات (أميلويد)', 'تشابكات (تاو)', 'الوراثة'],
  riskFactorsEn: [
  'Age',
  'Family history',
  'Genetics',
  'Down syndrome',
  'Head trauma'],

  riskFactorsAr: [
  'العمر',
  'التاريخ العائلي',
  'الوراثة',
  'متلازمة داون',
  'صدمة الرأس'],

  diagnosisEn: [
  'Physical and neurological exam',
  'Lab tests',
  'Mental status testing',
  'Brain imaging'],

  diagnosisAr: [
  'الفحص البدني والعصبي',
  'الاختبارات المعملية',
  'اختبار الحالة العقلية',
  'تصوير الدماغ'],

  treatmentEn: [
  'Cholinesterase inhibitors',
  'Memantine',
  'Creating a safe environment'],

  treatmentAr: ['مثبطات الكولينستريز', 'ميمانتين', 'خلق بيئة آمنة'],
  preventionEn: [
  'Exercise regularly',
  'Eat a diet of fresh produce',
  'Manage high blood pressure'],

  preventionAr: [
  'ممارسة الرياضة بانتظام',
  'تناول نظام غذائي من المنتجات الطازجة',
  'إدارة ارتفاع ضغط الدم']

},
{
  id: 'neuro-3',
  nameEn: 'Epilepsy',
  nameAr: 'الصرع',
  category: 'neurology',
  severityLevel: 'severe',
  isContagious: false,
  descriptionEn:
  'A central nervous system disorder in which brain activity becomes abnormal, causing seizures.',
  descriptionAr:
  'اضطراب في الجهاز العصبي المركزي يصبح فيه نشاط الدماغ غير طبيعي، مما يسبب نوبات.',
  symptomsEn: [
  'Temporary confusion',
  'Staring spell',
  'Uncontrollable jerking movements',
  'Loss of consciousness'],

  symptomsAr: [
  'ارتباك مؤقت',
  'نوبة تحديق',
  'حركات نفضية لا يمكن السيطرة عليها',
  'فقدان الوعي'],

  causesEn: [
  'Genetic influence',
  'Head trauma',
  'Brain conditions',
  'Infectious diseases'],

  causesAr: ['تأثير وراثي', 'صدمة الرأس', 'حالات الدماغ', 'الأمراض المعدية'],
  riskFactorsEn: [
  'Age',
  'Family history',
  'Head injuries',
  'Stroke and other vascular diseases'],

  riskFactorsAr: [
  'العمر',
  'التاريخ العائلي',
  'إصابات الرأس',
  'السكتة الدماغية وأمراض الأوعية الدموية الأخرى'],

  diagnosisEn: ['Neurological exam', 'Blood tests', 'EEG', 'CT scan', 'MRI'],
  diagnosisAr: [
  'الفحص العصبي',
  'تحاليل الدم',
  'تخطيط كهربية الدماغ',
  'الأشعة المقطعية',
  'الرنين المغناطيسي'],

  treatmentEn: [
  'Anti-seizure medications',
  'Vagus nerve stimulation',
  'Ketogenic diet',
  'Brain surgery'],

  treatmentAr: [
  'الأدوية المضادة للنوبات',
  'تحفيز العصب المبهم',
  'النظام الغذائي الكيتوني',
  'جراحة الدماغ'],

  preventionEn: [
  'Prevent head injuries',
  'Lower chances of stroke',
  'Wash hands to prevent infections'],

  preventionAr: [
  'منع إصابات الرأس',
  'تقليل فرص الإصابة بالسكتة الدماغية',
  'غسل اليدين لمنع العدوى']

},

// --- DERMATOLOGY ---
{
  id: 'derm-1',
  nameEn: 'Acne Vulgaris',
  nameAr: 'حب الشباب',
  category: 'dermatology',
  severityLevel: 'mild',
  isContagious: false,
  descriptionEn:
  'A skin condition that occurs when your hair follicles become plugged with oil and dead skin cells.',
  descriptionAr:
  'حالة جلدية تحدث عندما تنسد بصيلات الشعر بالزيت وخلايا الجلد الميتة.',
  symptomsEn: [
  'Whiteheads',
  'Blackheads',
  'Small red, tender bumps',
  'Pimples'],

  symptomsAr: [
  'رؤوس بيضاء',
  'رؤوس سوداء',
  'نتوءات حمراء صغيرة ومؤلمة',
  'بثور'],

  causesEn: [
  'Excess oil production',
  'Hair follicles clogged by oil',
  'Bacteria',
  'Inflammation'],

  causesAr: [
  'إنتاج الزيت الزائد',
  'انسداد بصيلات الشعر بالزيت',
  'البكتيريا',
  'الالتهاب'],

  riskFactorsEn: [
  'Age (teenagers)',
  'Hormonal changes',
  'Family history',
  'Greasy substances'],

  riskFactorsAr: [
  'العمر (المراهقون)',
  'التغيرات الهرمونية',
  'التاريخ العائلي',
  'المواد الدهنية'],

  diagnosisEn: ['Visual examination by a dermatologist'],
  diagnosisAr: ['الفحص البصري من قبل طبيب أمراض جلدية'],
  treatmentEn: [
  'Topical medications',
  'Oral antibiotics',
  'Isotretinoin',
  'Light therapy'],

  treatmentAr: [
  'الأدوية الموضعية',
  'المضادات الحيوية الفموية',
  'الآيزوتريتينوين',
  'العلاج بالضوء'],

  preventionEn: [
  'Wash face twice daily',
  'Use noncomedogenic products',
  'Avoid touching face'],

  preventionAr: [
  'غسل الوجه مرتين يومياً',
  'استخدام منتجات لا تسد المسام',
  'تجنب لمس الوجه']

},
{
  id: 'derm-2',
  nameEn: 'Eczema (Atopic Dermatitis)',
  nameAr: 'الإكزيما (التهاب الجلد التأتبي)',
  category: 'dermatology',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  "A condition that makes your skin red and itchy. It's common in children but can occur at any age.",
  descriptionAr:
  'حالة تجعل بشرتك حمراء ومثيرة للحكة. إنها شائعة عند الأطفال ولكن يمكن أن تحدث في أي عمر.',
  symptomsEn: [
  'Dry skin',
  'Itching',
  'Red to brownish-gray patches',
  'Small, raised bumps'],

  symptomsAr: [
  'جفاف الجلد',
  'حكة',
  'بقع حمراء إلى بنية رمادية',
  'نتوءات صغيرة بارزة'],

  causesEn: [
  "Gene variation that affects skin's ability to retain moisture",
  'Immune system dysfunction'],

  causesAr: [
  'اختلاف جيني يؤثر على قدرة الجلد على الاحتفاظ بالرطوبة',
  'خلل في جهاز المناعة'],

  riskFactorsEn: [
  'Personal or family history of eczema, allergies, hay fever or asthma'],

  riskFactorsAr: [
  'تاريخ شخصي أو عائلي للإكزيما أو الحساسية أو حمى القش أو الربو'],

  diagnosisEn: [
  'Examination of the skin',
  'Review of medical history',
  'Patch testing'],

  diagnosisAr: ['فحص الجلد', 'مراجعة التاريخ الطبي', 'اختبار الرقعة'],
  treatmentEn: [
  'Corticosteroid creams',
  'Calcineurin inhibitors',
  'Antibiotics',
  'Light therapy'],

  treatmentAr: [
  'كريمات الكورتيكوستيرويد',
  'مثبطات الكالسينيورين',
  'المضادات الحيوية',
  'العلاج بالضوء'],

  preventionEn: [
  'Moisturize skin twice a day',
  'Identify and avoid triggers',
  'Take shorter baths'],

  preventionAr: [
  'ترطيب البشرة مرتين في اليوم',
  'تحديد وتجنب المثيرات',
  'أخذ حمامات أقصر']

},
{
  id: 'derm-3',
  nameEn: 'Psoriasis',
  nameAr: 'الصدفية',
  category: 'dermatology',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'A skin disease that causes red, itchy scaly patches, most commonly on the knees, elbows, trunk and scalp.',
  descriptionAr:
  'مرض جلدي يسبب بقعاً حمراء متقشرة ومثيرة للحكة، غالباً على الركبتين والمرفقين والجذع وفروة الرأس.',
  symptomsEn: [
  'Red patches of skin covered with thick, silvery scales',
  'Dry, cracked skin',
  'Itching, burning or soreness'],

  symptomsAr: [
  'بقع حمراء من الجلد مغطاة بقشور فضية سميكة',
  'جلد جاف ومتشقق',
  'حكة أو حرقان أو وجع'],

  causesEn: ['Immune system problem', 'Genetics', 'Environmental triggers'],
  causesAr: ['مشكلة في جهاز المناعة', 'الوراثة', 'مثيرات بيئية'],
  riskFactorsEn: [
  'Family history',
  'Viral and bacterial infections',
  'Stress',
  'Obesity',
  'Smoking'],

  riskFactorsAr: [
  'التاريخ العائلي',
  'الالتهابات الفيروسية والبكتيرية',
  'التوتر',
  'السمنة',
  'التدخين'],

  diagnosisEn: ['Physical exam and medical history', 'Skin biopsy'],
  diagnosisAr: ['الفحص البدني والتاريخ الطبي', 'خزعة الجلد'],
  treatmentEn: [
  'Topical corticosteroids',
  'Vitamin D analogues',
  'Light therapy',
  'Oral or injected medications'],

  treatmentAr: [
  'الكورتيكوستيرويدات الموضعية',
  'نظائر فيتامين د',
  'العلاج بالضوء',
  'الأدوية الفموية أو المحقونة'],

  preventionEn: [
  'Avoid triggers like stress, smoking, and skin injuries',
  'Use moisturizer'],

  preventionAr: [
  'تجنب المثيرات مثل التوتر والتدخين وإصابات الجلد',
  'استخدام مرطب']

},

// --- INFECTIOUS ---
{
  id: 'inf-1',
  nameEn: 'COVID-19',
  nameAr: 'كوفيد-19',
  category: 'infectious',
  severityLevel: 'severe',
  isContagious: true,
  descriptionEn: 'An infectious disease caused by the SARS-CoV-2 virus.',
  descriptionAr: 'مرض معد يسببه فيروس سارس-كوف-2.',
  symptomsEn: [
  'Fever',
  'Cough',
  'Tiredness',
  'Loss of taste or smell',
  'Difficulty breathing'],

  symptomsAr: [
  'حمى',
  'سعال',
  'تعب',
  'فقدان حاسة التذوق أو الشم',
  'صعوبة في التنفس'],

  causesEn: ['SARS-CoV-2 virus'],
  causesAr: ['فيروس سارس-كوف-2'],
  riskFactorsEn: [
  'Older age',
  'Underlying medical conditions',
  'Unvaccinated status'],

  riskFactorsAr: [
  'التقدم في العمر',
  'الحالات الطبية الأساسية',
  'عدم تلقي اللقاح'],

  diagnosisEn: ['PCR test', 'Antigen rapid test'],
  diagnosisAr: ['اختبار PCR', 'اختبار المستضد السريع'],
  treatmentEn: [
  'Rest and fluid intake',
  'Pain relievers',
  'Antiviral medications',
  'Oxygen therapy for severe cases'],

  treatmentAr: [
  'الراحة وتناول السوائل',
  'مسكنات الألم',
  'الأدوية المضادة للفيروسات',
  'العلاج بالأكسجين للحالات الشديدة'],

  preventionEn: [
  'Vaccination',
  'Wearing masks',
  'Physical distancing',
  'Hand hygiene'],

  preventionAr: [
  'التطعيم',
  'ارتداء الكمامات',
  'التباعد الجسدي',
  'نظافة اليدين']

},
{
  id: 'inf-2',
  nameEn: 'Influenza (Flu)',
  nameAr: 'الإنفلونزا',
  category: 'infectious',
  severityLevel: 'moderate',
  isContagious: true,
  descriptionEn:
  'A viral infection that attacks your respiratory system — your nose, throat and lungs.',
  descriptionAr: 'عدوى فيروسية تهاجم جهازك التنفسي — أنفك وحلقك ورئتيك.',
  symptomsEn: [
  'Fever',
  'Aching muscles',
  'Chills and sweats',
  'Headache',
  'Dry, persistent cough'],

  symptomsAr: [
  'حمى',
  'آلام في العضلات',
  'قشعريرة وتعرق',
  'صداع',
  'سعال جاف ومستمر'],

  causesEn: ['Influenza viruses traveling through the air in droplets'],
  causesAr: ['فيروسات الإنفلونزا التي تنتقل عبر الهواء في قطرات'],
  riskFactorsEn: [
  'Age (under 5 or over 65)',
  'Living or working conditions',
  'Weakened immune system'],

  riskFactorsAr: [
  'العمر (أقل من 5 أو أكثر من 65)',
  'ظروف المعيشة أو العمل',
  'ضعف جهاز المناعة'],

  diagnosisEn: ['Physical exam', 'Rapid influenza diagnostic tests (RIDTs)'],
  diagnosisAr: ['الفحص البدني', 'اختبارات التشخيص السريع للإنفلونزا (RIDTs)'],
  treatmentEn: [
  'Rest and plenty of fluids',
  'Antiviral drugs (e.g., Oseltamivir)'],

  treatmentAr: [
  'الراحة والكثير من السوائل',
  'الأدوية المضادة للفيروسات (مثل أوسيلتاميفير)'],

  preventionEn: [
  'Annual flu vaccine',
  'Wash hands frequently',
  'Avoid touching face'],

  preventionAr: [
  'لقاح الإنفلونزا السنوي',
  'غسل اليدين بشكل متكرر',
  'تجنب لمس الوجه']

},
{
  id: 'inf-3',
  nameEn: 'Tuberculosis (TB)',
  nameAr: 'السل',
  category: 'infectious',
  severityLevel: 'severe',
  isContagious: true,
  descriptionEn:
  'A potentially serious infectious bacterial disease that mainly affects the lungs.',
  descriptionAr: 'مرض بكتيري معدي خطير محتمل يؤثر بشكل رئيسي على الرئتين.',
  symptomsEn: [
  'Coughing for three or more weeks',
  'Coughing up blood',
  'Chest pain',
  'Unintentional weight loss'],

  symptomsAr: [
  'سعال لمدة ثلاثة أسابيع أو أكثر',
  'سعال مصحوب بدم',
  'ألم في الصدر',
  'فقدان الوزن غير المقصود'],

  causesEn: ['Mycobacterium tuberculosis bacteria'],
  causesAr: ['بكتيريا المتفطرة السلية'],
  riskFactorsEn: [
  'Weakened immune system',
  'Traveling or living in certain areas',
  'Poverty and substance use'],

  riskFactorsAr: [
  'ضعف جهاز المناعة',
  'السفر أو العيش في مناطق معينة',
  'الفقر وتعاطي المخدرات'],

  diagnosisEn: ['TB skin test', 'Blood tests', 'Chest X-ray', 'Sputum tests'],
  diagnosisAr: [
  'اختبار السل الجلدي',
  'تحاليل الدم',
  'الأشعة السينية للصدر',
  'اختبارات البلغم'],

  treatmentEn: ['Antibiotics for 6 to 9 months (Isoniazid, Rifampin)'],
  treatmentAr: ['مضادات حيوية لمدة 6 إلى 9 أشهر (أيزونيازيد، ريفامبين)'],
  preventionEn: ['BCG vaccination', 'Stay home when sick', 'Ventilate rooms'],
  preventionAr: ['تطعيم BCG', 'البقاء في المنزل عند المرض', 'تهوية الغرف']
},

// --- GASTROENTEROLOGY ---
{
  id: 'gastro-1',
  nameEn: 'Gastroesophageal Reflux Disease (GERD)',
  nameAr: 'مرض الارتجاع المعدي المريئي',
  category: 'gastro',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'A digestive disorder that occurs when acidic stomach juices, or food and fluids back up from the stomach into the esophagus.',
  descriptionAr:
  'اضطراب هضمي يحدث عندما تعود عصارة المعدة الحمضية أو الطعام والسوائل من المعدة إلى المريء.',
  symptomsEn: [
  'Heartburn',
  'Chest pain',
  'Difficulty swallowing',
  'Regurgitation of food or sour liquid'],

  symptomsAr: [
  'حرقة المعدة',
  'ألم في الصدر',
  'صعوبة في البلع',
  'ارتجاع الطعام أو السائل الحامض'],

  causesEn: ['Frequent acid reflux', 'Weak lower esophageal sphincter'],
  causesAr: ['الارتجاع الحمضي المتكرر', 'ضعف العضلة العاصرة المريئية السفلى'],
  riskFactorsEn: [
  'Obesity',
  'Bulging of the top of the stomach up into the diaphragm (hiatal hernia)',
  'Pregnancy',
  'Smoking'],

  riskFactorsAr: [
  'السمنة',
  'بروز الجزء العلوي من المعدة إلى الحجاب الحاجز (فتق الحجاب الحاجز)',
  'الحمل',
  'التدخين'],

  diagnosisEn: [
  'Upper endoscopy',
  'Ambulatory acid (pH) probe test',
  'Esophageal manometry'],

  diagnosisAr: [
  'التنظير الداخلي العلوي',
  'اختبار مسبار الحمض المتنقل (pH)',
  'قياس ضغط المريء'],

  treatmentEn: [
  'Antacids',
  'H-2-receptor blockers',
  'Proton pump inhibitors',
  'Surgery (Fundoplication)'],

  treatmentAr: [
  'مضادات الحموضة',
  'حاصرات مستقبلات H-2',
  'مثبطات مضخة البروتون',
  'الجراحة (تثنية القاع)'],

  preventionEn: [
  'Maintain a healthy weight',
  'Stop smoking',
  'Elevate the head of your bed',
  "Don't lie down after a meal"],

  preventionAr: [
  'الحفاظ على وزن صحي',
  'التوقف عن التدخين',
  'رفع رأس سريرك',
  'عدم الاستلقاء بعد تناول وجبة']

},
{
  id: 'gastro-2',
  nameEn: 'Irritable Bowel Syndrome (IBS)',
  nameAr: 'متلازمة القولون العصبي',
  category: 'gastro',
  severityLevel: 'mild',
  isContagious: false,
  descriptionEn: 'A common disorder that affects the large intestine.',
  descriptionAr: 'اضطراب شائع يؤثر على الأمعاء الغليظة.',
  symptomsEn: [
  'Abdominal pain',
  'Cramping',
  'Bloating',
  'Gas',
  'Diarrhea or constipation'],

  symptomsAr: ['ألم في البطن', 'تشنج', 'انتفاخ', 'غازات', 'إسهال أو إمساك'],
  causesEn: [
  'Muscle contractions in the intestine',
  'Nervous system abnormalities',
  'Severe infection',
  'Changes in gut microbes'],

  causesAr: [
  'تقلصات العضلات في الأمعاء',
  'تشوهات الجهاز العصبي',
  'عدوى شديدة',
  'تغيرات في ميكروبات الأمعاء'],

  riskFactorsEn: [
  'Young age',
  'Being female',
  'Family history of IBS',
  'Mental health problem'],

  riskFactorsAr: [
  'صغر السن',
  'أن تكوني أنثى',
  'تاريخ عائلي للقولون العصبي',
  'مشكلة في الصحة العقلية'],

  diagnosisEn: [
  'Rule out other conditions',
  'Rome criteria',
  'Stool tests',
  'Colonoscopy'],

  diagnosisAr: [
  'استبعاد الحالات الأخرى',
  'معايير روما',
  'اختبارات البراز',
  'تنظير القولون'],

  treatmentEn: [
  'Dietary changes',
  'Fiber supplements',
  'Laxatives',
  'Anti-diarrheal medications',
  'Antispasmodic medications'],

  treatmentAr: [
  'تغييرات غذائية',
  'مكملات الألياف',
  'الملينات',
  'الأدوية المضادة للإسهال',
  'الأدوية المضادة للتشنج'],

  preventionEn: [
  'Eat at regular times',
  'Exercise regularly',
  'Drink plenty of fluids',
  'Manage stress'],

  preventionAr: [
  'تناول الطعام في أوقات منتظمة',
  'ممارسة الرياضة بانتظام',
  'شرب الكثير من السوائل',
  'إدارة التوتر']

},

// --- ORTHOPEDIC ---
{
  id: 'ortho-1',
  nameEn: 'Osteoarthritis',
  nameAr: 'الفصال العظمي',
  category: 'orthopedic',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'The most common form of arthritis, occurring when the protective cartilage that cushions the ends of your bones wears down over time.',
  descriptionAr:
  'الشكل الأكثر شيوعاً لالتهاب المفاصل، ويحدث عندما يتآكل الغضروف الواقي الذي يبطن أطراف عظامك بمرور الوقت.',
  symptomsEn: [
  'Pain',
  'Stiffness',
  'Tenderness',
  'Loss of flexibility',
  'Grating sensation'],

  symptomsAr: ['ألم', 'تصلب', 'مضض', 'فقدان المرونة', 'إحساس بالاحتكاك'],
  causesEn: ['Wear and tear on joint cartilage over time'],
  causesAr: ['تآكل وتمزق غضروف المفصل بمرور الوقت'],
  riskFactorsEn: [
  'Older age',
  'Sex (women are more likely)',
  'Obesity',
  'Joint injuries',
  'Genetics'],

  riskFactorsAr: [
  'التقدم في العمر',
  'الجنس (النساء أكثر عرضة)',
  'السمنة',
  'إصابات المفاصل',
  'الوراثة'],

  diagnosisEn: ['X-rays', 'MRI', 'Blood tests', 'Joint fluid analysis'],
  diagnosisAr: [
  'الأشعة السينية',
  'الرنين المغناطيسي',
  'تحاليل الدم',
  'تحليل سائل المفصل'],

  treatmentEn: [
  'Acetaminophen',
  'NSAIDs',
  'Physical therapy',
  'Cortisone injections',
  'Joint replacement'],

  treatmentAr: [
  'أسيتامينوفين',
  'مضادات الالتهاب غير الستيرويدية',
  'العلاج الطبيعي',
  'حقن الكورتيزون',
  'استبدال المفصل'],

  preventionEn: [
  'Maintain a healthy weight',
  'Control blood sugar',
  'Stay active',
  'Protect joints from injury'],

  preventionAr: [
  'الحفاظ على وزن صحي',
  'السيطرة على سكر الدم',
  'البقاء نشطاً',
  'حماية المفاصل من الإصابة']

},
{
  id: 'ortho-2',
  nameEn: 'Osteoporosis',
  nameAr: 'هشاشة العظام',
  category: 'orthopedic',
  severityLevel: 'severe',
  isContagious: false,
  descriptionEn:
  'A disease that thins and weakens the bones, making them fragile and more likely to break.',
  descriptionAr: 'مرض يرقق ويضعف العظام، مما يجعلها هشة وأكثر عرضة للكسر.',
  symptomsEn: [
  'Back pain',
  'Loss of height over time',
  'A stooped posture',
  'A bone that breaks much more easily than expected'],

  symptomsAr: [
  'ألم في الظهر',
  'فقدان الطول بمرور الوقت',
  'وضعية منحنية',
  'عظم ينكسر بسهولة أكبر بكثير من المتوقع'],

  causesEn: ['Imbalance between new bone formation and old bone resorption'],
  causesAr: ['عدم التوازن بين تكوين عظام جديدة وارتشاف العظام القديمة'],
  riskFactorsEn: [
  'Sex (women)',
  'Age',
  'Race',
  'Family history',
  'Body frame size'],

  riskFactorsAr: [
  'الجنس (النساء)',
  'العمر',
  'العرق',
  'التاريخ العائلي',
  'حجم هيكل الجسم'],

  diagnosisEn: ['Bone density test (DEXA scan)'],
  diagnosisAr: ['اختبار كثافة العظام (فحص DEXA)'],
  treatmentEn: [
  'Bisphosphonates',
  'Hormone-related therapy',
  'Bone-building medications'],

  treatmentAr: [
  'البايفوسفونيت',
  'العلاج المرتبط بالهرمونات',
  'أدوية بناء العظام'],

  preventionEn: [
  'Get enough calcium and vitamin D',
  'Exercise regularly',
  'Avoid smoking',
  'Limit alcohol'],

  preventionAr: [
  'الحصول على ما يكفي من الكالسيوم وفيتامين د',
  'ممارسة الرياضة بانتظام',
  'تجنب التدخين',
  'الحد من الكحول']

},

// --- PSYCHIATRIC ---
{
  id: 'psych-1',
  nameEn: 'Major Depressive Disorder',
  nameAr: 'اضطراب الاكتئاب الشديد',
  category: 'psychiatric',
  severityLevel: 'severe',
  isContagious: false,
  descriptionEn:
  'A mood disorder that causes a persistent feeling of sadness and loss of interest.',
  descriptionAr: 'اضطراب مزاجي يسبب شعوراً مستمراً بالحزن وفقدان الاهتمام.',
  symptomsEn: [
  'Feelings of sadness',
  'Loss of interest in normal activities',
  'Sleep disturbances',
  'Tiredness',
  'Reduced appetite'],

  symptomsAr: [
  'مشاعر الحزن',
  'فقدان الاهتمام بالأنشطة العادية',
  'اضطرابات النوم',
  'التعب',
  'انخفاض الشهية'],

  causesEn: [
  'Biological differences',
  'Brain chemistry',
  'Hormones',
  'Inherited traits'],

  causesAr: [
  'اختلافات بيولوجية',
  'كيمياء الدماغ',
  'الهرمونات',
  'سمات موروثة'],

  riskFactorsEn: [
  'Certain personality traits',
  'Traumatic events',
  'Blood relatives with a history of depression',
  'History of other mental health disorders'],

  riskFactorsAr: [
  'سمات شخصية معينة',
  'أحداث صادمة',
  'أقارب بالدم لديهم تاريخ من الاكتئاب',
  'تاريخ من اضطرابات الصحة العقلية الأخرى'],

  diagnosisEn: [
  'Physical exam',
  'Lab tests',
  'Psychiatric evaluation',
  'DSM-5 criteria'],

  diagnosisAr: [
  'الفحص البدني',
  'الاختبارات المعملية',
  'التقييم النفسي',
  'معايير DSM-5'],

  treatmentEn: [
  'Antidepressants',
  'Psychotherapy',
  'Electroconvulsive therapy (ECT)'],

  treatmentAr: [
  'مضادات الاكتئاب',
  'العلاج النفسي',
  'العلاج بالصدمات الكهربائية (ECT)'],

  preventionEn: [
  'Take steps to control stress',
  'Reach out to family and friends',
  'Get treatment at the earliest sign of a problem'],

  preventionAr: [
  'اتخاذ خطوات للسيطرة على التوتر',
  'التواصل مع العائلة والأصدقاء',
  'الحصول على العلاج عند أول علامة على وجود مشكلة']

},
{
  id: 'psych-2',
  nameEn: 'Generalized Anxiety Disorder',
  nameAr: 'اضطراب القلق العام',
  category: 'psychiatric',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn:
  'Severe, ongoing anxiety that interferes with daily activities.',
  descriptionAr: 'قلق شديد ومستمر يتعارض مع الأنشطة اليومية.',
  symptomsEn: [
  'Persistent worrying',
  'Overthinking',
  'Perceiving situations as threatening',
  'Difficulty handling uncertainty'],

  symptomsAr: [
  'قلق مستمر',
  'تفكير مفرط',
  'إدراك المواقف على أنها مهددة',
  'صعوبة التعامل مع عدم اليقين'],

  causesEn: [
  'Differences in brain chemistry and function',
  'Genetics',
  'Differences in the way threats are perceived'],

  causesAr: [
  'اختلافات في كيمياء الدماغ ووظيفته',
  'الوراثة',
  'اختلافات في طريقة إدراك التهديدات'],

  riskFactorsEn: ['Personality', 'Genetics', 'Experiences (trauma)'],
  riskFactorsAr: ['الشخصية', 'الوراثة', 'التجارب (الصدمة)'],
  diagnosisEn: [
  'Psychological evaluation',
  'Comparing symptoms to DSM-5 criteria'],

  diagnosisAr: ['التقييم النفسي', 'مقارنة الأعراض بمعايير DSM-5'],
  treatmentEn: [
  'Psychotherapy (CBT)',
  'Antidepressants',
  'Buspirone',
  'Benzodiazepines (short-term)'],

  treatmentAr: [
  'العلاج النفسي (CBT)',
  'مضادات الاكتئاب',
  'بوسبيرون',
  'البنزوديازيبينات (قصيرة الأمد)'],

  preventionEn: [
  'Get help early',
  'Keep a journal',
  'Prioritize issues in your life',
  'Avoid unhealthy substance use'],

  preventionAr: [
  'الحصول على المساعدة مبكراً',
  'الاحتفاظ بمذكرات',
  'تحديد أولويات القضايا في حياتك',
  'تجنب تعاطي المواد غير الصحية']

},

// --- UROLOGICAL ---
{
  id: 'uro-1',
  nameEn: 'Kidney Stones',
  nameAr: 'حصوات الكلى',
  category: 'urological',
  severityLevel: 'severe',
  isContagious: false,
  descriptionEn:
  'Hard deposits made of minerals and salts that form inside your kidneys.',
  descriptionAr: 'رواسب صلبة مصنوعة من المعادن والأملاح تتشكل داخل الكليتين.',
  symptomsEn: [
  'Severe, sharp pain in the side and back',
  'Pain that radiates to the lower abdomen',
  'Pain that comes in waves',
  'Pain on urination'],

  symptomsAr: [
  'ألم شديد وحاد في الجانب والظهر',
  'ألم يمتد إلى أسفل البطن',
  'ألم يأتي على شكل موجات',
  'ألم عند التبول'],

  causesEn: [
  'Urine contains more crystal-forming substances than the fluid in your urine can dilute'],

  causesAr: [
  'يحتوي البول على مواد مكونة للبلورات أكثر مما يمكن للسائل الموجود في البول تخفيفه'],

  riskFactorsEn: [
  'Family or personal history',
  'Dehydration',
  'Certain diets',
  'Obesity',
  'Digestive diseases'],

  riskFactorsAr: [
  'تاريخ عائلي أو شخصي',
  'الجفاف',
  'أنظمة غذائية معينة',
  'السمنة',
  'أمراض الجهاز الهضمي'],

  diagnosisEn: [
  'Blood testing',
  'Urine testing',
  'Imaging (CT scan, X-ray)',
  'Analysis of passed stones'],

  diagnosisAr: [
  'تحليل الدم',
  'تحليل البول',
  'التصوير (الأشعة المقطعية، الأشعة السينية)',
  'تحليل الحصوات التي تم تمريرها'],

  treatmentEn: [
  'Drinking water',
  'Pain relievers',
  'Medical therapy (alpha blockers)',
  'Extracorporeal shock wave lithotripsy (ESWL)',
  'Surgery'],

  treatmentAr: [
  'شرب الماء',
  'مسكنات الألم',
  'العلاج الطبي (حاصرات ألفا)',
  'تفتيت الحصوات بموجات صدمة من خارج الجسم (ESWL)',
  'الجراحة'],

  preventionEn: [
  'Drink water throughout the day',
  'Eat fewer oxalate-rich foods',
  'Choose a diet low in salt and animal protein'],

  preventionAr: [
  'شرب الماء طوال اليوم',
  'تناول كميات أقل من الأطعمة الغنية بالأوكسالات',
  'اختيار نظام غذائي منخفض الملح والبروتين الحيواني']

},

// --- OPHTHALMOLOGY ---
{
  id: 'oph-1',
  nameEn: 'Glaucoma',
  nameAr: 'الجلوكوما (المياه الزرقاء)',
  category: 'ophthalmology',
  severityLevel: 'severe',
  isContagious: false,
  descriptionEn:
  'A group of eye conditions that damage the optic nerve, the health of which is vital for good vision.',
  descriptionAr:
  'مجموعة من أمراض العين التي تتلف العصب البصري، والذي تعتبر صحته حيوية للرؤية الجيدة.',
  symptomsEn: [
  'Patchy blind spots in your side or central vision',
  'Tunnel vision',
  'Severe headache',
  'Eye pain',
  'Blurred vision'],

  symptomsAr: [
  'بقع عمياء غير مكتملة في الرؤية الجانبية أو المركزية',
  'رؤية نفقية',
  'صداع شديد',
  'ألم في العين',
  'رؤية ضبابية'],

  causesEn: [
  'Damage to the optic nerve, often related to high pressure in the eye'],

  causesAr: ['تلف العصب البصري، وغالباً ما يرتبط بارتفاع الضغط في العين'],
  riskFactorsEn: [
  'High internal eye pressure',
  'Age over 60',
  'Family history',
  'Certain medical conditions (diabetes, heart disease)'],

  riskFactorsAr: [
  'ارتفاع ضغط العين الداخلي',
  'العمر فوق 60',
  'التاريخ العائلي',
  'حالات طبية معينة (السكري، أمراض القلب)'],

  diagnosisEn: [
  'Measuring intraocular pressure (tonometry)',
  'Testing for optic nerve damage',
  'Visual field test'],

  diagnosisAr: [
  'قياس ضغط العين (قياس التوتر)',
  'اختبار تلف العصب البصري',
  'اختبار المجال البصري'],

  treatmentEn: [
  'Eyedrops (prostaglandins, beta blockers)',
  'Oral medications',
  'Laser therapy',
  'Surgery'],

  treatmentAr: [
  'قطرات العين (البروستاجلاندين، حاصرات بيتا)',
  'الأدوية الفموية',
  'العلاج بالليزر',
  'الجراحة'],

  preventionEn: [
  'Get regular dilated eye examinations',
  "Know your family's eye health history",
  'Exercise safely',
  'Wear eye protection'],

  preventionAr: [
  'إجراء فحوصات منتظمة للعين الموسعة',
  'معرفة التاريخ الصحي لعين عائلتك',
  'ممارسة الرياضة بأمان',
  'ارتداء حماية للعين']

},
{
  id: 'oph-2',
  nameEn: 'Cataracts',
  nameAr: 'إعتام عدسة العين (الماء الأبيض)',
  category: 'ophthalmology',
  severityLevel: 'moderate',
  isContagious: false,
  descriptionEn: 'A clouding of the normally clear lens of your eye.',
  descriptionAr: 'إعتام عدسة العين الصافية عادة.',
  symptomsEn: [
  'Clouded, blurred or dim vision',
  'Increasing difficulty with vision at night',
  'Sensitivity to light and glare',
  'Seeing "halos" around lights'],

  symptomsAr: [
  'رؤية غائمة أو ضبابية أو خافتة',
  'صعوبة متزايدة في الرؤية ليلاً',
  'حساسية للضوء والوهج',
  'رؤية "هالات" حول الأضواء'],

  causesEn: [
  "Aging or injury changes the tissue that makes up the eye's lens"],

  causesAr: [
  'تغيرات الشيخوخة أو الإصابة في الأنسجة التي تتكون منها عدسة العين'],

  riskFactorsEn: [
  'Increasing age',
  'Diabetes',
  'Excessive exposure to sunlight',
  'Smoking',
  'Obesity',
  'High blood pressure'],

  riskFactorsAr: [
  'التقدم في العمر',
  'السكري',
  'التعرض المفرط لأشعة الشمس',
  'التدخين',
  'السمنة',
  'ارتفاع ضغط الدم'],

  diagnosisEn: [
  'Visual acuity test',
  'Slit-lamp examination',
  'Retinal exam'],

  diagnosisAr: ['اختبار حدة البصر', 'فحص المصباح الشقي', 'فحص الشبكية'],
  treatmentEn: ['Prescription glasses', 'Cataract surgery'],
  treatmentAr: ['نظارات طبية', 'جراحة إعتام عدسة العين'],
  preventionEn: [
  'Have regular eye examinations',
  'Quit smoking',
  'Manage other health problems',
  'Choose a healthy diet',
  'Wear sunglasses'],

  preventionAr: [
  'إجراء فحوصات منتظمة للعين',
  'الإقلاع عن التدخين',
  'إدارة المشاكل الصحية الأخرى',
  'اختيار نظام غذائي صحي',
  'ارتداء النظارات الشمسية']

}];