import React, { useMemo, useState, createElement } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Modal } from '../components/ui/Modal';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Upload,
  FileText,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  X,
  Edit2,
  Trash2,
  Eye,
  User,
  Calendar,
  Ruler,
  Scale,
  FileEdit,
  Users,
  Activity,
  Filter } from
'lucide-react';
interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  height: number; // cm
  weight: number; // kg
  notes: string;
  lastUpdated: string;
}
interface PatientFormData {
  id: string;
  name: string;
  age: string;
  gender: 'male' | 'female';
  height: string;
  weight: string;
  notes: string;
}
const initialFormData: PatientFormData = {
  id: '',
  name: '',
  age: '',
  gender: 'male',
  height: '',
  weight: '',
  notes: ''
};
export function PatientFilesPage() {
  const { t, language } = useLanguage();
  // Patients data
  const [patients, setPatients] = useState<Patient[]>([
  {
    id: 'P-1001',
    name: 'Ahmed Ali',
    age: 45,
    gender: 'male',
    height: 175,
    weight: 82,
    notes: 'Regular checkup',
    lastUpdated: '2024-01-15'
  },
  {
    id: 'P-1002',
    name: 'Sarah Smith',
    age: 32,
    gender: 'female',
    height: 165,
    weight: 58,
    notes: '',
    lastUpdated: '2024-01-14'
  },
  {
    id: 'P-1003',
    name: 'John Doe',
    age: 55,
    gender: 'male',
    height: 180,
    weight: 95,
    notes: 'Diabetes patient',
    lastUpdated: '2024-01-13'
  },
  {
    id: 'P-1004',
    name: 'Fatima Omar',
    age: 28,
    gender: 'female',
    height: 160,
    weight: 52,
    notes: '',
    lastUpdated: '2024-01-12'
  },
  {
    id: 'P-1005',
    name: 'Mike Ross',
    age: 40,
    gender: 'male',
    height: 178,
    weight: 88,
    notes: 'High blood pressure',
    lastUpdated: '2024-01-11'
  }]
  );
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [viewingPatient, setViewingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState<PatientFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  // Search and filter states
  const [searchId, setSearchId] = useState('');
  const [filterGender, setFilterGender] = useState('all');
  const [filterHealth, setFilterHealth] = useState('all');
  const [sortBy, setSortBy] = useState('lastUpdated');
  // Export status
  const [exportStatus, setExportStatus] = useState<{
    type: string;
    success: boolean;
  } | null>(null);
  // Calculate BMI
  const calculateBMI = (height: number, weight: number): number => {
    const heightM = height / 100;
    return parseFloat((weight / (heightM * heightM)).toFixed(1));
  };
  // Get health status based on BMI
  const getHealthStatus = (bmi: number): 'good' | 'moderate' | 'danger' => {
    if (bmi >= 18.5 && bmi < 25) return 'good';
    if (bmi >= 25 && bmi < 30) return 'moderate';
    return 'danger';
  };
  const getHealthBadge = (status: 'good' | 'moderate' | 'danger') => {
    const config = {
      good: {
        label: language === 'ar' ? 'جيد' : 'Good',
        variant: 'common' as const,
        color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20'
      },
      moderate: {
        label: language === 'ar' ? 'متوسط' : 'Moderate',
        variant: 'seasonal' as const,
        color: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20'
      },
      danger: {
        label: language === 'ar' ? 'خطر' : 'At Risk',
        variant: 'dangerous' as const,
        color: 'text-red-600 bg-red-50 dark:bg-red-900/20'
      }
    };
    return config[status];
  };
  // Filter and sort patients
  const filteredPatients = useMemo(() => {
    let result = [...patients];
    // Search by ID
    if (searchId) {
      result = result.filter((p) =>
      p.id.toLowerCase().includes(searchId.toLowerCase())
      );
    }
    // Filter by gender
    if (filterGender !== 'all') {
      result = result.filter((p) => p.gender === filterGender);
    }
    // Filter by health status
    if (filterHealth !== 'all') {
      result = result.filter((p) => {
        const bmi = calculateBMI(p.height, p.weight);
        return getHealthStatus(bmi) === filterHealth;
      });
    }
    // Sort
    result.sort((a, b) => {
      if (sortBy === 'lastUpdated') {
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'age') {
        return b.age - a.age;
      }
      return 0;
    });
    return result;
  }, [patients, searchId, filterGender, filterHealth, sortBy]);
  // Form validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.id.trim()) {
      errors.id =
      language === 'ar' ? 'معرف المريض مطلوب' : 'Patient ID is required';
    } else if (!editingPatient && patients.some((p) => p.id === formData.id)) {
      errors.id =
      language === 'ar' ?
      'معرف المريض موجود مسبقاً' :
      'Patient ID already exists';
    }
    if (!formData.name.trim()) {
      errors.name = language === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    }
    const age = parseInt(formData.age);
    if (!formData.age || isNaN(age) || age < 0 || age > 150) {
      errors.age = language === 'ar' ? 'العمر غير صحيح' : 'Invalid age';
    }
    const height = parseFloat(formData.height);
    if (!formData.height || isNaN(height) || height < 50 || height > 250) {
      errors.height =
      language === 'ar' ?
      'الطول غير صحيح (50-250 سم)' :
      'Invalid height (50-250 cm)';
    }
    const weight = parseFloat(formData.weight);
    if (!formData.weight || isNaN(weight) || weight < 10 || weight > 500) {
      errors.weight =
      language === 'ar' ?
      'الوزن غير صحيح (10-500 كجم)' :
      'Invalid weight (10-500 kg)';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  // Handle form submit
  const handleSubmit = () => {
    if (!validateForm()) return;
    const newPatient: Patient = {
      id: formData.id,
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender,
      height: parseFloat(formData.height),
      weight: parseFloat(formData.weight),
      notes: formData.notes,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    if (editingPatient) {
      setPatients((prev) =>
      prev.map((p) => p.id === editingPatient.id ? newPatient : p)
      );
    } else {
      setPatients((prev) => [newPatient, ...prev]);
    }
    closeModal();
  };
  // Open modal for adding
  const openAddModal = () => {
    setEditingPatient(null);
    setFormData(initialFormData);
    setFormErrors({});
    setIsModalOpen(true);
  };
  // Open modal for editing
  const openEditModal = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      id: patient.id,
      name: patient.name,
      age: patient.age.toString(),
      gender: patient.gender,
      height: patient.height.toString(),
      weight: patient.weight.toString(),
      notes: patient.notes
    });
    setFormErrors({});
    setIsModalOpen(true);
  };
  // Open view modal
  const openViewModal = (patient: Patient) => {
    setViewingPatient(patient);
    setIsViewModalOpen(true);
  };
  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
    setFormData(initialFormData);
    setFormErrors({});
  };
  // Delete patient
  const deletePatient = (id: string) => {
    if (
    window.confirm(
      language === 'ar' ?
      'هل أنت متأكد من حذف هذا المريض؟' :
      'Are you sure you want to delete this patient?'
    ))
    {
      setPatients((prev) => prev.filter((p) => p.id !== id));
    }
  };
  // Export functions
  const exportToExcel = () => {
    if (patients.length === 0) {
      setExportStatus({
        type: 'excel',
        success: false
      });
      setTimeout(() => setExportStatus(null), 3000);
      return;
    }
    const headers = [
    'ID',
    'Name',
    'Age',
    'Gender',
    'Height',
    'Weight',
    'BMI',
    'Health Status',
    'Notes',
    'Last Updated'];

    const csvContent = [
    headers.join(','),
    ...patients.map((p) => {
      const bmi = calculateBMI(p.height, p.weight);
      const status = getHealthStatus(bmi);
      return [
      p.id,
      p.name,
      p.age,
      p.gender,
      p.height,
      p.weight,
      bmi,
      status,
      p.notes,
      p.lastUpdated].
      join(',');
    })].
    join('\n');
    const blob = new Blob(['\ufeff' + csvContent], {
      type: 'text/csv;charset=utf-8;'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download =
    'patients_' + new Date().toISOString().split('T')[0] + '.csv';
    link.click();
    setExportStatus({
      type: 'excel',
      success: true
    });
    setTimeout(() => setExportStatus(null), 3000);
  };
  const exportToPDF = () => {
    if (patients.length === 0) {
      setExportStatus({
        type: 'pdf',
        success: false
      });
      setTimeout(() => setExportStatus(null), 3000);
      return;
    }
    const title = language === 'ar' ? 'تقرير المرضى' : 'Patient Report';
    const tableRows = patients.
    map((p) => {
      const bmi = calculateBMI(p.height, p.weight);
      const status = getHealthStatus(bmi);
      const statusLabel = getHealthBadge(status).label;
      return (
        '<tr><td>' +
        p.id +
        '</td><td>' +
        p.name +
        '</td><td>' +
        p.age +
        '</td><td>' + (
        p.gender === 'male' ?
        language === 'ar' ?
        'ذكر' :
        'Male' :
        language === 'ar' ?
        'أنثى' :
        'Female') +
        '</td><td>' +
        bmi +
        '</td><td class="status-' +
        status +
        '">' +
        statusLabel +
        '</td></tr>');

    }).
    join('');
    const printContent =
    '<!DOCTYPE html><html dir="' + (
    language === 'ar' ? 'rtl' : 'ltr') +
    '"><head><meta charset="UTF-8"><title>' +
    title +
    '</title><style>{`body{font-family:Arial,sans-serif;padding:20px}h1{color:#3b82f6;text-align:center}table{width:100%;border-collapse:collapse;margin-top:20px}th,td{border:1px solid #ddd;padding:12px;text-align:left}th{background:#3b82f6;color:white}.status-good{color:#10b981}.status-moderate{color:#f59e0b}.status-danger{color:#ef4444}`}</style></head><body><h1>' +
    title +
    '</h1><table><thead><tr><th>ID</th><th>' + (
    language === 'ar' ? 'الاسم' : 'Name') +
    '</th><th>' + (
    language === 'ar' ? 'العمر' : 'Age') +
    '</th><th>' + (
    language === 'ar' ? 'الجنس' : 'Gender') +
    '</th><th>BMI</th><th>' + (
    language === 'ar' ? 'الحالة' : 'Status') +
    '</th></tr></thead><tbody>' +
    tableRows +
    '</tbody></table></body></html>';
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
    setExportStatus({
      type: 'pdf',
      success: true
    });
    setTimeout(() => setExportStatus(null), 3000);
  };
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t('patientFiles.title')}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {language === 'ar' ?
            'إدارة وتتبع ملفات المرضى' :
            'Manage and track patient records'}
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700">

            <Plus className="w-4 h-4 mr-2" />
            {language === 'ar' ? 'إضافة مريض' : 'Add Patient'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToExcel}
            disabled={patients.length === 0}>

            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Excel
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={exportToPDF}
            disabled={patients.length === 0}>

            <FileText className="w-4 h-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* Export Status */}
      {exportStatus &&
      <div
        className={`flex items-center gap-2 p-4 rounded-lg ${exportStatus.success ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700' : 'bg-red-50 dark:bg-red-900/20 text-red-700'}`}>

          {exportStatus.success ?
        <CheckCircle className="w-5 h-5" /> :

        <AlertCircle className="w-5 h-5" />
        }
          <span>
            {exportStatus.success ?
          language === 'ar' ?
          'تم التصدير بنجاح!' :
          'Exported successfully!' :
          language === 'ar' ?
          'لا يوجد بيانات' :
          'No data'}
          </span>
        </div>
      }

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{patients.length}</p>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'إجمالي المرضى' : 'Total Patients'}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <Activity className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {
                patients.filter(
                  (p) =>
                  getHealthStatus(calculateBMI(p.height, p.weight)) ===
                  'good'
                ).length
                }
              </p>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'حالة جيدة' : 'Good Health'}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <Activity className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {
                patients.filter(
                  (p) =>
                  getHealthStatus(calculateBMI(p.height, p.weight)) ===
                  'moderate'
                ).length
                }
              </p>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'حالة متوسطة' : 'Moderate'}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {
                patients.filter(
                  (p) =>
                  getHealthStatus(calculateBMI(p.height, p.weight)) ===
                  'danger'
                ).length
                }
              </p>
              <p className="text-xs text-gray-500">
                {language === 'ar' ? 'تحتاج متابعة' : 'At Risk'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Input
              placeholder={
              language === 'ar' ?
              'ابحث باستخدام Patient ID...' :
              'Search by Patient ID...'
              }
              icon={<Search className="w-4 h-4" />}
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)} />

            {searchId &&
            <button
              onClick={() => setSearchId('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">

                <X className="w-4 h-4" />
              </button>
            }
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">
                {language === 'ar' ? 'فلترة:' : 'Filter:'}
              </span>
            </div>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">

              <option value="all">
                {language === 'ar' ? 'كل الجنس' : 'All Genders'}
              </option>
              <option value="male">{language === 'ar' ? 'ذكر' : 'Male'}</option>
              <option value="female">
                {language === 'ar' ? 'أنثى' : 'Female'}
              </option>
            </select>
            <select
              value={filterHealth}
              onChange={(e) => setFilterHealth(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">

              <option value="all">
                {language === 'ar' ? 'كل الحالات' : 'All Status'}
              </option>
              <option value="good">{language === 'ar' ? 'جيد' : 'Good'}</option>
              <option value="moderate">
                {language === 'ar' ? 'متوسط' : 'Moderate'}
              </option>
              <option value="danger">
                {language === 'ar' ? 'خطر' : 'At Risk'}
              </option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">

              <option value="lastUpdated">
                {language === 'ar' ? 'آخر تحديث' : 'Last Updated'}
              </option>
              <option value="name">
                {language === 'ar' ? 'الاسم' : 'Name'}
              </option>
              <option value="age">{language === 'ar' ? 'العمر' : 'Age'}</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Patients Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الاسم' : 'Name'}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'العمر' : 'Age'}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الجنس' : 'Gender'}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  BMI
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'الحالة' : 'Status'}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'آخر تحديث' : 'Updated'}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
                  {language === 'ar' ? 'إجراءات' : 'Actions'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredPatients.length === 0 ?
              <tr>
                  <td
                  colSpan={8}
                  className="px-4 py-12 text-center text-gray-500">

                    <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>
                      {language === 'ar' ? 'لا يوجد مرضى' : 'No patients found'}
                    </p>
                    <Button
                    variant="ghost"
                    size="sm"
                    onClick={openAddModal}
                    className="mt-2">

                      <Plus className="w-4 h-4 mr-1" />
                      {language === 'ar' ? 'إضافة مريض' : 'Add Patient'}
                    </Button>
                  </td>
                </tr> :

              filteredPatients.map((patient) => {
                const bmi = calculateBMI(patient.height, patient.weight);
                const healthStatus = getHealthStatus(bmi);
                const badge = getHealthBadge(healthStatus);
                return (
                  <tr
                    key={patient.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">

                      <td className="px-4 py-3 font-mono text-blue-600 dark:text-blue-400">
                        {patient.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {patient.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                        {patient.age}
                      </td>
                      <td className="px-4 py-3">
                        <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${patient.gender === 'male' ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' : 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300'}`}>

                          {patient.gender === 'male' ?
                        language === 'ar' ?
                        'ذكر' :
                        'Male' :
                        language === 'ar' ?
                        'أنثى' :
                        'Female'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">{bmi}</td>
                      <td className="px-4 py-3">
                        <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>

                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {patient.lastUpdated}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                          onClick={() => openViewModal(patient)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                          title={language === 'ar' ? 'عرض' : 'View'}>

                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                          onClick={() => openEditModal(patient)}
                          className="p-1.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors"
                          title={language === 'ar' ? 'تعديل' : 'Edit'}>

                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                          onClick={() => deletePatient(patient.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          title={language === 'ar' ? 'حذف' : 'Delete'}>

                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>);

              })
              }
            </tbody>
          </table>
        </div>
        {filteredPatients.length > 0 &&
        <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/30">
            <p className="text-sm text-gray-500">
              {language === 'ar' ?
            `عرض ${filteredPatients.length} من ${patients.length} مريض` :
            `Showing ${filteredPatients.length} of ${patients.length} patients`}
            </p>
          </div>
        }
      </Card>

      {/* Add/Edit Patient Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={
        editingPatient ?
        language === 'ar' ?
        'تعديل بيانات المريض' :
        'Edit Patient' :
        language === 'ar' ?
        'إضافة مريض جديد' :
        'Add New Patient'
        }>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label={language === 'ar' ? 'معرف المريض *' : 'Patient ID *'}
                placeholder="P-1001"
                value={formData.id}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  id: e.target.value
                })
                }
                disabled={!!editingPatient}
                error={formErrors.id} />

            </div>
            <div>
              <Input
                label={language === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                placeholder={language === 'ar' ? 'أدخل الاسم' : 'Enter name'}
                value={formData.name}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value
                })
                }
                error={formErrors.name} />

            </div>
            <div>
              <Input
                label={language === 'ar' ? 'العمر *' : 'Age *'}
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  age: e.target.value
                })
                }
                error={formErrors.age} />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'ar' ? 'الجنس *' : 'Gender *'}
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  gender: e.target.value as 'male' | 'female'
                })
                }
                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">

                <option value="male">
                  {language === 'ar' ? 'ذكر' : 'Male'}
                </option>
                <option value="female">
                  {language === 'ar' ? 'أنثى' : 'Female'}
                </option>
              </select>
            </div>
            <div>
              <Input
                label={language === 'ar' ? 'الطول (سم) *' : 'Height (cm) *'}
                type="number"
                placeholder="175"
                value={formData.height}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  height: e.target.value
                })
                }
                error={formErrors.height} />

            </div>
            <div>
              <Input
                label={language === 'ar' ? 'الوزن (كجم) *' : 'Weight (kg) *'}
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  weight: e.target.value
                })
                }
                error={formErrors.weight} />

            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {language === 'ar' ? 'ملاحظات (اختياري)' : 'Notes (optional)'}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value
              })
              }
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 resize-none"
              placeholder={
              language === 'ar' ? 'أضف ملاحظات...' : 'Add notes...'
              } />

          </div>

          {/* BMI Preview */}
          {formData.height && formData.weight &&
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>BMI:</strong>{' '}
                {calculateBMI(
                parseFloat(formData.height),
                parseFloat(formData.weight)
              )}{' '}
                -{' '}
                {
              getHealthBadge(
                getHealthStatus(
                  calculateBMI(
                    parseFloat(formData.height),
                    parseFloat(formData.weight)
                  )
                )
              ).label
              }
              </p>
            </div>
          }

          <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700">

              <CheckCircle className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'حفظ' : 'Save'}
            </Button>
            <Button variant="outline" onClick={closeModal} className="flex-1">
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Patient Modal */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={language === 'ar' ? 'تفاصيل المريض' : 'Patient Details'}>

        {viewingPatient &&
        <div className="space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{viewingPatient.name}</h3>
                <p className="text-gray-500">{viewingPatient.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">
                  {language === 'ar' ? 'العمر' : 'Age'}
                </p>
                <p className="font-bold">
                  {viewingPatient.age} {language === 'ar' ? 'سنة' : 'years'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">
                  {language === 'ar' ? 'الجنس' : 'Gender'}
                </p>
                <p className="font-bold">
                  {viewingPatient.gender === 'male' ?
                language === 'ar' ?
                'ذكر' :
                'Male' :
                language === 'ar' ?
                'أنثى' :
                'Female'}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">
                  {language === 'ar' ? 'الطول' : 'Height'}
                </p>
                <p className="font-bold">{viewingPatient.height} cm</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">
                  {language === 'ar' ? 'الوزن' : 'Weight'}
                </p>
                <p className="font-bold">{viewingPatient.weight} kg</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">BMI</p>
                <p className="font-bold">
                  {calculateBMI(viewingPatient.height, viewingPatient.weight)}
                </p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">
                  {language === 'ar' ? 'الحالة الصحية' : 'Health Status'}
                </p>
                <span
                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getHealthBadge(getHealthStatus(calculateBMI(viewingPatient.height, viewingPatient.weight))).color}`}>

                  {
                getHealthBadge(
                  getHealthStatus(
                    calculateBMI(
                      viewingPatient.height,
                      viewingPatient.weight
                    )
                  )
                ).label
                }
                </span>
              </div>
            </div>

            {viewingPatient.notes &&
          <div className="p-4 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                <p className="text-xs text-amber-600 mb-1">
                  {language === 'ar' ? 'ملاحظات' : 'Notes'}
                </p>
                <p className="text-amber-800 dark:text-amber-200">
                  {viewingPatient.notes}
                </p>
              </div>
          }

            <div className="text-xs text-gray-400 text-center">
              {language === 'ar' ? 'آخر تحديث:' : 'Last updated:'}{' '}
              {viewingPatient.lastUpdated}
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <Button
              onClick={() => {
                setIsViewModalOpen(false);
                openEditModal(viewingPatient);
              }}
              variant="outline"
              className="flex-1">

                <Edit2 className="w-4 h-4 mr-2" />
                {language === 'ar' ? 'تعديل' : 'Edit'}
              </Button>
              <Button
              onClick={() => setIsViewModalOpen(false)}
              className="flex-1">

                {language === 'ar' ? 'إغلاق' : 'Close'}
              </Button>
            </div>
          </div>
        }
      </Modal>
    </div>);

}