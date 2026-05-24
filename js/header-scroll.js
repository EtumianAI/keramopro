document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    if (!header) return;

    //  ПРОВЕРКА: запускаем логику только на экранах уже 768px
    if (window.innerWidth < 768) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        const threshold = 10;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;

            if (delta < -threshold || currentScrollY < 10) {
                header.classList.remove('is-hidden');
                header.classList.add('is-visible');
            } else if (delta > threshold && currentScrollY > 50) {
                header.classList.remove('is-visible');
                header.classList.add('is-hidden');
            }

            if (currentScrollY > 10) {
                header.classList.add('is-sticky');
            } else {
                header.classList.remove('is-sticky');
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        // Подключаем скролл-слушатель только для мобильных
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });

        // Запускаем расчёт при загрузке
        updateHeader();
    }
    // Перепроверяем ширину при изменении размера окна
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            // На десктопе возвращаем шапку в исходное состояние
            header.classList.remove('is-hidden', 'is-visible', 'is-sticky');
        }
    });
});