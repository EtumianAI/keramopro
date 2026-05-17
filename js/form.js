// Валидация формы перед отправкой
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    const phone = form.querySelector('[name="phone"]');
    const name = form.querySelector('[name="name"]');
    
    // Простая валидация телефона (российский формат)
    const phonePattern = /^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
    
    if (!phonePattern.test(phone.value.replace(/\s/g, ''))) {
      e.preventDefault();
      phone.style.borderColor = 'red';
      alert('Пожалуйста, введите телефон в формате: +7 (999) 123-45-67');
      return;
    }
    
    if (name.value.trim().length < 2) {
      e.preventDefault();
      name.style.borderColor = 'red';
      alert('Пожалуйста, введите ваше имя');
      return;
    }
    
    // Если всё ок — форма отправится сама
    // После успешной отправки можно показать сообщение
    form.addEventListener('submit', () => {
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.textContent = 'Отправка...';
      submitBtn.disabled = true;
    }, { once: true });
  });
  
  // Убираем красную рамку при вводе
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });
});