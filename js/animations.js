// Появление элементов при прокрутке
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Анимируем только один раз
      }
    });
  }, { 
    threshold: 0.1, // Срабатывает, когда 10% элемента видно
    rootMargin: '0px 0px -50px 0px'
  });

  // Находим все элементы с data-animate
  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
});

// document.addEventListener('DOMContentLoaded', () => {
//   const observerOptions = {
//     threshold: 0.1,        // Срабатывает, когда 10% элемента видно
//     rootMargin: '0px 0px -50px 0px' // Отступ от низа экрана
//   };

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('animate');
//         // Если нужно анимировать только один раз:
//         observer.unobserve(entry.target);
//       }
//     });
//   }, observerOptions);

//   // Находим все элементы для анимации
//   document.querySelectorAll('.animate-on-scroll').forEach(el => {
//     observer.observe(el);
//   });
// });