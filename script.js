// Menunggu sampai seluruh konten halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    
    // Kode untuk Hamburger Menu (dari jawaban sebelumnya)
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    allNavLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // ============================================
    // ======== BARU: KODE VALIDASI FORMULIR ========
    // ============================================
    const bookingForm = document.getElementById('booking-form');

    bookingForm.addEventListener('submit', function(event) {
        // Mencegah form dikirim secara default
        event.preventDefault();

        // Mengambil nilai dari setiap input
        const nama = document.getElementById('nama').value.trim();
        const email = document.getElementById('email').value.trim();
        const tujuan = document.getElementById('tujuan').value;
        const tanggal = document.getElementById('tanggal').value;
        const jumlah = document.getElementById('jumlah').value;

        // Validasi sederhana
        if (nama === '' || email === '' || tujuan === '' || tanggal === '' || jumlah === '') {
            alert('Mohon lengkapi semua kolom yang wajib diisi.');
            return; // Hentikan fungsi jika ada yang kosong
        }

        // Validasi tanggal: tidak boleh tanggal di masa lalu
        const tanggalDipesan = new Date(tanggal);
        const hariIni = new Date();
        hariIni.setHours(0, 0, 0, 0); // Atur jam ke awal hari untuk perbandingan

        if (tanggalDipesan < hariIni) {
            alert('Tanggal pendakian tidak boleh di masa lalu.');
            return;
        }

        // Jika semua validasi lolos
        alert(`Terima kasih, ${nama}!\nBooking Anda untuk ${jumlah} orang ke ${tujuan} pada tanggal ${tanggal} telah kami terima.\nKami akan segera menghubungi Anda melalui email.`);
        
        // Mengosongkan formulir setelah berhasil
        bookingForm.reset();
    });
});