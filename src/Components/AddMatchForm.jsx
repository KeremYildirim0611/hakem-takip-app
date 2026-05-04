import { useState } from 'react';

function AddMatchForm({ onAdd }) {
  // Formdaki girdileri tutacağımız state'ler (durumlar)
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [date, setDate] = useState('');
  const [role, setRole] = useState('Orta Hakem');

  // "Maçı Kaydet" butonuna basıldığında çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    // Yeni maç objesini oluştur
    const newMatch = {
      id: Date.now(), // Benzersiz bir kimlik numarası (o anki zamanı kullanırız)
      date: date,
      homeTeam: homeTeam,
      awayTeam: awayTeam,
      role: role,
      status: 'Bekliyor', // Yeni eklenen maç her zaman önce beklenir
      score: '',
      notes: ''
    };

    // Oluşturulan bu maçı ana sayfaya (HomePage) gönder
    onAdd(newMatch);

    // Eklendikten sonra formun içini tekrar boşalt/temizle
    setHomeTeam('');
    setAwayTeam('');
    setDate('');
    setRole('Orta Hakem');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-blue-500">
      <h2 className="text-xl font-bold mb-4 text-gray-700">Yeni Maç Görevi Ekle</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          type="text" 
          placeholder="Ev Sahibi Takım (Örn: Konyaspor)" 
          value={homeTeam} 
          onChange={(e) => setHomeTeam(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          required
        />
        <input 
          type="text" 
          placeholder="Deplasman Takımı" 
          value={awayTeam} 
          onChange={(e) => setAwayTeam(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          required
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
          required
        />
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
        >
          <option value="Orta Hakem">Orta Hakem</option>
          <option value="1. Yardımcı Hakem">1. Yardımcı Hakem</option>
          <option value="2. Yardımcı Hakem">2. Yardımcı Hakem</option>
          <option value="4. Hakem">4. Hakem</option>
          <option value="VAR">VAR</option>
          <option value="AVAR">AVAR</option>
        </select>
      </div>
      
      <button type="submit" className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
        Görevi Kaydet
      </button>
    </form>
  );
}

export default AddMatchForm;