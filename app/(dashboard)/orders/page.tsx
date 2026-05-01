'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const mockOrders = [
  { id: '#78522135', product: 'Smart watch', address: '351 Shearwood Forest Drive', date: '20/03/2021', price: '$376.00', status: 'Complete' },
  { id: '#78522135', product: 'Headphones', address: '6391 Elgin St. Celina', date: '21/03/2021', price: '$276.00', status: 'Pending' },
  { id: '#78522135', product: 'Iphone Pro', address: '8502 Preston Rd. Inglewood', date: '01/04/2021', price: '$300.00', status: 'Canceled' },
  { id: '#78522135', product: 'Apple AirPods Pro', address: '4517 Washington Ave. Manchester', date: '01/04/2021', price: '$200.00', status: 'Complete' },
  { id: '#78522135', product: 'Nike Air Max', address: '3891 Ranchview Dr. Richardson', date: '02/04/2021', price: '$100.00', status: 'Complete' },
  { id: '#78522135', product: 'Girls Bag', address: '2972 Westheimer Rd. Santa Ana', date: '02/04/2021', price: '$75.00', status: 'Pending' },
  { id: '#78522135', product: 'Canon 600d', address: '3517 W. Gray St. Utica', date: '03/04/2021', price: '$500.00', status: 'Pending' },
  { id: '#78522135', product: 'Apple Watch', address: '4140 Parker Rd. Allentown', date: '07/04/2021', price: '$300.00', status: 'Complete' },
  { id: '#78522135', product: 'Alexa Box', address: '2464 Royal Ln. Mesa', date: '09/04/2021', price: '$75.00', status: 'Complete' },
  { id: '#78522135', product: 'Apple Macbook Air 13"', address: '3517 W. Gray St. Utica', date: '10/04/2021', price: '$600.00', status: 'Canceled' },
];

export default function OrdersPage() {
  return (
    <div className="bg-white rounded-3xl p-8 min-h-[80vh] shadow-sm border border-slate-100">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Order</h1>
          <span className="text-sm text-slate-400 font-medium">15 Orders found</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors">
          <Calendar className="w-4 h-4" />
          Mar - April, 2021
          <ChevronDown className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-100 mb-6">
        <button className="pb-4 text-sm font-semibold text-blue-500 border-b-2 border-blue-500">All orders</button>
        <button className="pb-4 text-sm font-medium text-slate-400 hover:text-slate-700">Completed</button>
        <button className="pb-4 text-sm font-medium text-slate-400 hover:text-slate-700">Pending</button>
        <button className="pb-4 text-sm font-medium text-slate-400 hover:text-slate-700">Cancel</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400 font-medium border-b border-slate-50">
              <th className="pb-4 font-medium w-12">#</th>
              <th className="pb-4 font-medium flex items-center gap-1">Order ID <ChevronDown className="w-3 h-3"/></th>
              <th className="pb-4 font-medium">Product Name <ChevronDown className="w-3 h-3 inline"/></th>
              <th className="pb-4 font-medium">Address <ChevronDown className="w-3 h-3 inline"/></th>
              <th className="pb-4 font-medium">Date <ChevronDown className="w-3 h-3 inline"/></th>
              <th className="pb-4 font-medium">Price <ChevronDown className="w-3 h-3 inline"/></th>
              <th className="pb-4 font-medium text-center">Status <ChevronDown className="w-3 h-3 inline"/></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockOrders.map((order, index) => (
              <tr key={index} className="hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 text-slate-400">{index + 1}</td>
                <td className="py-4 text-slate-900 font-medium">{order.id}</td>
                <td className="py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 overflow-hidden">
                     {/* Placeholder for product image */}
                    <div className="w-4 h-4 bg-slate-300 rounded-sm"></div>
                  </div>
                  <span className="text-slate-900 font-medium">{order.product}</span>
                </td>
                <td className="py-4 text-slate-500 truncate max-w-[200px]">{order.address}</td>
                <td className="py-4 text-slate-500">{order.date}</td>
                <td className="py-4 text-slate-900 font-medium">{order.price}</td>
                <td className="py-4 text-center">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-medium inline-block w-24 text-center
                    ${order.status === 'Complete' ? 'bg-emerald-50 text-emerald-500' : 
                      order.status === 'Pending' ? 'bg-orange-50 text-orange-400' : 
                      'bg-rose-50 text-rose-400'}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8 text-sm">
        <p className="text-slate-400">Showing 1 to 10 of 100 entries</p>
        <div className="flex items-center gap-1">
          <button className="px-3 py-1 text-slate-400 hover:text-slate-700">Previous</button>
          {[1, 2, 3, 4, 5, 6, 7].map((page) => (
            <button 
              key={page} 
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-medium transition-colors ${
                page === 1 ? 'bg-blue-500 text-white shadow-md shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-3 py-1 text-slate-900 font-medium hover:text-blue-600">Next</button>
        </div>
      </div>
    </div>
  );
}