document.addEventListener('DOMContentLoaded', () => {
    const statsData = [
        { title: 'Motif', text: 'Beragam motif yang penuh makna' },
        { title: 'Proses', text: 'Dari mencanting hingga menjadi kain' },
        { title: 'Warisan', text: 'Budaya turun menurun Kota Solo' }
    ];

    const motifData = [
        {
            image: 'img/parang.jpg', tag: 'Kekuatan & Kekuasaan', title: 'Motif Parang',
            description: 'Sebagai salah satu motif tertua, Parang melambangkan kekuasaan dan kekuatan. Pola diagonalnya menggambarkan perjuangan hidup yang tak pernah putus. Dulunya, motif ini hanya boleh dikenakan oleh raja.',
            featured: true
        },
        {
            image: 'img/kawung.jpg', tag: 'Kesucian & Umur Panjang', title: 'Motif Kawung',
            description: 'Terinspirasi dari buah kolang-kaling, dengan motif geometris ini melambangkan kesucian hati, kebijaksanaan, dan harapan akan umur panjang bagi semua pengguna motif ini.'
        },
        {
            image: 'img/truntum.jpg', tag: 'Cinta yang Bersemi', title: 'Motif Truntum',
            description: 'Melambangkan cinta yang tulus dan bersemi kembali. Biasanya dikenakan oleh orang tua pada upacara pernikahan anak-anaknya.'
        },
        {
            image: 'img/sogan.jpg', tag: 'Klasik Keraton', title: 'Motif Sogan',
            description: 'Ciri khas batik keraton dengan warna kecoklatan dari pewarna alami, melambangkan kerendahan hati, kesederhanaan, dan sifat membumi.'
        },
        {
            image: 'img/sidomukti.jpeg', tag: 'Kemakmuran & Kebahagiaan', title: 'Motif Sidomukti',
            description: 'Sering digunakan dalam upacara pernikahan, melambangkan harapan akan kehidupan yang mulia, makmur, dan senantiasa berbahagia.'
        },
        {
            image: 'img/sawat.jpg', tag: 'Perlindungan & Anugerah', title: 'Motif Sawat',
            description: 'Memiliki ornamen utama berupa sayap (sawat) dari burung garuda, yang melambangkan anugerah dan perlindungan dari Yang Maha Kuasa.'
        },
        {
            image: 'img/semen_rama.jpg', tag: 'Kehidupan & Kebijaksanaan', title: 'Motif Semen Rama',
            description: 'Mengandung ajaran kepemimpinan Asthabrata dari wiracarita Ramayana, melambangkan kehidupan yang bijaksana dan mulia.'
        },
        {
            image: 'img/sekar_jagad.jpg', tag: 'Keindahan & Keragaman', title: 'Motif Sekar Jagad',
            description: 'Terdiri dari berbagai macam motif dalam satu kain, melambangkan keindahan dan keragaman dunia laksana sebuah peta (\'kar jagad\').'
        },
        {
            image: 'img/motif_tambal.jpg', tag: 'Penyembuhan & Perbaikan', title: 'Motif Tambal',
            description: 'Terdiri dari gabungan kain-kain perca, motif ini dipercaya memiliki kekuatan spiritual untuk \'menambal\' atau menyembuhkan orang sakit.'
        },
        {
            image: 'img/cuwiri.jpg', tag: 'Penghormatan & Keselarasan', title: 'Motif Cuwiri',
            description: 'Pola kecil-kecil yang melambangkan penghormatan. Diharapkan pemakainya terlihat pantas, dihormati, dan selaras dengan lingkungan.'
        },
        {
            image: 'img/lereng.png', tag: 'Kesuburan & Harapan', title: 'Motif Lereng (Liris)',
            description: 'Variasi dari motif parang dengan pola diagonal, melambangkan kesuburan, harapan, ketabahan, dan doa bagi pemakainya.'
        },
        {
            image: 'img/bokor_kencana.jpeg', tag: 'Kemegahan & Keindahan', title: 'Motif Bokor Kencana',
            description: 'Berasal dari wadah bokor emas yang indah, motif ini melambangkan kemegahan, keindahan, dan kemewahan yang abadi.'
        },
        {
            image: 'img/sido_asih.jpg', tag: 'Kasih Sayang Abadi', title: 'Motif Sido Asih',
            description: 'Melambangkan kasih sayang yang berkesinambungan dan abadi. Sering digunakan agar pengantin selalu diselimuti cinta kasih.'
        },
    ];

    const galleryData = [
        { src: 'img/membatik8.jpg', caption: 'Proses Mencanting' },
        { src: 'img/membatik7.jpg', caption: 'Proses Pewarnaan Alami' },
        { src: 'img/membatik6.jpg', caption: 'Proses Lorod (Pelepasan Lilin)' },
        { src: 'img/membatik5.jpg', caption: 'Kain Batik Siap Digunakan' },
        { src: 'img/membatik3.jpg', caption: 'Proses Mencanting (Malam)' },
        { src: 'img/membatik2.jpg', caption: 'Proses Pewarnaan Alami' },
        { src: 'img/membatik.jpg', caption: 'Proses Lorod (Pelepasan Lilin)' },
        { src: 'img/membatik 4.jpg', caption: 'Kain Batik Siap Digunakan' }
    ];

    const stepsData = [
        { number: '01', icon: 'fas fa-scroll', title: 'Persiapan Kain (Mordanting)', description: 'Kain mori (katun atau sutra) dicuci dan direndam dalam larutan minyak nabati untuk menyiapkan serat kain agar dapat menyerap warna dengan sempurna.' },
        { number: '02', icon: 'fas fa-pencil-ruler', title: 'Membuat Pola (Nyungging)', description: 'Pengrajin menggambar sketsa motif batik di atas kain menggunakan pensil. Pola ini menjadi panduan untuk proses selanjutnya.' },
        { number: '03', icon: 'fas fa-fire', title: 'Mencanting (Melekatkan Lilin)', description: 'Menggunakan canting, pengrajin melukis di atas pola dengan lilin panas (malam). Area yang tertutup lilin akan menolak pewarna.' },
        { number: '04', icon: 'fas fa-palette', title: 'Pewarnaan (Nyolet/Nembok)', description: 'Kain dicelup ke dalam larutan pewarna alami. Proses ini bisa diulang berkali-kali untuk mencapai kedalaman warna yang diinginkan.' },
        { number: '05', icon: 'fas fa-water', title: 'Pelepasan Lilin (Nglorod)', description: 'Kain direbus dalam air panas untuk meluruhkan dan menghilangkan lapisan lilin, sehingga menampakkan motif asli yang berwarna putih.' },
        { number: '06', icon: 'fas fa-check-double', title: 'Finishing & Pengeringan', description: 'Setelah lilin bersih, kain dicuci sekali lagi lalu diangin-anginkan di tempat teduh hingga kering. Kini, mahakarya batik siap digunakan.' }
    ];

    const guideData = [
        {
            icon: 'fas fa-tint', title: 'Pilar 1: Cara Mencuci',
            description: 'Kesalahan dalam mencuci dapat merusak serat dan warna kain. Lakukan dengan lembut dan bahan yang tepat.',
            points: [
                { icon: 'fas fa-check-circle', title: 'Gunakan Lerak / Sampo', description: 'Hindari deterjen. Gunakan sari lerak atau sampo bayi yang lembut untuk menjaga warna.' },
                { icon: 'fas fa-check-circle', title: 'Cuci dengan Tangan', description: 'Jangan gunakan mesin cuci. Cukup kucek perlahan dengan tangan di bagian yang kotor.' },
                { icon: 'fas fa-check-circle', title: 'Jangan Diperas', description: 'Setelah dibilas, jangan memeras kain terlalu kencang agar serat kain tidak rusak.' }
            ]
        },
        {
            icon: 'fas fa-sun', title: 'Pilar 2: Penjemuran & Penyetrikaan',
            description: 'Panas berlebih adalah musuh utama batik. Proses pengeringan dan setrika perlu perhatian khusus.',
            points: [
                { icon: 'fas fa-check-circle', title: 'Jemur di Tempat Teduh', description: 'Hindari sinar matahari langsung. Angin-anginkan di tempat yang teduh hingga kering.' },
                { icon: 'fas fa-check-circle', title: 'Jangan Semprot Pewangi', description: 'Cairan pewangi atau pelembut bisa meninggalkan noda pada warna alami batik.' },
                { icon: 'fas fa-check-circle', title: 'Lapisi Saat Menyetrika', description: 'Setrika dalam keadaan kain sedikit lembab, dan selalu lapisi dengan kain lain di atasnya.' }
            ]
        },
        {
            icon: 'fas fa-box-open', title: 'Pilar 3: Penyimpanan Terbaik',
            description: 'Cara Anda menyimpan akan menentukan apakah batik akan awet atau justru rusak oleh jamur dan serangga.',
            points: [
                { icon: 'fas fa-check-circle', title: 'Gulung, Jangan Dilipat', description: 'Melipat kain akan meninggalkan bekas patahan. Sebaiknya gulung kain dengan rapi.' },
                { icon: 'fas fa-check-circle', title: 'Gunakan Lada atau Cengkeh', description: 'Hindari kapur barus. Gunakan merica atau cengkeh dalam buntalan kain untuk mencegah serangga.' },
                { icon: 'fas fa-check-circle', title: 'Anginkan Secara Berkala', description: 'Keluarkan batik dari lemari setiap beberapa bulan sekali untuk diangin-anginkan agar tidak lembab.' }
            ]
        }
    ];

    function generateHeroStats() {
        const container = document.querySelector('.hero-stats');
        if (!container) return;
        let html = '';
        statsData.forEach(stat => {
            html += `
                <div class="stat-item">
                    <h3>${stat.title}</h3>
                    <p>${stat.text}</p>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function generateMotifCards() {
        const container = document.querySelector('.content-grid');
        if (!container) return;
        let html = '';
        motifData.forEach(motif => {
            const featuredClass = motif.featured ? 'featured-card' : '';
            html += `
                <article class="content-card ${featuredClass}">
                    <img src="${motif.image}" alt="Batik ${motif.title}" class="card-image">
                    <div class="card-body">
                        <span class="card-tag">${motif.tag}</span>
                        <h3>${motif.title}</h3>
                        <p class="card-description">${motif.description}</p>
                    </div>
                </article>
            `;
        });
        container.innerHTML = html;
    }

    function generateGallery() {
        const container = document.querySelector('.gallery-scroll');
        if (!container) return;
        let html = '';
        [...galleryData, ...galleryData].forEach(item => {
            html += `
                <div class="gallery-item">
                    <figure>
                        <img src="${item.src}" alt="${item.caption}">
                        <figcaption>${item.caption}</figcaption>
                    </figure>
                </div>
            `;
        });
        container.innerHTML = html;
    }

    function generateSteps() {
        const container = document.querySelector('.steps-container');
        if (!container) return;
        let html = '';
        stepsData.forEach(step => {
            html += `
                <article class="step-item">
                    <div class="step-number">${step.number}</div>
                    <div class="step-icon"><i class="${step.icon}"></i></div>
                    <div class="step-content">
                        <h3>${step.title}</h3>
                        <p>${step.description}</p>
                    </div>
                </article>
            `;
        });
        container.innerHTML = html;
    }

    function generateGuide() {
        const container = document.querySelector('.guide-container');
        if (!container) return;
        let html = '';
        guideData.forEach(guide => {
            let pointsHtml = '';
            guide.points.forEach(point => {
                pointsHtml += `
                    <div class="point-item">
                        <div class="point-title"><i class="${point.icon}"></i> ${point.title}</div>
                        <div class="point-description">${point.description}</div>
                    </div>
                `;
            });
            html += `
                <article class="guide-row">
                    <div class="guide-icon-lg"><i class="${guide.icon}"></i></div>
                    <div class="guide-content">
                        <h3>${guide.title}</h3>
                        <p>${guide.description}</p>
                        <div class="points-list">${pointsHtml}</div>
                    </div>
                </article>
            `;
        });
        container.innerHTML = html;
    }

    generateHeroStats();
    generateMotifCards();
    generateGallery();
    generateSteps();
    generateGuide();

    const allMotifCards = document.querySelectorAll('.content-card');
    const modalOverlay = document.getElementById('motif-modal');
    const closeModalButton = document.querySelector('.modal-close');

    if (modalOverlay) {
        const modalImage = document.getElementById('modal-img');
        const modalTag = document.getElementById('modal-tag');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');

        const openModal = (card) => {
            const imageSrc = card.querySelector('.card-image').src;
            const tagText = card.querySelector('.card-tag').textContent;
            const titleText = card.querySelector('h3').textContent;
            const descriptionText = card.querySelector('.card-description').textContent;

            modalImage.src = imageSrc;
            modalTag.textContent = tagText;
            modalTitle.textContent = titleText;
            modalDescription.textContent = descriptionText;

            modalOverlay.classList.remove('hidden');
        };

        const closeModal = () => {
            modalOverlay.classList.add('hidden');
        };

        allMotifCards.forEach(card => {
            card.addEventListener('click', (event) => {
                event.preventDefault();
                openModal(card);
            });
        });

        closeModalButton.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) closeModal();
        });
    }

});