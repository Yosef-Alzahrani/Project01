import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  Users,
  Code2,
  Mail,
  Phone,
  FileText,
  AlertTriangle,
  Copyright,
  Github,
  GraduationCap } from
'lucide-react';
export function TeamLicensesPage() {
  const { language } = useLanguage();
  const team = [
  {
    nameEn: 'Yosef Tarq Al-zahrani',
    nameAr: 'يوسف طارق الزهراني',
    roleEn: 'Lead Developer',
    roleAr: 'مطور رئيسي',
    phone: '0551179565',
    email: 'Jozef139292@gmail.com',
    image: 'YA'
  },
  {
    nameEn: 'Hamad Meshal Alanazi',
    nameAr: 'حمد مشعل العنزي',
    roleEn: 'AI Specialist',
    roleAr: 'أخصائي ذكاء اصطناعي',
    phone: '0544979240',
    email: 'hamad.meshal.alanazi@gmail.com',
    image: 'HA'
  },
  {
    nameEn: 'Abdullah Jassim Al-Shammari',
    nameAr: 'عبدالله جاسم الشمري',
    roleEn: 'Frontend Developer',
    roleAr: 'مطور واجهات',
    phone: '0559078667',
    email: 'abdullhsh34@gmail.com',
    image: 'AS'
  }];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {language === 'en' ?
          'Development Team & Licenses' :
          'فريق التطوير والتراخيص'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {language === 'en' ?
          'Meet the team behind MedGrade AI and review our legal disclaimers.' :
          'تعرف على فريق MedGrade AI وراجع إخلاء المسؤولية القانوني.'}
        </p>
      </div>

      {/* Team Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-500" />
          {language === 'en' ? 'Development Team' : 'فريق التطوير'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, index) =>
          <Card
            key={index}
            className="p-6 text-center border-t-4 border-t-blue-500">

              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">
                {member.image}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {language === 'en' ? member.nameEn : member.nameAr}
              </h3>

              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{member.phone}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs">{member.email}</span>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Project Info */}
      <Card className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-indigo-500" />
              {language === 'en' ? 'Project Information' : 'معلومات المشروع'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {language === 'en' ?
              'MedGrade AI is a graduation project developed to demonstrate the capabilities of AI in modern healthcare. This system integrates advanced machine learning models for wound severity classification and health analysis.' :
              'MedGrade AI هو مشروع تخرج تم تطويره لإظهار قدرات الذكاء الاصطناعي في الرعاية الصحية الحديثة. يدمج هذا النظام نماذج تعلم آلي متقدمة لتصنيف شدة الجروح والتحليل الصحي.'}
            </p>
            <div className="flex gap-2">
              <Badge variant="outline">React</Badge>
              <Badge variant="outline">TypeScript</Badge>
              <Badge variant="outline">Tailwind CSS</Badge>
              <Badge variant="outline">TensorFlow.js</Badge>
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-white dark:bg-black/20 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
            <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Github className="w-4 h-4" />
              {language === 'en' ? 'Version Info' : 'معلومات النسخة'}
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Version</span>
                <span className="font-mono">3.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Build</span>
                <span className="font-mono">Production</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last Update</span>
                <span className="font-mono">Feb 2026</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-6 rounded-r-xl">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-bold text-amber-800 dark:text-amber-200 mb-2">
              {language === 'en' ? 'Medical Disclaimer' : 'إخلاء مسؤولية طبي'}
            </h3>
            <p className="text-amber-700 dark:text-amber-300 leading-relaxed">
              {language === 'en' ?
              'This system is for educational and demonstrative purposes only. The AI predictions and health analyses provided by MedGrade AI should NOT be considered as professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.' :
              'هذا النظام للأغراض التعليمية والتوضيحية فقط. لا ينبغي اعتبار تنبؤات الذكاء الاصطناعي والتحليلات الصحية المقدمة من MedGrade AI بمثابة مشورة طبية مهنية أو تشخيص أو علاج. اطلب دائماً مشورة طبيبك أو مقدم رعاية صحية مؤهل آخر بشأن أي أسئلة قد تكون لديك بخصوص حالة طبية.'}
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center pt-8 border-t border-gray-200 dark:border-gray-800 text-gray-500 flex items-center justify-center gap-2">
        <Copyright className="w-4 h-4" />
        <span>2026 MedGrade AI Team. All rights reserved.</span>
      </div>
    </div>);

}