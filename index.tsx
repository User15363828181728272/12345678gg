import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { SETTINGS } from './settings';
import { Sidebar, MobileNav, HamburgerDrawer } from './Navigation';
import { 
  Header, DashboardView, SiswaView, StudentDetail, 
  AibGallery, KenanganGallery, StrukturView, ParentsView, QuotesView, TermsView
} from './Views';

const App = () => {
  const [path, setPath] = useState(() => {
    const p = window.location.pathname;
    return (p === '/' || p === '' || p === '/index.html') ? '/dashboard' : p;
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    const timer = setTimeout(() => setIsLoaded(true), 150);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearTimeout(timer);
    };
  }, []);

  const navigate = (newPath: string) => {
    if (newPath === path) return;
    try {
      window.history.pushState({}, '', newPath);
    } catch (e) {
      console.warn("Navigation: pushState failed. Using state-only fallback.");
    }
    setPath(newPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const label = newPath.split('/')[1] || 'Dashboard';
    document.title = `Sperada | ${label.charAt(0).toUpperCase() + label.slice(1)}`;
  };

  const renderContent = () => {
    if (path.startsWith('/siswa/')) {
      const idStr = path.split('/')[2];
      const id = parseInt(idStr);
      if (!isNaN(id)) {
        return <StudentDetail id={id} onBack={() => navigate('/siswa')} />;
      }
    }

    switch (path) {
      case '/dashboard': return <DashboardView navigate={navigate} />;
      case '/struktur': return <StrukturView />;
      case '/siswa': return <SiswaView onSelect={(id) => navigate(`/siswa/${id}`)} />;
      case '/foto-kelas': return (
        <div className="page-transition">
          <Header title="Foto Kelas" subtitle="Arsip dokumentasi resmi angkatan." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SETTINGS.gallery.fotoKelas.map((url, i) => (
              <div key={i} className="group relative aspect-[4/3] rounded-3xl overflow-hidden glass shadow-sm hover:shadow-xl transition-all duration-500">
                <img src={url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Kelas" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-bold">Momen Ke-{i+1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      case '/foto-aib': return <AibGallery />;
      case '/orang-tua': return <ParentsView onSelect={(id) => navigate(`/siswa/${id}`)} />;
      case '/kata-kata': return <QuotesView />;
      case '/kenangan': return <KenanganGallery />;
      case '/terms': return <TermsView />;
      default: return <DashboardView navigate={navigate} />;
    }
  };

  if (!isLoaded) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-[999]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-indigo-900 tracking-[0.2em] uppercase">Memuat Sperada...</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar currentPath={path} navigate={navigate} />
      <HamburgerDrawer 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        navigate={navigate} 
      />
      
      <main className="flex-1 lg:ml-72 p-6 md:p-10 lg:p-16 max-w-7xl mx-auto w-full pb-32 lg:pb-16">
        <div key={path} className="page-transition">
          {renderContent()}
        </div>

        <footer className="mt-32 pt-16 border-t border-slate-200/60 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <i className="fa-solid fa-graduation-cap text-xs"></i>
                </div>
                <h4 className="font-black text-xl tracking-tighter">Sperada</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Platform dokumentasi digital eksklusif untuk warga kelas {SETTINGS.className} UPT SMPN 18 Gresik.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tautan Internal</h5>
              <div className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                <button onClick={() => navigate('/dashboard')} className="text-left hover:text-indigo-600 transition-colors">Beranda</button>
                <button onClick={() => navigate('/siswa')} className="text-left hover:text-indigo-600 transition-colors">Data Siswa</button>
                <button onClick={() => navigate('/terms')} className="text-left hover:text-indigo-600 transition-colors">Kebijakan Privasi</button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Akses Eksternal</h5>
              <div className="flex flex-col gap-2 text-sm font-semibold text-slate-600">
                <a href={SETTINGS.externalLinks.xte} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 flex items-center gap-2">
                  <span>Website Utama (XTE)</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-40"></i>
                </a>
                <a href={SETTINGS.externalLinks.depstore} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 flex items-center gap-2">
                  <span>Owner Website</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-40"></i>
                </a>
                <a href={SETTINGS.externalLinks.school} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 flex items-center gap-2">
                  <span>Situs Sekolah</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px] opacity-40"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 Sperada • Developed by {SETTINGS.developer.name}</p>
            <div className="flex gap-6 text-slate-400">
              <a href="https://instagram.com/depann15_" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors"><i className="fa-brands fa-instagram text-lg"></i></a>
              <a href="https://github.com/depannn11" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors"><i className="fa-brands fa-github text-lg"></i></a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 transition-colors"><i className="fa-brands fa-whatsapp text-lg"></i></a>
            </div>
          </div>
        </footer>
      </main>

      <MobileNav 
        currentPath={path} 
        navigate={navigate} 
        openMenu={() => setIsMenuOpen(true)} 
      />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);