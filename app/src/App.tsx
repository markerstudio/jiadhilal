import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { Loading } from './components/ui';
import { ClientLayout } from './layouts/ClientLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { LoginScreen } from './screens/LoginScreen';
import { TodayScreen } from './screens/TodayScreen';
import { TrainScreen } from './screens/TrainScreen';
import { NutritionScreen } from './screens/NutritionScreen';
import { WorkoutScreen } from './screens/WorkoutScreen';
import { ProgressScreen } from './screens/ProgressScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminClients } from './admin/AdminClients';
import { AdminClientDetail } from './admin/AdminClientDetail';
import { AdminPrograms } from './admin/AdminPrograms';
import { AdminProgramEditor } from './admin/AdminProgramEditor';

function Gate({ children, coach = false }: { children: ReactNode; coach?: boolean }) {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (coach && user.role !== 'coach') return <Navigate to="/" replace />;
  return <>{children}</>;
}

function LoginGate() {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (user) return <Navigate to={user.role === 'coach' ? '/admin' : '/'} replace />;
  return <LoginScreen />;
}

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginGate />} />

          {/* client app */}
          <Route
            element={
              <Gate>
                <ClientLayout />
              </Gate>
            }
          >
            <Route index element={<TodayScreen />} />
            <Route path="/train" element={<TrainScreen />} />
            <Route path="/nutrition" element={<NutritionScreen />} />
            <Route path="/progress" element={<ProgressScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>
          <Route
            path="/workout/:workoutId"
            element={
              <Gate>
                <WorkoutScreen />
              </Gate>
            }
          />

          {/* coach admin */}
          <Route
            path="/admin"
            element={
              <Gate coach>
                <AdminLayout />
              </Gate>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="clients/:clientId" element={<AdminClientDetail />} />
            <Route path="programs" element={<AdminPrograms />} />
            <Route path="programs/:programId" element={<AdminProgramEditor />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
