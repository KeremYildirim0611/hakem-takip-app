import { useState } from 'react';

function MatchCard({ match, onDelete, onUpdate }) {
  // Düzenleme modunda olup olmadığımızı tutan durum
  const [isEditing, setIsEditing] = useState(false);
  
  // Güncellenecek verileri tutan durumlar 
  const [score, setScore] = useState(match.score || '');
  const [notes, setNotes] = useState(match.notes || '');
  const [yellowCards, setYellowCards] = useState(match.yellowCards || 0);
  const [redCards, setRedCards] = useState(match.redCards || 0);
  
  // Gözlemci notunu tutan state
  const [observerPoint, setObserverPoint] = useState(match.observerPoint || 8.4);

  // Kaydet butonuna basıldığında çalışacak fonksiyon
  const handleSave = () => {
    onUpdate(match.id, { 
      ...match, 
      score: score, 
      notes: notes, 
      yellowCards: parseInt(yellowCards) || 0,
      redCards: parseInt(redCards) || 0,
      observerPoint: parseFloat(observerPoint) || 8.4, // Ondalıklı sayıya çeviriyoruz
      status: 'Oynandı' 
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-all">
      {isEditing ? (
        /* DÜZENLEME MODU (Form Alanı) */
        <div className="space-y-4">
          
          {/* TEK BİR ANA GRİD: Orta hakemse 4 eşit parça, değilse skor geniş kalır */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Maç Skoru (Orta Hakem değilse 3 kolonluk yer kaplar, Orta Hakemse 1 kolon) */}
            <div className={`col-span-2 ${match.role === 'Orta Hakem' ? 'md:col-span-1' : 'md:col-span-3'}`}>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Maç Skoru</label>
              <input 
                type="text" 
                value={score} 
                onChange={(e) => setScore(e.target.value)} 
                placeholder="Örn: 2-1"
                className="w-full border border-gray-300 rounded shadow-sm p-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            {/* KOŞULLU RENDER: Sadece Orta Hakem ise kartlar görünür */}
            {match.role === 'Orta Hakem' && (
              <>
                <div className="col-span-1">
                  <label className="block text-[10px] sm:text-xs font-bold text-yellow-600 uppercase mb-1 truncate">Sarı Kart</label>
                  <input 
                    type="number" 
                    value={yellowCards} 
                    onChange={(e) => setYellowCards(e.target.value)} 
                    className="w-full border border-gray-300 rounded shadow-sm p-2 focus:ring-yellow-500 outline-none"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-[10px] sm:text-xs font-bold text-red-600 uppercase mb-1 truncate">Kır. Kart</label>
                  <input 
                    type="number" 
                    value={redCards} 
                    onChange={(e) => setRedCards(e.target.value)} 
                    className="w-full border border-gray-300 rounded shadow-sm p-2 focus:ring-red-500 outline-none"
                  />
                </div>
              </>
            )}

            {/* Gözlemci Notu (Her zaman görünür) */}
            <div className="col-span-2 md:col-span-1">
              <label className="block text-[10px] sm:text-xs font-bold text-blue-600 uppercase mb-1 truncate">Gözlemci Notu</label>
              <input 
                type="number" 
                step="0.1"
                value={observerPoint} 
                onChange={(e) => setObserverPoint(e.target.value)} 
                className="w-full border border-blue-300 rounded shadow-sm p-2 bg-blue-50 focus:ring-blue-500 outline-none font-bold text-center"
              />
            </div>
          </div>

          {/* Notlar Kısmı */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hakem Notları</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              rows="2"
              className="w-full border border-gray-300 rounded shadow-sm p-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          <div className="flex space-x-2 pt-2">
            <button onClick={handleSave} className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 font-bold transition-colors">Kaydet</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300 font-bold transition-colors">İptal</button>
          </div>
        </div>
      ) : (
        /* NORMAL GÖRÜNÜM MODU */
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="w-full sm:w-auto mb-4 sm:mb-0">
            <p className="text-xs text-gray-400 font-bold mb-1 uppercase">
              📅 {match.date} | 👕 {match.role}
            </p>
            <h2 className="text-xl font-bold text-gray-800">
              {match.homeTeam} <span className="text-gray-400">vs</span> {match.awayTeam}
            </h2>
            
            {/* Oynandı ve Orta Hakem olma şartı */}
            {match.status === 'Oynandı' && match.role === 'Orta Hakem' && (
               <div className="flex space-x-3 mt-1">
                 <span className="text-xs font-bold text-yellow-600">🟨 {match.yellowCards || 0} Sarı</span>
                 <span className="text-xs font-bold text-red-600">🟥 {match.redCards || 0} Kırmızı</span>
               </div>
            )}

            {match.notes && (
              <p className="text-sm text-gray-600 mt-2 italic border-l-2 border-gray-200 pl-2">"{match.notes}"</p>
            )}
          </div>

          <div className="text-right flex flex-col items-end w-full sm:w-auto">
            <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-2 ${
              match.status === 'Oynandı' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {match.status}
            </span>
            <p className="font-black text-3xl text-gray-800 mb-1">{match.score || '- -'}</p>
            
            {/* Gözlemci Notu Rozeti*/}
            <div className="mb-3 flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100 text-xs font-semibold">
              ⭐ Gözlemci Notu: {match.observerPoint || 8.4}
            </div>
            
            <div className="flex space-x-2">
              <button onClick={() => setIsEditing(true)} className="text-xs bg-blue-50 text-blue-700 px-3 py-2 rounded hover:bg-blue-100 font-bold transition-all">
                Sonuç Gir
              </button>
              <button onClick={() => onDelete(match.id)} className="text-xs bg-red-50 text-red-700 px-3 py-2 rounded hover:bg-red-100 font-bold transition-all">
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MatchCard;