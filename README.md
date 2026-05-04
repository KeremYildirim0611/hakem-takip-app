# ⚽ Hakem Maç Ajandası PRO

Hakemlerin maç görevlerini, saha içi istatistiklerini ve gözlemci değerlendirmelerini profesyonel bir arayüzle takip edebilmeleri için geliştirilmiş modern bir web uygulamasıdır. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/b1a62bf0-a29d-4e96-a197-21eddf96de6a/deploy-status)](https://hakem-ajandasi-pro.netlify.app/)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## 🌍 Canlı Uygulama

Uygulamayı canlı olarak denemek için tıklayın: **[Hakem Maç Ajandası PRO - Canlı Demo](https://hakem-ajandasi-pro.netlify.app)**

---

## ✨ Özellikler

- **Detaylı Maç Kaydı:** Ev sahibi, deplasman, tarih ve görev (Orta Hakem, 4. Hakem vb.) bilgileriyle yeni maç atamaları oluşturma.
- **Sonuç ve İstatistik Girişi:** Oynanan maçların skorunu, sarı/kırmızı kart sayılarını ve saha içi notlarını sisteme işleme.
- **Gözlemci Notu Takibi:** Her maç için varsayılan 8.4 olarak başlayan ve sonradan güncellenebilen gözlemci performans puanı sistemi.
- **Otomatik Analiz Paneli:** 
  - Toplam, oynanan ve bekleyen maç sayısı.
  - Maç başına düşen ortalama sarı ve kırmızı kart oranları.
  - Genel gözlemci not ortalaması.
- **Gelişmiş Arama ve Filtreleme:** Takım adına göre hızlı arama ve maç durumuna (Bekleyen/Oynanan) göre filtreleme.
- **Kalıcı Veri Depolama:** Tarayıcı tabanlı `LocalStorage` teknolojisi sayesinde sunucuya ihtiyaç duymadan verilerin cihazda güvenle saklanması.

---

## 🛠️ Kullanılan Teknolojiler

*   **Frontend Framework:** React 18 (Vite ile oluşturuldu)
*   **Stil/Tasarım:** Tailwind CSS
*   **Veritabanı Simülasyonu:** Tarayıcı LocalStorage (Client-side)
*   **Deployment (Yayınlama):** Netlify

---

## 📸 Ekran Görüntüsü
<img width="706" height="875" alt="Site Arayüzü" src="https://github.com/user-attachments/assets/6d9517b2-1dd2-47c8-b7e7-b7517136fb05" />

---

## 🚀 Yerel Kurulum (Local Development)

Projeyi kendi bilgisayarınızda çalıştırmak isterseniz aşağıdaki adımları izleyebilirsiniz:

1. Projeyi bilgisayarınıza klonlayın:
   ```bash
   git clone [https://github.com/KeremYildirim0611/hakem-takip-app.git](https://github.com/KeremYildirim0611/hakem-takip-app.git)
