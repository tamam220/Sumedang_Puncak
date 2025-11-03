document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const allNavLinks = document.querySelectorAll('.nav-links li a');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open'); 
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    if (allNavLinks.length > 0) {
        allNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    const bookingForm = document.getElementById('booking-form');

    if (bookingForm) { 
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nama = document.getElementById('nama').value.trim();
            const email = document.getElementById('email').value.trim();
            const tujuan = document.getElementById('tujuan').value;
            const tanggal = document.getElementById('tanggal').value;
            const jumlah = document.getElementById('jumlah').value;
            if (nama === '' || email === '' || tujuan === '' || tanggal === '' || jumlah === '') {
                alert('Mohon lengkapi semua kolom yang wajib diisi.');
                return;
            }
            const tanggalDipesan = new Date(tanggal);
            const hariIni = new Date();
            hariIni.setHours(0, 0, 0, 0); 

            if (tanggalDipesan < hariIni) {
                alert('Tanggal pendakian tidak boleh di masa lalu.');
                return;
            }
            alert(`Terima kasih, ${nama}!\nBooking Anda untuk ${jumlah} orang ke ${tujuan} pada tanggal ${tanggal} telah kami terima.\nKami akan segera menghubungi Anda melalui email.`);
            bookingForm.reset();
        });
    }


});
