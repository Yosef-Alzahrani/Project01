import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { Shield } from 'lucide-react';

export function LoginPage() {
  const { language } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError(language === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب');
      return;
    }

    if (!password) {
      setError(language === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة');
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ email, password });
      navigate('/');
    } catch (err: any) {
      setError(err?.message || (language === 'en' ? 'Login failed' : 'فشل تسجيل الدخول'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 animate-in fade-in duration-500 pb-12">
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl">
            <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === 'en' ? 'Login' : 'تسجيل الدخول'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {language === 'en'
                ? 'Access your account to continue'
                : 'ادخل إلى حسابك للمتابعة'}
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
            placeholder={language === 'en' ? '••••••••' : '••••••••'}
            autoComplete="current-password"
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            {language === 'en' ? 'Login' : 'تسجيل الدخول'}
          </Button>
        </form>

        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center">
          {language === 'en' ? "Don't have an account?" : 'ليس لديك حساب؟'}{' '}
          <Link
            to="/register"
            className="font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
            {language === 'en' ? 'Register' : 'تسجيل جديد'}
          </Link>
        </div>
      </Card>
    </div>
  );
}
