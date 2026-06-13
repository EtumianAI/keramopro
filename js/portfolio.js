document.addEventListener('DOMContentLoaded', () => {
    // 1. АВТОГЕНЕРАЦИЯ МАССИВА (200 фото: 01.webp ... 200.webp)
    const works = [];
    for (let i = 1; i <= 200; i++) {
        works.push({
            file: String(i).padStart(2, '0') + '.webp',
            title: `Реализованный проект №${i}`
        });
    }

    // 2. ЭЛЕМЕНТЫ DOM
    const grid = document.getElementById('portfolio-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const lightbox = document.getElementById('lightbox-portfolio');
    const lightboxImg = lightbox.querySelector('.lightbox-portfolio__image');
    const lightboxCounter = lightbox.querySelector('.lightbox-portfolio__counter');

    // 3. НАСТРОЙКИ
    const ITEMS_PER_PAGE = 12; // ← Можешь поменять на 9, 16 или 24
    let loadedCount = 0;
    let currentIndex = 0;

    // 4. СОЗДАНИЕ ОДНОЙ КАРТОЧКИ
    function createCard(work, globalIndex) {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.innerHTML = `
      <img src="img/portfolio/${work.file}" alt="${work.title}" loading="lazy" width="400" height="300">
      <div class="portfolio-card__overlay"><h3>${work.title}</h3></div>
    `;
        card.addEventListener('click', () => openLightbox(globalIndex));
        return card;
    }

    // 5. ЗАГРУЗКА НОВОЙ ПАКЕТКИ
    function loadMore() {
        const fragment = document.createDocumentFragment(); // Быстрая вставка без перерисовки
        const nextBatch = works.slice(loadedCount, loadedCount + ITEMS_PER_PAGE);

        nextBatch.forEach((work, i) => {
            fragment.appendChild(createCard(work, loadedCount + i));
        });

        grid.appendChild(fragment);
        loadedCount += nextBatch.length;

        // Если загрузили всё → скрываем кнопку
        if (loadedCount >= works.length) {
            loadMoreBtn.classList.add('hidden');
        }
    }

    // 6. LIGHTBOX ЛОГИКА
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxImage();
        lightbox.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.setAttribute('hidden', '');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    function updateLightboxImage() {
        const work = works[currentIndex];
        lightboxImg.src = `img/portfolio/${work.file}`;
        lightboxImg.alt = work.title;
        lightboxCounter.textContent = `${currentIndex + 1} / ${works.length}`;
    }

    // 7. ОБРАБОТЧИКИ СОБЫТИЙ
    loadMoreBtn.addEventListener('click', loadMore);

    lightbox.querySelector('.lightbox-portfolio__close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-portfolio__nav--next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % works.length;
        updateLightboxImage();
    });
    lightbox.querySelector('.lightbox-portfolio__nav--prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + works.length) % works.length;
        updateLightboxImage();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.hasAttribute('hidden')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-portfolio__nav--next').click();
        if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-portfolio__nav--prev').click();
    });

    // 8. ПЕРВИЧНАЯ ЗАГРУЗКА
    loadMore();
});