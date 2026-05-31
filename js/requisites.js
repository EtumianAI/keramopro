document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('[aria-controls]');
    if (!toggleButton) return;

    const modalId = toggleButton.getAttribute('aria-controls');
    const modal = document.getElementById(modalId);
    if (!modal) return;

    const modalContent = modal.querySelector('.modal__content');
    const closeButtons = modal.querySelectorAll('[data-close]');
    const copyButton = modal.querySelector('.copy-btn');

    // 1. Открытие модалки
    const openModal = () => {
        modal.hidden = false;
        // Небольшая задержка для CSS-анимации
        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
        toggleButton.setAttribute('aria-expanded', 'true');
        // Блокируем скролл страницы
        document.body.style.overflow = 'hidden';
        // Фокус на первый интерактивный элемент
        setTimeout(() => modalContent.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus(), 100);
    };

    // 2. Закрытие модалки
    const closeModal = () => {
        modal.classList.remove('active');
        toggleButton.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        // Возвращаем фокус на кнопку-триггер
        toggleButton.focus();
        // Ждём окончания анимации перед hidden
        setTimeout(() => {
            modal.hidden = true;
        }, 300);
    };

    // Слушатели
    toggleButton.addEventListener('click', openModal);
    closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

    // Закрытие по клику на оверлей
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal__overlay')) {
            closeModal();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });

    // 3. Копирование
    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            const ddElements = modal.querySelectorAll('dd');
            const textToCopy = Array.from(ddElements)
                .map(dd => dd.textContent.trim())
                .join('\n');

            try {
                await navigator.clipboard.writeText(textToCopy);
                const originalText = copyButton.textContent;
                copyButton.textContent = 'Скопировано!';
                copyButton.classList.add('copied');

                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.classList.remove('copied');
                }, 2000);
            } catch (err) {
                alert('Не удалось скопировать');
            }
        });
    }
});