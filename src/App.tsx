import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex items-center justify-center text-slate-500 min-h-[400px]">Analytics Page Under Construction</div>} />
          <Route path="customers" element={<div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex items-center justify-center text-slate-500 min-h-[400px]">Customers Page Under Construction</div>} />
          <Route path="settings" element={<div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm flex items-center justify-center text-slate-500 min-h-[400px]">Settings Page Under Construction</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
