let currentPage = 'welcomePage';
let historyStack = [];

function showPage(pageId) {
    const nextPage = document.getElementById(pageId);
    const currentPageElement = document.getElementById(currentPage);

    historyStack.push(currentPage);
    currentPageElement.classList.add('transitioning');
    nextPage.classList.add('active');

    setTimeout(() => {
        currentPageElement.classList.remove('active', 'transitioning');
    }, 500);

    currentPage = pageId;
}

function goBack() {
    if (historyStack.length === 0) return;

    const prevPageId = historyStack.pop();
    const currentPageElement = document.getElementById(currentPage);
    const prevPage = document.getElementById(prevPageId);

    currentPageElement.classList.add('transitioning');
    prevPage.classList.add('active');

    setTimeout(() => {
        currentPageElement.classList.remove('active', 'transitioning');
    }, 500);

    currentPage = prevPageId;
}

function showContentPage(contentType) {
    const contentPage = document.getElementById('contentPage');
    const titleMap = {
        panduan: 'Petunjuk Penggunaan',
        tujuan: 'Tujuan Pembelajaran',
        absen: 'Absensi',
        materi: 'Materi Pembelajaran',
        video: 'Video Pembelajaran',
        kuis: 'Kuis Interaktif',
        profil: 'Profil Pengembang'
    };

    document.getElementById('contentTitle').textContent = titleMap[contentType];
    document.getElementById('contentBody').innerHTML = generateContent(contentType);
    showPage('contentPage');
}

function generateContent(type) {
    // Tambahkan konten sesuai tipe
    const contents = {
        panduan: '<p>Petunjuk penggunaan media pembelajaran...</p>',
        tujuan: '<p>Tujuan pembelajaran yang ingin dicapai...</p>',
        // Tambahkan konten lainnya
    };
    return contents[type] || '<p>Konten sedang dalam pengembangan</p>';
}

function showNext() {
    // Implementasi logika next button
    alert('Fitur lanjut sedang dikembangkan!');
}

document.addEventListener('DOMContentLoaded', () => {
    // Handle back button animation
    const backButtons = document.querySelectorAll('.back-btn');

    backButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const currentPage = document.querySelector('.container > div');

            // Tambahkan animasi keluar
            currentPage.classList.add('page-exit');

            // Tunggu animasi selesai sebelum navigasi
            setTimeout(() => {
                window.location.href = button.href;
            }, 500);
        });
    });

    // Handle page enter animation
    const currentPage = document.querySelector('.container > div');
    if(currentPage) {
        currentPage.classList.add('page-enter');
    }
});

// Mobile button toggle
document.addEventListener('DOMContentLoaded', function() {
    const backBtn = document.querySelector('.welcome-back-btn.mobile-adapt');

    if (window.innerWidth <= 768) {
        backBtn.addEventListener('click', function(e) {
            if (!this.classList.contains('active')) {
                e.preventDefault();
                this.classList.add('active');
                setTimeout(() => {
                    window.location.href = this.href;
                }, 3000); // Auto-navigate after 3 seconds
            }
        });

        // Close on click outside
        document.addEventListener('click', function(e) {
            if (!backBtn.contains(e.target)) {
                backBtn.classList.remove('active');
            }
        });
    }
});
