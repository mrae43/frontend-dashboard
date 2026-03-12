import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';
import { ProtectedRoute } from './components/ProtectedRoute';
import MemberDetail from './pages/MemberDetail';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/unauthorized" element={
            <div className="h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-900 p-4">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 max-w-md w-full text-center">
                <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
                <p className="text-slate-500 mb-8">You don't have permission to access this page. Please contact your administrator if you believe this is an error.</p>
                <a href="/" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm">
                  Back to Dashboard
                </a>
              </div>
            </div>
          } />
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={
              <ProtectedRoute requiredPermission="canViewMemberAnalytics">
                <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex items-center justify-center text-slate-500 min-h-[400px]">Member Analytics Under Construction</div>
              </ProtectedRoute>
            } />
            <Route path="members" element={
              <ProtectedRoute requiredPermission="canManageMembers">
                <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex items-center justify-center text-slate-500 min-h-[400px]">Member Management Under Construction</div>
              </ProtectedRoute>
            } />
            <Route path="members/:id" element={
              <ProtectedRoute requiredPermission="canManageMembers">
                <MemberDetail />
              </ProtectedRoute>
            } />
            <Route path="rewards" element={
              <ProtectedRoute requiredPermission="canManageRewards">
                <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex items-center justify-center text-slate-500 min-h-[400px]">Rewards Management Under Construction</div>
              </ProtectedRoute>
            } />
            <Route path="points" element={
              <ProtectedRoute requiredPermission="canAdjustPoints">
                <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex items-center justify-center text-slate-500 min-h-[400px]">Points Adjustment Under Construction</div>
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
