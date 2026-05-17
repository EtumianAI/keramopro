document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav');

  // Если элементы не найдены → выходим и пишем в консоль
  if (!burger || !nav) {
    console.warn('Бургер или меню не найдены в DOM. Проверь HTML.');
    return;
  }

  const toggleMenu = () => {
    const isOpen = nav.classList.toggle('active');
    burger.classList.toggle('active');
    burger.setAttribute('aria-expanded', isOpen);
    console.log('Меню:', isOpen ? 'ОТКРЫТО' : 'ЗАКРЫТО');
  };

  burger.addEventListener('click', toggleMenu);

  // Закрытие при клике на ссылку
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) toggleMenu();
    });
  });

  // Закрытие по клику вне меню
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('active') && !nav.contains(e.target) && !burger.contains(e.target)) {
      toggleMenu();
    }
  });
});