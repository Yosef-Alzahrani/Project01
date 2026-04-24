import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Printer, Download, FileText, Calendar, User } from 'lucide-react';
import { Button } from './Button';
interface ReportSection {
  title: string;
  items: {
    label: string;
    value: string | number;
    highlight?: boolean;
  }[];
}
interface PrintReportProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  patientName?: string;
  patientId?: string;
  sections: ReportSection[];
  recommendations?: string[];
  language: 'en' | 'ar';
}
export function PrintReport({
  isOpen,
  onClose,
  reportTitle,
  patientName,
  patientId,
  sections,
  recommendations,
  language
}: PrintReportProps) {
  const printRef = useRef<HTMLDivElement>(null);
  if (!isOpen) return null;
  const currentDate = new Date().toLocaleDateString(
    language === 'ar' ? 'ar-SA' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
  );
  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    const paddingSide = language === 'ar' ? 'right' : 'left';
    const positionSide = language === 'ar' ? 'right' : 'left';
    const cssStyles = [
    '@page { size: A4; margin: 20mm; }',
    '* { box-sizing: border-box; margin: 0; padding: 0; }',
    'body { font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; background: white; color: #1f2937; line-height: 1.6; direction: ' +
    direction +
    '; }',
    '.report-container { max-width: 800px; margin: 0 auto; padding: 40px; }',
    '.header { text-align: center; border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; }',
    '.header h1 { color: #3b82f6; font-size: 28px; margin-bottom: 10px; }',
    '.header .subtitle { color: #6b7280; font-size: 14px; }',
    '.meta-info { display: flex; justify-content: space-between; background: #f3f4f6; padding: 15px 20px; border-radius: 8px; margin-bottom: 30px; font-size: 14px; }',
    '.meta-item { display: flex; align-items: center; gap: 8px; }',
    '.section { margin-bottom: 30px; }',
    '.section-title { background: #3b82f6; color: white; padding: 10px 20px; border-radius: 8px 8px 0 0; font-size: 16px; font-weight: bold; }',
    '.section-content { border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; padding: 20px; }',
    '.item-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }',
    '.item-row:last-child { border-bottom: none; }',
    '.item-label { color: #6b7280; }',
    '.item-value { font-weight: 600; color: #1f2937; }',
    '.item-value.highlight { color: #10b981; }',
    '.recommendations { background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; padding: 20px; }',
    '.recommendations h3 { color: #059669; margin-bottom: 15px; font-size: 16px; }',
    '.recommendations ul { list-style: none; }',
    '.recommendations li { padding: 8px 0; padding-' +
    paddingSide +
    ': 20px; position: relative; }',
    '.recommendations li::before { content: "✓"; position: absolute; ' +
    positionSide +
    ': 0; color: #10b981; font-weight: bold; }',
    '.footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px; }',
    '.disclaimer { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin-top: 30px; font-size: 13px; color: #92400e; text-align: center; }',
    '@media print { body { print-color-adjust: exact; -webkit-print-color-adjust: exact; } .no-print { display: none !important; } }'].
    join(' ');
    const htmlContent =
    '<!DOCTYPE html><html dir="' +
    direction +
    '" lang="' +
    language +
    '"><head><meta charset="UTF-8"><title>' +
    reportTitle +
    '</title><style>{`' +
    cssStyles +
    '`}</style></head><body>' +
    printContent.innerHTML +
    '</body></html>';
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };
  const handleDownloadPDF = () => {
    handlePrint();
  };
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'معاينة التقرير' : 'Report Preview'}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700">

              <Printer className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'طباعة' : 'Print'}
            </Button>
            <Button onClick={handleDownloadPDF} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">

              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 bg-gray-50 dark:bg-gray-800">
          <div
            ref={printRef}
            className="bg-white rounded-xl shadow-sm p-8"
            dir={language === 'ar' ? 'rtl' : 'ltr'}>

            {/* Report Header */}
            <div className="header text-center border-b-4 border-blue-500 pb-6 mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-blue-600 mb-2">
                {reportTitle}
              </h1>
              <p className="text-gray-500">
                {language === 'ar' ?
                'تقرير صحي شامل' :
                'Comprehensive Health Report'}
              </p>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap justify-between gap-4 bg-gray-50 p-4 rounded-xl mb-8 text-sm">
              {patientName &&
              <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">
                    {language === 'ar' ? 'الاسم:' : 'Name:'}
                  </span>
                  <span className="font-semibold">{patientName}</span>
                </div>
              }
              {patientId &&
              <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">ID:</span>
                  <span className="font-semibold font-mono">{patientId}</span>
                </div>
              }
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">
                  {language === 'ar' ? 'التاريخ:' : 'Date:'}
                </span>
                <span className="font-semibold">{currentDate}</span>
              </div>
            </div>

            {/* Sections */}
            {sections.map((section, idx) =>
            <div key={idx} className="mb-6">
                <div className="bg-blue-600 text-white px-5 py-3 rounded-t-xl font-bold">
                  {section.title}
                </div>
                <div className="border border-gray-200 border-t-0 rounded-b-xl p-5">
                  {section.items.map((item, itemIdx) =>
                <div
                  key={itemIdx}
                  className="flex justify-between py-3 border-b border-gray-100 last:border-b-0">

                      <span className="text-gray-600">{item.label}</span>
                      <span
                    className={`font-semibold ${item.highlight ? 'text-emerald-600' : 'text-gray-900'}`}>

                        {item.value}
                      </span>
                    </div>
                )}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {recommendations && recommendations.length > 0 &&
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 mb-6">
                <h3 className="text-emerald-700 font-bold mb-4 flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  {language === 'ar' ?
                'التوصيات الصحية' :
                'Health Recommendations'}
                </h3>
                <ul className="space-y-2">
                  {recommendations.map((rec, idx) =>
                <li
                  key={idx}
                  className="flex items-start gap-2 text-emerald-800">

                      <span className="text-emerald-500 mt-1">✓</span>
                      <span>{rec}</span>
                    </li>
                )}
                </ul>
              </div>
            }

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center text-amber-800 text-sm">
              ⚠️{' '}
              {language === 'ar' ?
              'هذا التقرير للأغراض التثقيفية فقط وليس بديلاً عن الاستشارة الطبية المتخصصة' :
              'This report is for educational purposes only and is not a substitute for professional medical advice'}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 pt-6 border-t border-gray-200 text-gray-400 text-xs">
              <p>MedGrade AI • {new Date().getFullYear()}</p>
              <p className="mt-1">
                {language === 'ar' ?
                'تم إنشاء هذا التقرير تلقائياً' :
                'This report was automatically generated'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}