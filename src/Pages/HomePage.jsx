import { useState, useEffect } from 'react';
import { initialMatches } from '../Interfaces/mockData';
import AddMatchForm from '../Components/AddMatchForm';
import MatchCard from '../Components/MatchCard';

function HomePage() {
  const [matches, setMatches] = useState(() => {
    const savedMatches = localStorage.getItem('hakemAppMatches');
    return savedMatches ? JSON.parse(savedMatches) : initialMatches;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tümü');

  useEffect(() => {
    localStorage.setItem('hakemAppMatches', JSON.stringify(matches));
  }, [matches]);

  const handleAddMatch = (newMatch) => {
    // YENİ: Formdan gelen maça default 8.4 gözlemci notu ekliyoruz
    const matchWithObserverPoint = { ...newMatch, observerPoint: 8.4 };
    setMatches([matchWithObserverPoint, ...matches]);
  };

  const handleDeleteMatch = (id) => {
    setMatches(matches.filter(match => match.id !== id));
  };

  const handleUpdateMatch = (id, updatedMatch) => {
    // MatchCard'dan gelen güncellenmiş veriyi (yeni gözlemci notu dahil) state'e yazıyoruz
    setMatches(matches.map(match => match.id === id ? updatedMatch : match));
  };

  // --- HESAPLAMALAR ---
  const totalMatches = matches.length;
  const playedMatches = matches.filter(m => m.status === 'Oynandı');
  const playedCount = playedMatches.length;
  const pendingCount = matches.filter(m => m.status === 'Bekliyor').length;
  
  // Gözlemci Not Ortalaması Hesaplama (Dinamik)
  const observerAvg = playedMatches.length > 0 
    ? (playedMatches.reduce((acc, m) => acc + (Number(m.observerPoint) || 8.4), 0) / playedMatches.length).toFixed(2)
    : "0.00";

  // Ayrı Ayrı Kart Ortalamaları
  const totalYellows = playedMatches.reduce((sum, m) => sum + (Number(m.yellowCards) || 0), 0);
  const totalReds = playedMatches.reduce((sum, m) => sum + (Number(m.redCards) || 0), 0);
  
  const yellowAverage = playedCount > 0 ? (totalYellows / playedCount).toFixed(1) : "0.0";
  const redAverage = playedCount > 0 ? (totalReds / playedCount).toFixed(1) : "0.0";

// Filtreleme ve YENİ: Tarihe Göre Sıralama
  const filteredMatches = matches
    .filter(match => {
      const matchesSearch = match.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            match.awayTeam.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'Tümü' || match.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); 

  return (
    <div className="max-w-6xl mx-auto p-5 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 uppercase tracking-wide">
        Hakem Maç Ajandası ⚽
      </h1>

      {/* 6'LI İSTATİSTİK PANELİ */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8 text-center">
        <div className="bg-white p-4 rounded-lg shadow-md border-b-4 border-blue-500">
          <p className="text-xs text-gray-500 font-bold uppercase">Toplam Maç</p>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{totalMatches}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-b-4 border-green-500">
          <p className="text-xs text-gray-500 font-bold uppercase">Yönetilen</p>
          <p className="text-3xl font-extrabold text-green-600 mt-2">{playedCount}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md border-b-4 border-yellow-500">
          <p className="text-xs text-gray-500 font-bold uppercase">Bekleyen</p>
          <p className="text-3xl font-extrabold text-yellow-500 mt-2">{pendingCount}</p>
        </div>
        {/* AYRI SARI KART ORTALAMASI */}
        <div className="bg-white p-4 rounded-lg shadow-md border-b-4 border-amber-400">
          <p className="text-xs text-gray-500 font-bold uppercase">Sarı Kart Ort.</p>
          <p className="text-3xl font-extrabold text-amber-500 mt-2">{yellowAverage}</p>
        </div>
        {/* AYRI KIRMIZI KART ORTALAMASI */}
        <div className="bg-white p-4 rounded-lg shadow-md border-b-4 border-red-600">
          <p className="text-xs text-gray-500 font-bold uppercase">Kırmızı Ort.</p>
          <p className="text-3xl font-extrabold text-red-600 mt-2">{redAverage}</p>
        </div>
        {/* GÖZLEMCİ NOTU ORTALAMASI */}
        <div className="bg-white p-4 rounded-xl shadow-sm border-b-4 border-purple-500 text-center">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Gözlemci Ort.</p>
          <p className="text-3xl font-extrabold text-purple-600 mt-2">{observerAvg}</p>
        </div>
      </div>
      
      <AddMatchForm onAdd={handleAddMatch} />

      <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col sm:flex-row gap-4 border-l-4 border-purple-500">
        <input 
          type="text" 
          placeholder="Takım Ara..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded focus:ring-2 focus:ring-purple-400 outline-none"
        />
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-purple-400 outline-none"
        >
          <option value="Tümü">Tüm Maçlar</option>
          <option value="Bekliyor">Bekleyenler</option>
          <option value="Oynandı">Oynananlar</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            <MatchCard 
              key={match.id} 
              match={match} 
              onDelete={handleDeleteMatch}
              onUpdate={handleUpdateMatch}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">Maç bulunamadı.</p>
        )}
      </div>

      {/* Sayfa Altı (Footer) Bilgi Bölümü */}
      <footer className="mt-16 pb-10 text-center space-y-2">
        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-1">
            📦 Veriler LocalStorage'da saklanır
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1">
            ⚽ Hakem Gözlemci Raporu Sistemi
          </span>
        </div>
        <div className="text-gray-400 text-xs tracking-widest uppercase">
          React + Vite + Tailwind CSS | Netlify'da Deploy Edildi
        </div>
        <div className="text-blue-500 font-medium text-sm pt-2">
          © 2026 Kerem Yıldırım - Bilgisayar Mühendisliği Projesi
        </div>
      </footer>
    </div>
  );
}

export default HomePage;