import React, { useState } from 'react';
import { SETTINGS } from './settings';
import { VerifiedBadge } from './Navigation';

export const Header = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <header className="mb-12">
    <div className="flex flex-col gap-1">
      <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.4em] mb-2 block">{SETTINGS.schoolName}</span>
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">{title}</h2>
      {subtitle && <p className="text-slate-500 font-medium text-lg mt-3 max-w-2xl">{subtitle}</p>}
    </div>
  </header>
);

export const DashboardView = ({ navigate }: { navigate: (p: string) => void }) => (
  <div className="space-y-12">
    <div className="relative h-[400px] md:h-[550px] w-full rounded-[3rem] overflow-hidden group shadow-2xl">
      <img src={SETTINGS.schoolPhoto} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Sperada" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent p-10 md:p-16 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-4">
           <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/20">Official Portal</span>
        </div>
        <h2 className="text-white text-4xl md:text-7xl font-black tracking-tighter leading-tight max-w-3xl">Class {SETTINGS.className} Memories.</h2>
        <p className="text-indigo-100/80 mt-4 text-base md:text-xl font-medium max-w-xl">Mengabadikan setiap detik kebersamaan kita di UPT SMPN 18 Gresik angkatan {SETTINGS.academicYear}.</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-indigo-600 p-10 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200 group hover:-translate-y-2 transition-transform cursor-pointer" onClick={() => navigate('/siswa')}>
        <div className="flex justify-between items-start mb-10">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center"><i className="fa-solid fa-users text-xl"></i></div>
          <i className="fa-solid fa-arrow-up-right-from-square text-white/40 group-hover:text-white transition-colors"></i>
        </div>
        <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest mb-1">Populasi Kelas</p>
        <h3 className="text-5xl font-black">{SETTINGS.students.length} <span className="text-xl font-medium opacity-60">Siswa</span></h3>
      </div>
      
      <div className="glass p-10 rounded-[2.5rem] border border-white shadow-sm hover:shadow-xl transition-all cursor-pointer group" onClick={() => navigate('/foto-aib')}>
        <div className="flex justify-between items-start mb-10">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center"><i className="fa-solid fa-face-grin-squint text-xl text-indigo-600"></i></div>
          <i className="fa-solid fa-arrow-up-right-from-square text-slate-200 group-hover:text-indigo-300 transition-colors"></i>
        </div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Galeri Eksklusif</p>
        <h3 className="text-5xl font-black text-slate-900">{SETTINGS.gallery.fotoAib.length} <span className="text-xl font-medium text-slate-400">Aib</span></h3>
      </div>

      <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-xl hover:-translate-y-2 transition-transform group">
        <div className="flex justify-between items-start mb-10">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30"><i className="fa-solid fa-terminal text-xl"></i></div>
          <a href={SETTINGS.developer.url} target="_blank" rel="noopener noreferrer"><i className="fa-solid fa-arrow-up-right-from-square text-slate-600 hover:text-indigo-400 transition-colors"></i></a>
        </div>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Architect</p>
        <h3 className="text-2xl font-black flex items-center gap-2">{SETTINGS.developer.name} <VerifiedBadge /></h3>
        <p className="text-[10px] text-slate-400 font-bold mt-1 tracking-widest uppercase">Senior Frontend Engineer</p>
      </div>
    </div>
  </div>
);

export const SiswaView = ({ onSelect }: { onSelect: (id: number) => void }) => {
  const [search, setSearch] = useState('');
  const filtered = SETTINGS.students.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <Header title="Data Siswa" subtitle="Daftar lengkap penghuni kelas 9-E yang luar biasa." />
        <div className="relative group w-full md:w-80">
          <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors"></i>
          <input 
            type="text" 
            placeholder="Cari nama temanmu..." 
            className="w-full pl-14 pr-6 py-4 rounded-2xl glass border border-white focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-semibold text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filtered.map(s => (
          <div key={s.id} onClick={() => onSelect(s.id)} className="group bg-white p-4 rounded-[2.5rem] border border-slate-100 shadow-sm cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="aspect-[3/4] rounded-[2rem] overflow-hidden mb-5 relative">
              <img src={s.photo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={s.name} />
              <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {s.isDev && <div className="absolute top-3 right-3 glass p-1.5 rounded-xl border-white/40"><VerifiedBadge /></div>}
            </div>
            <div className="text-center">
              <h4 className="font-black text-slate-900 text-sm tracking-tight truncate px-2">{s.name}</h4>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Absen {s.id.toString().padStart(2, '0')}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300 text-3xl"><i className="fa-solid fa-user-slash"></i></div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Temanmu tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export const StudentDetail = ({ id, onBack }: { id: number, onBack: () => void }) => {
  const s = SETTINGS.students.find(st => st.id === id);
  if (!s) return null;

  return (
    <div className="space-y-10">
      <button onClick={onBack} className="flex items-center gap-3 text-slate-400 hover:text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] transition-all group">
        <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Kembali ke List
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <div className="aspect-[3/4] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white group">
            <img src={s.photo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={s.name} />
          </div>
          <div className="glass p-8 rounded-[2.5rem] border-white shadow-sm space-y-6">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-black">#{s.id}</div>
               <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">No. Absen</p><p className="font-black text-slate-900">Ranked Participant</p></div>
             </div>
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 font-black"><i className="fa-solid fa-heart"></i></div>
               <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Wali Murid</p><p className="font-black text-slate-900">{s.parent}</p></div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase tracking-widest rounded-full">Siswa Aktif</span>
              {s.isDev && <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[9px] font-black uppercase tracking-widest rounded-full">Web Architect</span>}
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none">{s.name} {s.isDev && <VerifiedBadge />}</h1>
          </div>

          <div className="bg-slate-900 p-12 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
            <i className="fa-solid fa-quote-left absolute top-8 left-8 text-white/5 text-8xl"></i>
            <p className="text-2xl md:text-3xl font-medium text-white italic leading-relaxed relative z-10">"{s.quote}"</p>
            <div className="mt-12 flex items-center gap-4 relative z-10 border-t border-white/10 pt-8">
               <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white"><i className="fa-solid fa-star text-xs"></i></div>
               <div><p className="text-white font-black text-sm">{s.name}</p><p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Class {SETTINGS.className} Legend</p></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-8 rounded-[2.5rem] border-white shadow-sm space-y-4 hover:shadow-xl transition-all group">
              <h5 className="font-black text-slate-900 tracking-tight">Perjalanan Akademik</h5>
              <p className="text-slate-500 text-sm leading-relaxed">Bergabung di UPT SMPN 18 Gresik pada tahun 2023, {s.name.split(' ')[0]} merupakan bagian integral dari perjuangan kelas 9-E.</p>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                <span className="w-2 h-2 rounded-full bg-indigo-200"></span>
              </div>
            </div>
            <div className="glass p-8 rounded-[2.5rem] border-white shadow-sm space-y-4 hover:shadow-xl transition-all">
              <h5 className="font-black text-slate-900 tracking-tight">Koneksi Sosial</h5>
              <div className="flex flex-wrap gap-2">
                {['Friendly', 'Motivator', 'Optimist', '9-E Team'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-slate-100 rounded-xl text-[10px] font-bold text-slate-600">#{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StrukturView = () => (
  <div className="space-y-12 max-w-4xl mx-auto">
    <Header title="Struktur Kelas" subtitle="Para pejuang di balik layar kesuksesan organisasi 9-E." />
    <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-slate-100 shadow-2xl text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
      <img src={SETTINGS.classLogo} className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-[3rem] shadow-2xl mb-12 object-cover border-8 border-white ring-1 ring-slate-100" alt="Logo" />
      <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-16 tracking-tighter italic">"One Team, One Dream."</h3>
      <div className="grid gap-6 text-left">
        {Object.entries(SETTINGS.structure).map(([key, val]) => (
          <div key={key} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-1 md:mb-0">{val.role}</span>
            <span className="text-xl font-black text-slate-900 tracking-tight">{val.name}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const ParentsView = ({ onSelect }: { onSelect: (id: number) => void }) => (
  <div className="space-y-10">
    <Header title="Wali Murid" subtitle="Daftar orang tua/wali yang mendukung langkah kita." />
    <div className="glass rounded-[3rem] border-white shadow-sm overflow-hidden overflow-x-auto">
      <table className="w-full text-left min-w-[600px]">
        <thead className="bg-slate-50/50 border-b border-slate-200/50">
          <tr>
            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Absen</th>
            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Lengkap Siswa</th>
            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nama Wali</th>
            <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {SETTINGS.students.map(s => (
            <tr key={s.id} className="hover:bg-indigo-50/30 transition-colors group cursor-pointer" onClick={() => onSelect(s.id)}>
              <td className="px-10 py-6 font-bold text-slate-400">#{s.id.toString().padStart(2, '0')}</td>
              <td className="px-10 py-6 font-black text-slate-900">{s.name} {s.isDev && <VerifiedBadge />}</td>
              <td className="px-10 py-6 font-medium text-slate-600">{s.parent}</td>
              <td className="px-10 py-6 text-right">
                <button className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-all shadow-sm">
                  <i className="fa-solid fa-chevron-right text-xs"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const AibGallery = () => (
  <div className="space-y-10">
    <Header title="Arsip Aib" subtitle="Koleksi rahasia yang seharusnya tidak ada di publik. (9-E Only)" />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {SETTINGS.gallery.fotoAib.map((url, i) => (
        <div key={i} className="group relative aspect-square rounded-[2rem] overflow-hidden glass border-white shadow-sm hover:shadow-2xl transition-all duration-700 hover:-rotate-2">
          <img src={url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-125 transition-all duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      ))}
    </div>
  </div>
);

export const KenanganGallery = () => (
  <div className="space-y-10">
    <Header title="Kenangan Indah" subtitle="Galeri visual perjalanan panjang kita selama di sekolah." />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {SETTINGS.gallery.fotoKenangan.map((url, i) => (
        <div key={i} className="group relative aspect-video rounded-[3rem] overflow-hidden shadow-2xl">
          <img src={url} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button className="w-16 h-16 rounded-full bg-white text-indigo-600 flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-all duration-500">
              <i className="fa-solid fa-expand text-xl"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const QuotesView = () => (
  <div className="space-y-10">
    <Header title="Pesan & Kesan" subtitle="Untaian kata perpisahan dan motivasi dari kita semua." />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {SETTINGS.students.map(s => (
        <div key={s.id} className="glass p-12 rounded-[3.5rem] border-white shadow-sm relative group hover:shadow-2xl transition-all overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors"></div>
          <i className="fa-solid fa-quote-right absolute top-8 right-8 text-slate-100 text-6xl"></i>
          <p className="text-xl md:text-2xl font-medium text-slate-800 italic leading-relaxed relative z-10">"{s.quote}"</p>
          <div className="mt-12 flex items-center gap-5 relative z-10">
            <img src={s.photo} className="w-14 h-14 rounded-2xl object-cover shadow-lg border-2 border-white ring-1 ring-slate-100" />
            <div>
              <h5 className="font-black text-slate-900 tracking-tight">{s.name} {s.isDev && <VerifiedBadge />}</h5>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">Absen {s.id}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const TermsView = () => (
  <div className="max-w-4xl space-y-12">
    <Header title="Aturan Portal" subtitle="Ketentuan penggunaan layanan Sperada." />
    <div className="space-y-8 glass p-10 md:p-16 rounded-[4rem] border-white shadow-xl">
      <section className="space-y-4">
        <h4 className="text-2xl font-black text-slate-900 tracking-tight">1. Penggunaan Internal</h4>
        <p className="text-slate-500 leading-relaxed">Website ini dikelola secara pribadi untuk kepentingan dokumentasi kelas {SETTINGS.className} UPT SMPN 18 Gresik. Dilarang membagikan konten sensitif ke luar lingkungan sekolah tanpa izin.</p>
      </section>
      <section className="space-y-4">
        <h4 className="text-2xl font-black text-slate-900 tracking-tight">2. Hak Cipta Gambar</h4>
        <p className="text-slate-500 leading-relaxed">Seluruh foto dalam galeri merupakan properti bersama warga kelas. Penggunaan foto untuk tujuan komersial atau merugikan pihak lain dilarang keras.</p>
      </section>
      <section className="space-y-4">
        <h4 className="text-2xl font-black text-slate-900 tracking-tight">3. Data Pribadi</h4>
        <p className="text-slate-500 leading-relaxed">Data nama dan wali murid hanya digunakan sebagai arsip digital. Jika ada ketidaksesuaian data, harap hubungi administrator.</p>
      </section>
      <div className="pt-10 border-t border-slate-100">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose text-center">Last Updated: 12 Februari 2026 • Admin: {SETTINGS.developer.name}</p>
      </div>
    </div>
  </div>
);