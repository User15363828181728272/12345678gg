import React from 'react';
import { SETTINGS } from './settings';

export const VerifiedBadge = () => (
  <span className="inline-flex items-center justify-center w-4 h-4 bg-indigo-500 rounded-full ml-1 flex-shrink-0">
    <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="4">
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

const NAV_ITEMS = [
  { id: '/dashboard', icon: 'fa-house', label: 'Dashboard' },
  { id: '/struktur', icon: 'fa-sitemap', label: 'Struktur' },
  { id: '/siswa', icon: 'fa-user-group', label: 'Siswa' },
  { id: '/foto-kelas', icon: 'fa-images', label: 'Galeri' },
  { id: '/foto-aib', icon: 'fa-face-laugh-squint', label: 'Arsip Aib' },
  { id: '/orang-tua', icon: 'fa-address-card', label: 'Wali Murid' },
  { id: '/kata-kata', icon: 'fa-comment-dots', label: 'Quotes' },
  { id: '/kenangan', icon: 'fa-film', label: 'Memories' },
];

export const Sidebar = ({ currentPath, navigate }: any) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-72 glass border-r border-slate-200/60 hidden lg:flex flex-col p-8 z-50">
      <div className="flex items-center gap-3 mb-12 cursor-pointer group" onClick={() => navigate('/dashboard')}>
        <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
          <i className="fa-solid fa-graduation-cap text-white text-lg"></i>
        </div>
        <div>
          <h1 className="font-black text-xl tracking-tighter text-slate-900 leading-none">Sperada</h1>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">Class {SETTINGS.className}</p>
        </div>
      </div>

      <nav className="space-y-1">
        {NAV_ITEMS.map(item => {
          const isActive = currentPath === item.id || (item.id === '/siswa' && currentPath.startsWith('/siswa'));
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group ${
                isActive 
                ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 font-bold' 
                : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <i className={`fa-solid ${item.icon} text-lg w-5 text-center ${isActive ? 'text-white' : 'group-hover:scale-110'}`}></i>
              <span className="text-sm tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">Architect</p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <i className="fa-solid fa-code text-xs"></i>
          </div>
          <span className="text-sm font-bold truncate">{SETTINGS.developer.name}</span>
        </div>
      </div>
    </aside>
  );
};

export const MobileNav = ({ currentPath, navigate, openMenu }: any) => (
  <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md glass border border-white shadow-2xl rounded-[2.5rem] p-2 flex justify-around items-center lg:hidden z-[100]">
    {[
      { id: '/dashboard', icon: 'fa-house', label: 'Home' },
      { id: '/siswa', icon: 'fa-users', label: 'Students' },
      { id: '/foto-kelas', icon: 'fa-camera', label: 'Photos' },
    ].map(item => {
      const isActive = currentPath.startsWith(item.id);
      return (
        <button
          key={item.id}
          onClick={() => navigate(item.id)}
          className={`flex flex-col items-center gap-1 p-2 rounded-3xl transition-all ${isActive ? 'text-indigo-600 px-6 bg-indigo-50/50' : 'text-slate-400 hover:text-indigo-400'}`}
        >
          <i className={`fa-solid ${item.icon} text-lg`}></i>
          <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
        </button>
      );
    })}
    <button onClick={openMenu} className="flex flex-col items-center gap-1 p-2 text-slate-400 hover:text-indigo-400">
      <i className="fa-solid fa-grip-lines text-lg"></i>
      <span className="text-[8px] font-black uppercase tracking-widest">More</span>
    </button>
  </nav>
);

export const HamburgerDrawer = ({ isOpen, onClose, navigate }: any) => (
  <>
    <div className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[110] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
    <div className={`fixed right-0 top-0 h-full w-[85%] max-w-sm glass border-l border-white/50 z-[120] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} p-10 flex flex-col gap-10 shadow-2xl`}>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Menu Utama</h3>
        <button onClick={onClose} className="w-10 h-10 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto no-scrollbar">
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => { navigate(item.id); onClose(); }} className="flex items-center gap-5 px-6 py-4 rounded-2xl hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 font-bold transition-all group">
            <i className={`fa-solid ${item.icon} text-lg w-6 text-center group-hover:scale-110 transition-transform`}></i>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  </>
);