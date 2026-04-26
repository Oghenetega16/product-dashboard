'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image'; 

export default function DashboardLayout({ children }: { children: ReactNode }) {
    // State to handle the mobile sidebar toggle
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Prevent background scrolling when mobile menu is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isSidebarOpen]);

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans text-slate-900 overflow-hidden">
            
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* 1. SIDEBAR */}
            <aside 
                className={`fixed inset-y-0 left-0 bg-white w-64 h-screen shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col shrink-0 md:relative md:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Brand Logo & Mobile Close Button */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-50 md:border-none">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-xl rounded-tl-xl rounded-br-xl shadow-sm shadow-violet-200">
                            O
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900">Orbit</span>
                    </div>
                    {/* Mobile Close Button */}
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-2 md:hidden text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        aria-label="Close sidebar"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 custom-scrollbar">
                    {/* Main Links */}
                    <NavItem icon={HomeIcon} label="Dashboard" />
                    <NavItem icon={BagIcon} label="Orders" />
                    <NavItem icon={UsersIcon} label="Customers" />
                    <NavItem icon={ChatIcon} label="Messages" />

                    {/* Tools Section */}
                    <div className="pt-6 pb-2">
                        <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tools</p>
                    </div>
                    <NavItem icon={TagIcon} label="Products" isActive={true} />
                    <NavItem icon={PlugIcon} label="Integrations" />
                    <NavItem icon={ChartIcon} label="Analytics" />
                    <NavItem icon={DocumentIcon} label="Invoice" />
                    <NavItem icon={PercentIcon} label="Discount" />
                
                    {/* Settings Section */}
                    <div className="pt-6 pb-2">
                        <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Settings</p>
                    </div>
                    <NavItem icon={CogIcon} label="Settings" />
                    <NavItem icon={ShieldIcon} label="Security" />
                    <NavItem icon={HelpIcon} label="Help" />
                </div>
            </aside>

            {/* Main Content Column */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
                
                {/* 2. TOP NAVBAR */}
                <header className="h-20 bg-white flex items-center justify-between px-4 md:px-8 z-10 shrink-0 shadow-sm border-b border-slate-100">
                    
                    <div className="flex items-center gap-2 flex-1">
                        {/* Mobile Hamburger Menu */}
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 md:hidden text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
                            aria-label="Open sidebar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        </button>

                        {/* Global Search - Hidden on very small screens, flexible on others */}
                        <div className="relative w-full max-w-xs md:max-w-md hidden sm:block ml-2 md:ml-0">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="block w-full p-2.5 pl-10 pr-12 text-sm text-slate-900 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-violet-500 transition-shadow outline-none" 
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <span className="text-xs text-slate-400 font-medium border border-slate-200 px-1.5 py-0.5 rounded-md bg-white">⌘ K</span>
                            </div>
                        </div>
                    </div>
                
                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3 md:gap-6 ml-auto">
                        <div className="flex items-center gap-1 md:gap-3 border-r border-slate-100 pr-3 md:pr-6">
                            {/* Mobile-only Search Icon */}
                            <button aria-label="Search" className="relative p-2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors sm:hidden">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                            
                            <button aria-label="Refresh activity" className="relative p-2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors hidden sm:block">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            </button>
                            
                            <button aria-label="View notifications" className="relative p-2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors">
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                            </button>
                        </div>

                        <button aria-label="Open user menu" className="flex items-center gap-2 md:gap-3 hover:opacity-80 transition-opacity shrink-0">
                            <Image 
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                                alt="User Avatar" 
                                width={36} 
                                height={36} 
                                className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border border-slate-200" 
                            />
                            {/* Hide name on small screens to save space */}
                            <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-700">
                                Oghenetega Sukuru
                                <svg className="w-4 h-4 text-slate-400 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </button>
                    </div>
                </header>

                {/* 3. MAIN CONTENT AREA */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

// --- Helper Components & Icons ---

function NavItem({ icon: Icon, label, isActive = false }: { icon: React.ElementType, label: string, isActive?: boolean }) {
    if (isActive) {
        return (
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-medium shadow-md shadow-violet-200 mb-1">
                <Icon className="w-5 h-5 text-white/90" />
                {label}
            </a>
        );
    }
    return (
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl text-sm font-medium transition-colors mb-1">
            <Icon className="w-5 h-5" />
            {label}
        </a>
    );
}

// Minimal SVG Icons typed with React.SVGProps
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const BagIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
const ChatIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
const TagIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>;
const PlugIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>;
const ChartIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const DocumentIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const PercentIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" /></svg>;
const CogIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ShieldIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const HelpIcon = (props: React.SVGProps<SVGSVGElement>) => <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;