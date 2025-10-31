// Jalankan script setelah halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // Cari kontainer cuaca di halaman
    const weatherContainer = document.getElementById('weather-forecast-container');
    
    // Dapatkan path halaman saat ini (misal: /tampomas.html)
    const path = window.location.pathname;

    let lat, lon;
    let mountainName = '';

    // ==========================================================
    // == PUSAT DATA KOORDINAT GUNUNG ==
    // ==========================================================
    if (path.includes('tampomas.html')) {
        mountainName = 'Gunung Tampomas';
        lat = -6.7766; // Lintang
        lon = 107.9548; // Bujur
    } else if (path.includes('kerenceng.html')) {
        mountainName = 'Gunung Kerenceng';
        lat = -6.9344;
        lon = 107.8819;
    } else if (path.includes('geulis.html')) {
        mountainName = 'Gunung Geulis';
        lat = -6.9333; // (Dekat Jatinangor)
        lon = 107.7766;
    } else if (path.includes('calancang.html')) {
        mountainName = 'Gunung Calancang';
        lat = -6.9582;
        lon = 107.9503;
    } else if (path.includes('lingga.html')) {
        mountainName = 'Gunung Lingga';
        lat = -6.8530; // (Estimasi, mohon verifikasi jika perlu)
        lon = 108.0632;
    } 
    // === DATA YANG PERLU ANDA CARI ===
    else if (path.includes('jambu.html')) {
        mountainName = 'Gunung Jambu';
        lat = -6.8277556; // <-- GANTI DENGAN LINTANG GUNUNG JAMBU
        lon = 107.777358; // <-- GANTI DENGAN BUJUR GUNUNG JAMBU
    } else if (path.includes('kacapi.html')) {
        mountainName = 'Gunung Kacapi';
        lat = -6.8268534; // <-- GANTI DENGAN LINTANG GUNUNG KACAPI
        lon = 107.8586772; // <-- GANTI DENGAN BUJUR GUNUNG KACAPI
    } else if (path.includes('kunci.html')) {
        mountainName = 'Gunung Kunci';
        lat = -6.856205; // <-- GANTI DENGAN LINTANG GUNUNG KUNCI
        lon = 107.9142772; // <-- GANTI DENGAN BUJUR GUNUNG KUNCI
    }
    // ==========================================================

    // Ambil elemen judul <h3> di widget
    const weatherTitle = document.querySelector('.weather-widget h3');

    // Jika kontainer dan koordinat valid (bukan 0), ambil data cuaca
    if (weatherContainer && lat !== 0.0 && lon !== 0.0) {
        // Ubah judul widget agar sesuai dengan nama gunung
        if (weatherTitle) {
            weatherTitle.textContent = `Kondisi Cuaca (${mountainName})`;
        }
        fetchWeather(lat, lon, weatherContainer);
    } else if (weatherContainer) {
        // Tampilkan pesan jika data koordinat belum diisi
        container.innerHTML = '<p style="color: #888;">Koordinat untuk gunung ini belum diatur di weather.js.</p>';
    }
});

/**
 * Mengambil data cuaca dari Open-Meteo
 */
async function fetchWeather(lat, lon, container) {
    // API URL untuk 3 hari ke depan, zona waktu Jakarta
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,windspeed_10m_max&timezone=Asia/Jakarta&forecast_days=3`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Gagal mengambil data cuaca');
        }
        const data = await response.json();
        displayWeather(data, container);

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p style="color: red;">Gagal memuat data cuaca. Coba lagi nanti.</p>';
    }
}

/**
 * Menampilkan data cuaca di halaman
 * (Fungsi ini TIDAK BERUBAH dari sebelumnya)
 */
function displayWeather(data, container) {
    // Kosongkan pesan "Memuat..."
    container.innerHTML = ''; 

    const daily = data.daily;
    
    // Loop untuk setiap hari (3 hari)
    for (let i = 0; i < daily.time.length; i++) {
        const date = new Date(daily.time[i]);
        const dayName = formatDay(date, i);
        const weather = getWeatherInfo(daily.weathercode[i]);
        const temp = Math.round(daily.temperature_2m_max[i]);
        const wind = daily.windspeed_10m_max[i].toFixed(1); // 1 angka desimal

        // Buat kartu HTML untuk setiap hari
        const card = document.createElement('div');
        card.className = 'weather-day-card';
        if (i === 0) {
            card.classList.add('today'); // Tambah style khusus untuk 'Hari ini'
        }
        
        card.innerHTML = `
            <h4>${dayName}</h4>
            <div class="weather-icon">
                <i class="${weather.icon}"></i>
            </div>
            <div class="weather-desc">${weather.desc}</div>
            <div class="weather-temp">${temp}°C</div>
            <div class="weather-wind">
                <i class="fas fa-wind"></i> ${wind} km/j
            </div>
        `;
        container.appendChild(card);
    }
}

/**
 * Helper: Mengubah tanggal menjadi nama hari (misal: "Hari ini", "Sabtu")
 * (Fungsi ini TIDAK BERUBAH dari sebelumnya)
 */
function formatDay(date, index) {
    if (index === 0) {
        return 'Hari ini';
    }
    // 'id-ID' untuk format hari Indonesia
    return date.toLocaleDateString('id-ID', { weekday: 'long' }); 
}

/**
 * Helper: Menerjemahkan kode cuaca (WMO code) menjadi ikon dan deskripsi
 * (Fungsi ini TIDAK BERUBAH dari sebelumnya)
 */
function getWeatherInfo(code) {
    if (code === 0) return { desc: 'Cerah', icon: 'fas fa-sun' };
    if (code === 1) return { desc: 'Cerah', icon: 'fas fa-sun' };
    if (code === 2) return { desc: 'Berawan', icon: 'fas fa-cloud-sun' };
    if (code === 3) return { desc: 'Berawan', icon: 'fas fa-cloud' };
    if (code === 45 || code === 48) return { desc: 'Berkabut', icon: 'fas fa-smog' };
    if (code >= 51 && code <= 55) return { desc: 'Gerimis', icon: 'fas fa-cloud-rain' };
    if (code >= 61 && code <= 65) return { desc: 'Hujan', icon: 'fas fa-cloud-showers-heavy' };
    if (code === 80 || code === 81 || code === 82) return { desc: 'Hujan Ringan', icon: 'fas fa-cloud-rain' };
    if (code === 95 || code === 96 || code === 99) return { desc: 'Badai Petir', icon: 'fas fa-bolt' };
    // Default jika kode tidak dikenal
    return { desc: 'Berawan', icon: 'fas fa-cloud' };
}