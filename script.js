import {STATS_DATA, GALLERY_DATA, STEPS_DATA, GUIDE_DATA} from './constants.js';

window.onload = function() {
    const loadingScreen = document.getElementById('loading-screen');
    if(loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
    document.addEventListener('DOMContentLoaded', () => {
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const statsData = STATS_DATA;
    const galleryData = GALLERY_DATA;
    const stepsData = STEPS_DATA;
    const guideData = GUIDE_DATA; 

    let removeController;
    let popUpController;
    let addController;
    let bookmarkController;
    let page = 1;
    let limitLength;

    let motifDataArr = [];
    let bookmarkArr = [];

    async function initMotifData() {
        if (localStorage.getItem('motifLocalStorage') === null){
            localStorage.setItem('motifLocalStorage', []);
            motifDataArr = await getMotifData(); 
            localStorage.setItem('motifLocalStorage', JSON.stringify(motifDataArr));
        } else{
            motifDataArr = JSON.parse(localStorage.getItem('motifLocalStorage'));
        }
    }

    initMotifData().then(() => {
        initBookmark();
        generateMotifCards();
    });

    async function initBookmark(){
        if (localStorage.getItem('bookmarkLocalStorage') === null){
            localStorage.setItem('bookmarkLocalStorage', JSON.stringify(bookmarkArr));
        } else{
            bookmarkArr = JSON.parse(localStorage.getItem('bookmarkLocalStorage'));
        }
    }

    async function getMotifData(){ 
        try {
            const res = await fetch('motif-data.json', {method: 'GET'});
            return await res.json(); 
        } catch (error) {
            console.error(error.message);
            return []; 
        }
    }

    let currCardId = 0;
    async function generateMotifCards(motifDataOverride = null) {
        const motifData = motifDataOverride || motifDataArr; 
        const container = document.querySelector('.content-grid');
        currCardId = motifDataArr.length > 0 ? Math.max(...motifDataArr.map(motif => motif.id)) + 1 : 1;
        if (!container) return;
        let html = '';
        const limit = motifData.slice(0, 6 * page);
        limitLength = limit.length;
        console.log('limit di generate', limitLength);
        console.log('halaman', page);
        limit.forEach(motif => {
            const featuredClass = motif.featured ? 'featured-card' : '';
            html += `
                <article id="${motif.id}" class="content-card ${featuredClass}">
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

        toggleLoadMoreDisplay();
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

    function generateBookmarkList(){
        const container = document.querySelector('#bookmark-list-container');
        if (!container) return;
        let html = '';

        if (bookmarkArr.length === 0){ 
            html = '<p>List bookmark Anda kosong!</p>';
        }
        else{
            const bookmarkList = motifDataArr.filter(list => bookmarkArr.includes(list.id));
            console.log(bookmarkList);
            bookmarkList.forEach(list => {
                html += `
                <div class="bookmark-list-wrapper" id="book-${list.id}">
                    <article class="bookmark-list" >
                        <img src="${list.image}" alt="${list.title}">
                        <button class="delete-bookmark-button">
                            <span><i class="fas fa-trash"></i></span>
                        </button>
                        <div class="bookmark-list-body">
                            <h3>${list.title}</h3>
                            <p>${list.description}</p>
                        </div>
                    </article>
                </div>
                `
            });
        }

        container.innerHTML = html;
    }

    let deleteToggle = false;
    const delButton = document.getElementById('delete');
    delButton.addEventListener('click', () =>{
        deleteToggle = !deleteToggle;
        loadCardEventListener();
    })

    const addButton = document.getElementById('add');
    addButton.addEventListener('click', () =>{
        addCard();
    })

    const bookmarkListButton = document.getElementById('bookmark');
    bookmarkListButton.addEventListener('click', ()=>{
        loadBookmark();
    })

    const filterSelection = document.getElementById('filter');
    filterSelection.addEventListener('change', () =>{
        filterCards(filterSelection.value);
    })

    const clearData = document.getElementById('clear-data');
    clearData.addEventListener('click', () =>{
        clearDataPopUp();
    })

    const searchBox = document.getElementById('motif-search');
    searchBox.addEventListener('input', (e) =>{
        console.log(e.target.value);
        searchTitle(e.target.value);
    })

    const loadMoreButton = document.getElementById('load-more-button');
    loadMoreButton.addEventListener('click', ()=>{
        page++;
        generateMotifCards();
        toggleLoadMoreDisplay();
    })

    function toggleLoadMoreDisplay(){
        const text = document.getElementById('unggulan-bottom-page-notif');
        const limit = page * 6;
        console.log(limitLength);
        console.log(limit);
        if (limit > limitLength){
            loadMoreButton.style.display = 'none';
            text.style.display = 'flex';
        } else{
            loadMoreButton.style.display = 'flex';
            text.style.display = 'none';
        }
    }

    function searchTitle(value){
        const found = motifDataArr.filter((motif) => 
            motif.title.toUpperCase().includes(value.toUpperCase()));
        generateMotifCards(found);
    }

    function loadCardEventListener(){
        console.log('ID sekarang', currCardId);
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
            deleteCard();
        }
    }

    function clearDataPopUp(){
        const confirmClear = document.getElementById('confirm-clear-local-storage-modal');
        const closeModalButton = confirmClear.querySelector('.modal-close');
        if (!confirmClear) return;
        confirmClear.classList.remove('hidden');

        const confirmButton = confirmClear.querySelector('#confirm-clear-local-storage');;
        confirmButton.addEventListener('click', () => {
            localStorage.clear();
            window.location.reload();
        })

        const closeModal = () =>{
            confirmClear.classList.add('hidden');
        }   
   
        const cancelButton = confirmClear.querySelector('#cancel-clear-local-storage');
        cancelButton.addEventListener('click', () =>{
            closeModal();
        })

        closeModalButton.addEventListener('click', closeModal);
        confirmClear.addEventListener('click', (event) => {
            if (event.target === confirmClear && !confirmClear.classList.contains('hidden')) closeModal();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !confirmClear.classList.contains('hidden')) closeModal();
        });
    }

    function cardPopup(idFromBookmark = null){
        if (popUpController) popUpController.abort();
        popUpController = new AbortController();
        const allMotifCards = document.querySelectorAll('.content-card');
        const modalOverlay = document.getElementById('motif-modal');
        const closeModalButton = modalOverlay.querySelector('.modal-close');
        const bookmarkButton = document.getElementById('bookmark-button');
        const bookmarkSpan = document.getElementById('bookmark-button-span'); 
        if(!modalOverlay) return;

        const modalImage = document.getElementById('modal-img');
        const modalTag = document.getElementById('modal-tag');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        let cardId;

        const openModal = (card) => {
            cardId = Number(card.id); 
            if(idFromBookmark !== null){
                bookmarkSpan.style.display = 'none';
            } else{
                bookmarkSpan.style.display = 'inline-block';
            }

            bookmarkButton.style.color = isBookmarked(cardId) ? 'yellow' : '#fefefedd';
            
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

        if (idFromBookmark !== null) {
            const targetCard = document.getElementById(idFromBookmark);
            console.log(targetCard);
            if (targetCard) openModal(targetCard);
        } 

        bookmarkButton.addEventListener('click', () => {                
            if (isBookmarked(cardId)){
                removeBookmark(cardId);
                bookmarkButton.style.color = '#fefefedd';
                console.log('setelah hapus', bookmarkArr);
            } else{
                addToBookmark(cardId);
                bookmarkButton.style.color = 'yellow';
                console.log('setelah tambah', bookmarkArr);
            }
        }, {signal: popUpController.signal}); 

        const closeModal = () => {
            idFromBookmark = null;
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

    function isBookmarked(cardId){
        const id = Number(cardId);
        if (Number.isNaN(id)) return false;
        const res = bookmarkArr.includes(id);
        return res;
    }

    function addToBookmark(cardId){
        const id = Number(cardId);
        if (Number.isNaN(id)) return;
        if(!bookmarkArr.includes(id)){
            bookmarkArr.push(cardId);
        } 
        localStorage.setItem('bookmarkLocalStorage', JSON.stringify(bookmarkArr));
    }

    function removeBookmark(cardId){
        const id = Number(cardId);
        if (Number.isNaN(id)) return;
        const deletedIndex = bookmarkArr.indexOf(id);
        if (deletedIndex === -1) return;
        bookmarkArr.splice(deletedIndex, 1);
        localStorage.setItem('bookmarkLocalStorage', JSON.stringify(bookmarkArr));
    }

    function loadBookmark(){
        if (bookmarkController) bookmarkController.abort();
        bookmarkController = new AbortController();
        const modalOverlay = document.getElementById('bookmark-container');
        const closeModalButton = modalOverlay.querySelector('.modal-close');
        if (!modalOverlay) return;
       
        modalOverlay.classList.remove('hidden');

        generateBookmarkList();

        const closeModal = () => {
            modalOverlay.classList.add('hidden');
        };

        const bookmarkContainer = document.getElementById('bookmark-list-container');

        if (bookmarkContainer) {
            bookmarkContainer.addEventListener('click', (e) => {
                const deleteButton = e.target.closest('.delete-bookmark-button');
                if (deleteButton) {
                    const wrapper = deleteButton.closest('.bookmark-list-wrapper');
                    const cardId = parseInt(wrapper.id.replace('book-', ''));
                    
                    removeBookmark(cardId);
                    generateBookmarkList();
                    return;
                }

                const title = e.target.closest('.bookmark-list-body h3');
                if (title) {
                    const wrapper = title.closest('.bookmark-list-wrapper');
                    const cardId = parseInt(wrapper.id.replace('book-', ''));
                    cardPopup(cardId);
                }
            }, { signal: bookmarkController.signal });
        }

        const clearAll = document.getElementById('clear-bookmark');
        clearAll.addEventListener('click', ()=>{
            bookmarkArr = [];
            localStorage.setItem('bookmarkLocalStorage', []);
            generateBookmarkList();
        })

        closeModalButton.addEventListener('click', closeModal, { signal: bookmarkController.signal });
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) closeModal();
        });
        
    }

    function deleteCard(){
        if (removeController) removeController.abort();
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
                const toDeletedId = Number(toDeleted.id)
                removeBookmark(toDeletedId);
                const deletedIndex = motifDataArr.findIndex(motif => motif.id === toDeletedId);
                motifDataArr.splice(deletedIndex, 1);
                localStorage.setItem('motifLocalStorage', JSON.stringify(motifDataArr));
                generateMotifCards(motifDataArr);
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

    function addCard(){
        let image;
        let title;
        let tag;
        let description;
        let isFeatured = false;
        if (addController) addController.abort();
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

            featuredRadio.addEventListener('change', () => isFeatured = true, {signal: addController.signal});
            notFeaturedRadio.addEventListener('change', () => isFeatured = false, {signal: addController.signal});

            imageInput.addEventListener('change', () =>{
                if(imageInput.files.length === 1) image = imageInput.files[0];
            });
            
            const submitBtn = modalOverlay.querySelector('#submit-add');
            submitBtn.addEventListener('click', () =>{
                title = titleInput.value;
                description = descInput.value;
                tag = tagInput.value;

                if (title.trim() === 0 || description.trim() === 0 || 
                    tag.trim() === 0 || imageInput.files.length === 0){
                    return alert('Isi semua field tertera!');
                }

                const id = currCardId;
                if(addCardHelper(id, image, title, tag, description, isFeatured)) closeModal();
                else alert('Semua field wajib diisi!');
            }, { signal: addController.signal });
       
            closeModalButton.addEventListener('click', closeModal, {signal: addController.signal});
            modalOverlay.addEventListener('click', (event) => {
                if (event.target === modalOverlay) closeModal();
            });
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && !modalOverlay.classList.contains('hidden')) closeModal();
            });
        }
    }

    function addCardHelper(id, image, title, tag, description, isFeatured){
        if(!image) return false;
        const reader = new FileReader();
        if (image){
            // https://stackoverflow.com/questions/19183180/how-to-save-an-image-to-localstorage-and-display-it-on-the-next-page
            reader.onload = (e) => {
                const imageUrl = e.target.result;
                const cardInfo = {
                    "id": id,
                    "image" : imageUrl,
                    "tag" : tag,
                    "title" : title,
                    "description" : description,
                    "featured" : isFeatured,
                };
                console.log(cardInfo);

                motifDataArr.push(cardInfo);
                localStorage.setItem('motifLocalStorage', JSON.stringify(motifDataArr));
                generateMotifCards(motifDataArr);
            }
            reader.readAsDataURL(image);
            currCardId++;
        }
        return true;
    }

    function filterCards(selection){
        const container = document.querySelector('.content-grid');
        if (!container) return;

        let sortedData = [...motifDataArr];
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