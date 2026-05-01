'use client';

import React from 'react';
import { Search, ChevronDown, Star, Plus, MoreHorizontal } from 'lucide-react';

// --- TypeScript Interfaces ---
interface CustomerTag {
  label: string;
  color: string;
}

interface Customer {
  id: string;
  name: string;
  tags: CustomerTag[];
  rating: number;
  orders: number;
  ltv: string;
  lastOrder: string;
  phone: string;
  isChecked: boolean;
}

// --- Mock Data ---
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Carmen Beltrán',
    tags: [
      { label: 'returning', color: 'bg-yellow-100 text-yellow-700' },
      { label: 'vip', color: 'bg-pink-100 text-pink-700' },
      { label: 'active', color: 'bg-blue-100 text-blue-700' },
      { label: '+2', color: 'bg-slate-100 text-slate-600' }
    ],
    rating: 4.6,
    orders: 23,
    ltv: '$38,900',
    lastOrder: '$45 3d ago',
    phone: '689-954-9674',
    isChecked: false,
  },
  {
    id: '2',
    name: 'Caspar Sawrey',
    tags: [
      { label: 'returning', color: 'bg-yellow-100 text-yellow-700' },
      { label: 'vip', color: 'bg-pink-100 text-pink-700' },
      { label: 'active', color: 'bg-blue-100 text-blue-700' }
    ],
    rating: 5.0,
    orders: 12,
    ltv: '$28,900',
    lastOrder: '$45 10d ago',
    phone: '482-881-5424',
    isChecked: false,
  },
  {
    id: '3',
    name: 'Unknown #8493',
    tags: [{ label: 'new', color: 'bg-emerald-100 text-emerald-700' }],
    rating: 3.0,
    orders: 0,
    ltv: '$19,029',
    lastOrder: 'None',
    phone: 'Unknown',
    isChecked: false,
  },
  {
    id: '4',
    name: 'Jana Strassmann',
    tags: [{ label: 'returning', color: 'bg-yellow-100 text-yellow-700' }],
    rating: 4.6,
    orders: 1,
    ltv: '$23,083',
    lastOrder: '$45 3d ago',
    phone: '817-947-6604',
    isChecked: false,
  },
  {
    id: '5',
    name: 'Lilah Ioselev',
    tags: [
      { label: 'returning', color: 'bg-yellow-100 text-yellow-700' },
      { label: 'active', color: 'bg-blue-100 text-blue-700' }
    ],
    rating: 4.2,
    orders: 4,
    ltv: '$38,900',
    lastOrder: '$45 3d ago',
    phone: '902-938-8817',
    isChecked: false,
  },
  {
    id: '6',
    name: 'Oka Tomoaki',
    tags: [{ label: 'returning', color: 'bg-yellow-100 text-yellow-700' }],
    rating: 4.6,
    orders: 2,
    ltv: '$28,900',
    lastOrder: '$45 3d ago',
    phone: '079-663-5092',
    isChecked: true,
  },
];

export default function CustomersPage() {
  return (
    <div className="max-w-7xl mx-auto min-h-[80vh]">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        
        {/* Header & Controls */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customers</h1>
            <button 
              aria-label="Filter by returning and new customers"
              className="cursor-pointer flex items-center gap-2 text-sm font-medium text-slate-500 border border-slate-200 rounded-full px-4 py-1.5 hover:bg-slate-50 transition-colors"
            >
              Returning & New <ChevronDown className="w-4 h-4" />
            </button>
            <div className="relative ml-4">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input 
                type="text" 
                placeholder="Search customers" 
                aria-label="Search customers"
                title="Search customers"
                className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 transition-all" 
              />
            </div>
          </div>
          <button 
            aria-label="Add new customer"
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Customer
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead>
              <tr className="text-slate-400 font-medium border-b border-slate-100">
                <th className="pb-4 pl-4 font-medium w-12">
                  <input 
                    type="checkbox" 
                    aria-label="Select all customers"
                    className="cursor-pointer rounded text-blue-600 focus:ring-blue-500" 
                  />
                </th>
                <th className="pb-4 font-medium flex items-center gap-1">Name <ChevronDown className="w-3 h-3"/></th>
                <th className="pb-4 font-medium">Rating</th>
                <th className="pb-4 font-medium">Orders</th>
                <th className="pb-4 font-medium">LTV</th>
                <th className="pb-4 font-medium">Last Order</th>
                <th className="pb-4 font-medium">Phone</th>
                <th className="pb-4 font-medium text-right pr-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="py-4 pl-4">
                    <input 
                      type="checkbox" 
                      checked={customer.isChecked}
                      readOnly
                      aria-label={`Select ${customer.name}`}
                      className="cursor-pointer rounded text-blue-600 focus:ring-blue-500" 
                    />
                  </td>
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                        <span className="text-xs font-bold text-slate-500">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{customer.name}</p>
                        <div className="flex gap-1 mt-1">
                          {customer.tags.map((tag, i) => (
                             <span key={i} className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${tag.color}`}>
                               {tag.label}
                             </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-6">
                    <div className="flex items-center gap-1 text-slate-700 font-medium">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 
                      {customer.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="py-4 pr-6 text-slate-700 font-medium">{customer.orders}</td>
                  <td className="py-4 pr-6 text-slate-900 font-medium">{customer.ltv}</td>
                  <td className="py-4 pr-6 text-slate-500">{customer.lastOrder}</td>
                  <td className="py-4 pr-6 text-slate-500">{customer.phone}</td>
                  <td className="py-4 pr-4 text-right">
                    <button 
                      aria-label={`View options for ${customer.name}`}
                      className="cursor-pointer p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors inline-flex items-center justify-center"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer: Bulk Actions & Pagination */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-100">
          <div className="flex gap-2">
            <button aria-label="Delete selected customers" className="cursor-pointer px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">DELETE</button>
            <button aria-label="Block selected customers" className="cursor-pointer px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">BLOCK</button>
            <button aria-label="Bulk edit selected customers" className="cursor-pointer px-4 py-2 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors">BULK EDIT</button>
          </div>
          
          <div className="flex items-center gap-1 text-sm">
            <button className="px-3 py-1 text-slate-400 hover:text-slate-700 font-medium cursor-pointer transition-colors">Previous</button>
            {[1, 2, 3].map((page) => (
              <button 
                key={page} 
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium transition-colors cursor-pointer ${
                  page === 1 ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-1 text-slate-900 font-medium hover:text-blue-600 cursor-pointer transition-colors">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}