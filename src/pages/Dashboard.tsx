import { TrendingUp, Users, DollarSign, Activity, FileText } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign, trend: 'up' },
    { title: 'Active Orders', value: '342', change: '+15.4%', icon: FileText, trend: 'up' },
    { title: 'Total Customers', value: '1,234', change: '+4.3%', icon: Users, trend: 'up' },
    { title: 'Order Rejections', value: '2.4%', change: '-1.2%', icon: Activity, trend: 'down' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats row - CRAP: Proximity & Alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          return (
            <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-800 tracking-tight">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className={`font-semibold flex items-center gap-1 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingUp className="w-4 h-4 rotate-180" />}
                  {stat.change}
                </span>
                <span className="text-slate-400 font-medium ml-2">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Area - CRAP: Contrast & Repetition */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* large chart area */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[420px] flex flex-col">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-500" />
            Revenue Overview
          </h2>
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center border-dashed">
            <p className="text-slate-400 font-medium">Chart visualization area</p>
          </div>
        </div>
        
        {/* secondary area */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm min-h-[420px] flex flex-col">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Recent Activity</h2>
          <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center border-dashed">
            <p className="text-slate-400 font-medium">Activity feed area</p>
          </div>
        </div>
      </div>
    </div>
  );
}
