import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nextProvider } from 'react-i18next';
import { Toaster } from 'sonner';
import { AuthProvider } from '@central/contexts/AuthContext';
import i18n from '@central/i18n';
import Layout from '@central/components/Layout';
import ProtectedRoute from '@central/components/ProtectedRoute';
import UnauthenticatedHandler from '@central/components/UnauthenticatedHandler';
import HomePage from '@central/pages/HomePage';
import LoginPage from '@central/pages/LoginPage';
import RegisterPage from '@central/pages/RegisterPage';
import DashboardPage from '@central/pages/DashboardPage';
import ProfilePage from '@central/pages/ProfilePage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <UnauthenticatedHandler />
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
            <Toaster position="top-right" richColors />
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </I18nextProvider>
  </StrictMode>
);
