document.addEventListener('DOMContentLoaded', () => {
    const statsData = [
        { title: 'Motif', text: 'Beragam motif yang penuh makna' },
        { title: 'Proses', text: 'Dari mencanting hingga menjadi kain' },
        { title: 'Warisan', text: 'Budaya turun menurun Kota Solo' }
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
    
    // API CALLS
    async function getMotifData(){ 
        try {
            const res = await fetch('motif-data.json', {method: 'GET'});
            return await res.json(); 
        } catch (error) {
            console.error(error.message);
            return []; 
        }
    }

    // END API CALLS

    async function generateMotifCards() {
        const container = document.querySelector('.content-grid');
        const motifData = await getMotifData();
        if (!container) return;
        let html = '';

        //  ID MOTIF MENYESUAIKAN INDEX OBJECT JSON
        let index = 0;
        motifData.forEach(motif => {
            const featuredClass = motif.featured ? 'featured-card' : '';
            html += `
                <article class="content-card ${featuredClass}" id="${index}">
                    <img src="${motif.image}" alt="Batik ${motif.title}" class="card-image">
                    <div class="card-body">
                        <span class="card-tag">${motif.tag}</span>
                        <h3>${motif.title}</h3>
                        <p class="card-description">${motif.description}</p>
                    </div>
                </article>
            `;
            index++;
        });
        container.innerHTML = html;

        loadCardEventListener();
    }

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

    let deleteToggle = false;
    const delButton = document.querySelector('#delete');
    delButton.addEventListener('click', () =>{
        deleteToggle = !deleteToggle;
        loadCardEventListener();
    })

    let removeController;
    let popUpController;
    function loadCardEventListener(){
        if (!deleteToggle){
            if (removeController) removeController.abort();
            const bottomBar = document.getElementById('delete-bar');
            bottomBar.style.display = 'none';
            cardPopup();
        } 
        else{
            if (popUpController) popUpController.abort();
            const bottomBar = document.getElementById('delete-bar');
            bottomBar.style.display = 'block';
            cardDeletion();
        }
    }

    function cardPopup(){
        popUpController = new AbortController();
        const allMotifCards = document.querySelectorAll('.content-card');
        const modalOverlay = document.getElementById('motif-modal');
        const closeModalButton = modalOverlay.querySelector('.modal-close');

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
                    if (!deleteToggle) openModal(card);
                },
                {signal: popUpController.signal}
                );
            });

            closeModalButton.addEventListener('click', closeModal, {signal: popUpController.signal});
            modalOverlay.addEventListener('click', (event) => {
                if (event.target === modalOverlay) closeModal();
            });
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) closeModal();
            });
        }
    }

    function cardDeletion(){
        removeController = new AbortController();
        const allMotifCards = document.querySelectorAll('.content-card');
        const modalOverlay = document.getElementById('delete-modal');
        const closeModalButton = modalOverlay.querySelector('.modal-close');
        const confirmDelete = modalOverlay.querySelector('#confirm-delete');
        const cancel = modalOverlay.querySelector('#cancel-delete');
        let toDeleted;

        if (modalOverlay) {
            const openModal = () => {
                modalOverlay.classList.remove('hidden');
            };

            const closeModal = () => {
                modalOverlay.classList.add('hidden');
            };
        
            allMotifCards.forEach(card => {
                card.addEventListener('click', (event) => {
                    toDeleted = card;
                    console.log(toDeleted.id);
                    event.preventDefault();
                    if (deleteToggle) openModal();
                },
                {signal: removeController.signal}
                );
            });

            confirmDelete.addEventListener('click', ()=> {
                toDeleted.remove();
                // BACKEND BELUM ADA
                closeModal();
            }, {signal: removeController.signal})

            cancel.addEventListener('click', () =>{
                closeModal();
            }, {signal: removeController.signal})

            closeModalButton.addEventListener('click', closeModal, {signal: removeController.signal});
            modalOverlay.addEventListener('click', (event) => {
                if (event.target === modalOverlay) closeModal();
            });
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) closeModal();
            });
        }
    }
});