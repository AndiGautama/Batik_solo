import {STATS_DATA, GALLERY_DATA, STEPS_DATA, GUIDE_DATA} from './constants.js';

document.addEventListener('DOMContentLoaded', () => {
    const statsData = STATS_DATA;
    const galleryData = GALLERY_DATA;
    const stepsData = STEPS_DATA;
    const guideData = GUIDE_DATA; 

    let removeController;
    let popUpController;
    let addController;

    let cardIndex = 0;
    let motifDataStore = [];
    
    async function initMotifData() {
        motifDataStore = await getMotifData(); 
        motifDataStore.forEach((motif, index) => motif.id = index); 
        cardIndex = motifDataStore.length; 
    }

    initMotifData().then(() => {
        generateMotifCards();
    });

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
    async function generateMotifCards(motifDataOverride = null) {
        const motifData = motifDataOverride || motifDataStore; 
        const container = document.querySelector('.content-grid');
        if (!container) return;
        let html = '';
        cardIndex = 0;
        //  ID MOTIF MENYESUAIKAN INDEX OBJECT JSON
        motifData.forEach(motif => {
            const featuredClass = motif.featured ? 'featured-card' : '';
            html += `
                <article id="${cardIndex}" class="content-card ${featuredClass}">
                    <img src="${motif.image}" alt="Batik ${motif.title}" class="card-image">
                    <div class="card-body">
                        <span class="card-tag">${motif.tag}</span>
                        <h3>${motif.title}</h3>
                        <p class="card-description">${motif.description}</p>
                    </div>
                </article>
            `;
            cardIndex++;
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

    // EVENT LISTENER

    let deleteToggle = false;
    const delButton = document.getElementById('delete');
    delButton.addEventListener('click', () =>{
        deleteToggle = !deleteToggle;
        loadCardEventListener();
    })

    const addButton = document.getElementById('add');
    addButton.addEventListener('click', () =>{
        addCardPopUp();
    })

    const filterSelection = document.getElementById('filter');
    filterSelection.addEventListener('change', () =>{
        filterCards(filterSelection.value);
    })

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
                motifDataStore.splice(toDeleted.id, 1);
                generateMotifCards();
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

    function addCardPopUp(){
        let image;
        let description;
        let title;
        let tag;
        let featured = false;
        addController = new AbortController();
        const modalOverlay = document.getElementById('add-modal');
        const closeModalButton = modalOverlay.querySelector('.modal-close');

        if (modalOverlay) {
            modalOverlay.classList.remove('hidden');
            const closeModal = () => {
                modalOverlay.classList.add('hidden');
            };
            const featuredRadio = modalOverlay.querySelector('#featured-radio');
            const notFeaturedRadio = modalOverlay.querySelector('#not-featured-radio');
            const imageInput = modalOverlay.querySelector('#upload-image-input');
            const titleInput = modalOverlay.querySelector('#title-text-form');
            const descInput = modalOverlay.querySelector('#desc-text-form');
            const tagInput = modalOverlay.querySelector('#tag-text-form');
            notFeaturedRadio.checked =  true;

            featuredRadio.addEventListener('change', () => featured = true, {signal: addController.signal});
            notFeaturedRadio.addEventListener('change', () => featured = false, {signal: addController.signal});

            imageInput.addEventListener('change', () =>{
                if(imageInput.files.length === 1) image = imageInput.files[0];
            });
            imageInput.value ='';
            
            const submitBtn = modalOverlay.querySelector('#submit-add');
            submitBtn.addEventListener('click', () =>{
                title = titleInput.value;
                description = descInput.value;
                tag = tagInput.value;

                if (title.trim() === 0 || description.trim() === 0 || 
                    tag.trim() === 0 || imageInput.files.length === 0){
                    return alert('Isi semua field tertera!');
                }

                const imageUrl = URL.createObjectURL(image);
                const cardInfo = {
                    "image" : imageUrl,
                    "tag" : tag,
                    "title" : title,
                    "description" : description,
                    "featured" : featured,
                };
                console.log(cardInfo);

                motifDataStore.push(cardInfo);
                generateMotifCards();
                closeModal();
            });
       
            closeModalButton.addEventListener('click', closeModal, {signal: addController.signal});
            modalOverlay.addEventListener('click', (event) => {
                if (event.target === modalOverlay) closeModal();
            });
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) closeModal();
            });
        }
    }

    function filterCards(selection){
        const container = document.querySelector('.content-grid');
        if (!container) return;

        let sortedData = [...motifDataStore];
        if (selection === 'aToZ'){
            sortedData.sort((a, b) => a.title.localeCompare(b.title));
            generateMotifCards(sortedData);
        } else if (selection === 'zToA'){
            sortedData.sort((a, b) => b.title.localeCompare(a.title));
            generateMotifCards(sortedData);
        } else if (selection === 'filterFeatured'){
            sortedData = sortedData.filter(motif => motif.featured);
            generateMotifCards(sortedData);
        }
    }

    generateHeroStats();
    generateMotifCards();
    generateGallery();
    generateSteps();
    generateGuide();
});