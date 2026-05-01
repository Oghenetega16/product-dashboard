'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { 
  ArrowRight, 
  PlayCircle, 
  Activity, 
  Clock, 
  MousePointerClick, 
  Wifi, 
  MoreVertical,
  AlertCircle
} from 'lucide-react';

// --- Mock Data ---
const errorDistribution = [
  { name: 'JS Exceptions', value: 8400, color: '#f43f5e' }, // Rose
  { name: 'Network Failures', value: 3200, color: '#3b82f6' }, // Blue
  { name: 'UI Freezes', value: 1500, color: '#10b981' }, // Emerald
  { name: 'Promise Rejections', value: 900, color: '#f59e0b' }, // Amber
  { name: 'Other', value: 400, color: '#8b5cf6' }, // Violet
];

const recentAnomalies = [
  { id: 1, time: 'Today', message: 'TypeError: Cannot read null', context: '/checkout', type: 'JS Error', typeColor: 'bg-rose-500', impact: 'High', impactColor: 'text-rose-500' },
  { id: 2, time: 'Today', message: '502 Bad Gateway', context: 'api/payment', type: 'Network', typeColor: 'bg-blue-500', impact: 'Critical', impactColor: 'text-rose-600' },
  { id: 3, time: '20.05', message: 'Long Task (>50ms)', context: '/dashboard', type: 'Performance', typeColor: 'bg-emerald-500', impact: 'Low', impactColor: 'text-emerald-500' },
  { id: 4, time: '20.05', message: 'Unhandled Rejection', context: 'auth.ts', type: 'JS Error', typeColor: 'bg-rose-500', impact: 'Medium', impactColor: 'text-amber-500' },
  { id: 5, time: '19.05', message: 'Image Load Failed', context: '/products/1', type: 'Asset', typeColor: 'bg-fuchsia-500', impact: 'Low', impactColor: 'text-emerald-500' },
  { id: 6, time: '18.05', message: 'WebSocket Disconnect', context: 'Global', type: 'Network', typeColor: 'bg-blue-500', impact: 'Medium', impactColor: 'text-amber-500' },
];

export default function OverviewPage() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen pb-10">
      
      {/* Top Row: Hero Metric & Action Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Left Hero Card (Primary Health) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">Primary Environment</p>
              <h2 className="text-xl font-bold text-slate-900">Production Health Score</h2>
              <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                App ID: <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">prj_prd_9928a</span> <ArrowRight className="w-3 h-3 cursor-pointer hover:text-teal-600" />
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-slate-400 mb-1">Total Sessions Analyzed</p>
              <p className="text-4xl font-bold text-slate-900">98.4<span className="text-2xl text-slate-500">%</span></p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
              View Error Logs
            </button>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
              Analyze Performance
            </button>
          </div>
        </div>

        {/* Right Action Card (Session Replay Promo) */}
        <div className="lg:col-span-1 bg-teal-700 rounded-3xl p-8 text-white flex flex-col justify-between shadow-sm relative overflow-hidden">
          {/* Abstract background rings similar to the screenshot */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 border-4 border-teal-600/30 rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 border-4 border-teal-600/30 rounded-full" />
          
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Enable Session Replay</h3>
            <p className="text-teal-100 text-sm leading-relaxed max-w-[200px]">
              Stop guessing why users drop off. Record visual playbacks of errors and performance bottlenecks in real-time.
            </p>
          </div>
          <div className="relative z-10 mt-8 flex justify-between items-end">
            <button className="bg-white text-teal-800 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
              Configure Replay
            </button>
            <PlayCircle className="w-16 h-16 text-teal-500/50" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Middle Row: 4 Core Web Vitals Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <VitalCard title="LCP (Load Speed)" value="1.2 s" icon={<Clock className="w-6 h-6 text-blue-500" />} />
        <VitalCard title="FID (Interactivity)" value="45 ms" icon={<MousePointerClick className="w-6 h-6 text-rose-500" />} />
        <VitalCard title="CLS (Visual Stability)" value="0.04" icon={<Activity className="w-6 h-6 text-indigo-500" />} />
        <VitalCard title="TTFB (Server Time)" value="210 ms" icon={<Wifi className="w-6 h-6 text-emerald-500" />} />
      </div>

      {/* Bottom Row: List & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left List: Latest Anomalies */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Latest Anomalies</h3>
            <button className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 hover:bg-teal-100 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            {recentAnomalies.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-lg px-2 -mx-2 transition-colors cursor-pointer">
                <div className="w-20 text-sm font-medium text-slate-900">{item.time}</div>
                <div className="flex-1 text-sm text-slate-500 font-medium truncate pr-4">{item.message}</div>
                <div className="w-32 text-sm text-slate-400 truncate">{item.context}</div>
                <div className="w-32 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.typeColor}`} />
                  <span className="text-sm text-slate-500">{item.type}</span>
                </div>
                <div className={`w-24 text-sm font-bold text-right ${item.impactColor}`}>
                  {item.impact}
                </div>
                <button className="w-8 flex justify-end text-slate-300 hover:text-slate-500">
                  <ChevronDownIcon />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-sm font-bold text-slate-900 hover:text-teal-700 transition-colors inline-flex items-center gap-2">
              See more logs <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Chart: Error Distribution */}
        <div className="lg:col-span-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Issue Distribution</h3>
            <button className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 hover:bg-teal-100 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Timeframe Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 border-b border-slate-100 pb-6">
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">1 hour</p>
              <p className="text-sm font-bold text-slate-900">275</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">24 hours</p>
              <p className="text-sm font-bold text-slate-900">1,420</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 font-medium mb-1">7 days</p>
              <p className="text-sm font-bold text-slate-900">8,200</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-900 cursor-pointer flex items-center gap-1">
              Last month <ChevronDownIcon />
            </span>
          </div>

          {/* Donut Chart & Legend */}
          <div className="flex-1 flex flex-col items-center justify-center relative mt-4">
            <div className="h-48 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorDistribution}
                    innerRadius="70%"
                    outerRadius="90%"
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {errorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text inside Donut */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xs text-rose-500 font-bold mb-1">JS Exceptions</span>
                <span className="text-2xl font-bold text-slate-900">8,400</span>
              </div>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 mt-6 w-full px-4">
              {errorDistribution.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-medium text-slate-500">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---

function VitalCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-32">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <button className="text-slate-300 hover:text-slate-500 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}