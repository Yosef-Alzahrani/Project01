import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/layout/Layout';
import { SystemOverviewPage } from './pages/SystemOverviewPage';
import { SettingsPage } from './pages/SettingsPage';
import { TeamLicensesPage } from './pages/TeamLicensesPage';
import { PersonalHealthAnalysisPage } from './pages/PersonalHealthAnalysisPage';
import { DiseasesPage } from './pages/DiseasesPage';
import { DiseaseDetailPage } from './pages/DiseaseDetailPage';
import { BodyAnalysisPage } from './pages/BodyAnalysisPage';
import { WoundAssessmentPage } from './pages/WoundAssessmentPage';
import { ModelPerformancePage } from './pages/ModelPerformancePage';
import { TechnicalOverviewPage } from './pages/TechnicalOverviewPage';
import { SiteRatingPage } from './pages/SiteRatingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<SystemOverviewPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/team" element={<TeamLicensesPage />} />
                <Route
                  path="/health-analysis"
                  element={<PersonalHealthAnalysisPage />} />

                <Route path="/body-analysis" element={<BodyAnalysisPage />} />
                <Route path="/diseases" element={<DiseasesPage />} />
                <Route path="/diseases/:id" element={<DiseaseDetailPage />} />
                <Route
                  path="/wound-assessment"
                  element={<WoundAssessmentPage />} />

                <Route
                  path="/model-performance"
                  element={<ModelPerformancePage />} />

                <Route
                  path="/technical-overview"
                  element={<TechnicalOverviewPage />} />

                <Route path="/site-rating" element={<SiteRatingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>);

}