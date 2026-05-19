// Инициализация и поиск элементов
document.addEventListener('DOMContentLoaded', () => {
    // Что делает: Находит все кнопки с классом .collapsible-toggle на странице и сохраняет их в список (NodeList).
    // Зачем: Позволяет иметь несколько независимых сворачиваемых секций на одной странице.
    const toggles = document.querySelectorAll('.collapsible-toggle');
    console.log(`Найдено кнопок: ${toggles.length}`);
    // Что делает: Запускает цикл, который по очереди берёт каждую найденную кнопку (toggle) и применяет к ней логику.
    toggles.forEach(toggle => {

        //  Связка кнопки с её контентом

        // Что делает: Читает из кнопки атрибут aria-controls (в HTML там написано id блока, например "section-details").
        // Зачем: Это мост между кнопкой и контентом. Также критично для скринридеров (доступность).
        const contentId = toggle.getAttribute('aria-controls');

        // Что делает: Находит в DOM сам блок с контентом по полученному id.
        const content = document.getElementById(contentId);

        // Что делает: Находит внутри кнопки <span>, в котором хранится текст ("Показать полностью" / "Свернуть").
        // Зачем: Чтобы потом менять только текст, не перезаписывая всю кнопку и не ломая иконку.
        const textSpan = toggle.querySelector('.toggle-text');

        // Что делает: Проверка безопасности. Если блок с контентом не найден (например, опечатка в id), скрипт пропускает эту кнопку и не падает с ошибкой.
        if (!content) return;
        console.warn(`⚠️ Контент с id="${contentId}" не найден`);
        // Обработка клика и управление состоянием

        // Что делает: "Слушает" клик по кнопке. При клике запускает функцию внутри.
        toggle.addEventListener('click', () => {
            console.log('🖱 Клик по кнопке! Текущее состояние:', toggle.getAttribute('aria-expanded'));
            // Что делает: Считывает текущее состояние кнопки. Если в атрибуте написано "true" → секция развёрнута. Если "false" или нет атрибута → свёрнута.
            // Зачем: Это наш "переключатель".Мы не храним состояние в отдельной переменной, а читаем его прямо из HTML(принцип single source of truth).
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Что делает: Меняет атрибут на противоположный (true → false и наоборот).
            // Зачем:
            // CSS использует этот атрибут для поворота стрелки: [aria-expanded="true"] .toggle-icon { transform: rotate(180deg); }
            // Скринридеры announce пользователю: "Кнопка, развёрнуто" / "Кнопка, свёрнуто".
            toggle.setAttribute('aria-expanded', !isExpanded);

            // Логика сворачивания (если было открыто)

            // Что делает: Ветвление. Если секция была развёрнута → выполняем код закрытия.
            if (isExpanded) {
                // Сворачиваем

                // Что делает: Задаёт элементу точную текущую высоту в пикселях (например, 842px).
                // Зачем (ключевой момент): CSS не умеет анимировать переход от max-height: none к конкретному числу. Чтобы анимация сработала, нужно сначала зафиксировать текущую высоту, а потом плавно уменьшить её.
                content.style.maxHeight = content.scrollHeight + 'px';

                // Форсируем перерисовку для плавности

                // Что делает: Принудительный пересчёт макета (Reflow). Браузер мгновенно применяет предыдущую строку и "запоминает" начальную точку анимации.
                // Зачем(магия): Без этой строки браузер оптимизирует код и применит оба изменения стиля одновременно, пропустив анимацию.Эта строка заставляет его сделать паузу на 1 кадр.
                content.offsetHeight;
                content.style.maxHeight = '120px';
                content.classList.remove('is-expanded');

                setTimeout(() => {
                    toggle.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 450); // 450ms = чуть больше, чем transition 0.4s в CSS

            } else {
                // Разворачиваем
                content.classList.add('is-expanded');
                content.style.maxHeight = content.scrollHeight + 'px';

                setTimeout(() => {
                    toggle.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 300);
            }

            textSpan.textContent = isExpanded ? 'Показать полностью' : 'Свернуть';
        });
    });
});