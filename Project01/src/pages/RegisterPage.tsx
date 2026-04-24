import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Users } from 'lucide-react';

export function RegisterPage() {
  const { language } = useLanguage();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError(language === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب');
      return;
    }

    if (!password || password.length < 8) {
      setError(
        language === 'en'
          ? 'Password must be at least 8 characters'
          : 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        language === 'en'
          ? 'Passwords do not match'
          : 'كلمتا المرور غير متطابقتين'
      );
      return;
    }

    try {
      setIsSubmitting(true);
      await register({ name: name.trim() || undefined, email, password });
      navigate('/');
    } catch (err: any) {
      setError(err?.message || (language === 'en' ? 'Registration failed' : 'فشل التسجيل'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === 'en' ? 'Register' : 'تسجيل جديد'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'Create an account to save your work'
                : 'أنشئ حساباً لحفظ عملك'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            label={language === 'en' ? 'Name (optional)' : 'الاسم (اختياري)'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={language === 'en' ? 'Your name' : 'اسمك'}
            autoComplete="name"
          />

          <Input
            label={language === 'en' ? 'Email' : 'البريد الإلكتروني'}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={language === 'en' ? 'name@example.com' : 'name@example.com'}
            autoComplete="email"
          />

          <Input
            label={language === 'en' ? 'Password' : 'كلمة المرور'}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={language === 'en' ? 'At least 8 characters' : 'على الأقل 8 أحرف'}
            autoComplete="new-password"
          />

          <Input
            label={language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder={language === 'en' ? 'Repeat your password' : 'أعد كتابة كلمة المرور'}
            autoComplete="new-password"
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            {language === 'en' ? 'Create Account' : 'إنشاء حساب'}
          </Button>
        </form>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          {language === 'en' ? 'Already have an account?' : 'لديك حساب بالفعل؟'}{' '}
          <Link
            to="/login"
            className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
            {language === 'en' ? 'Login' : 'تسجيل الدخول'}
          </Link>
        </div>
      </Card>
    </div>
  );
}
