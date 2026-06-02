document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  if (!form) return;

  const statusDiv = form.querySelector('.form-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;

  // === МАСКА ТЕЛЕФОНА (оставляем как было) ===
  const phoneInput = form.querySelector('[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = formatPhone(e.target.value);
      clearError(e.target); // Убираем ошибку при вводе
    });
    phoneInput.addEventListener('focus', () => { if (!phoneInput.value) phoneInput.value = '+7 ('; });
    phoneInput.addEventListener('blur', () => { if (phoneInput.value === '+7 (' || phoneInput.value === '+7') phoneInput.value = ''; });
  }

  function formatPhone(value) {
    let digits = value.replace(/[^\d+]/g, '');
    if (digits.startsWith('8')) digits = '+7' + digits.slice(1);
    else if (digits.startsWith('7') && !digits.startsWith('+')) digits = '+' + digits;
    else if (!digits.startsWith('+7')) digits = '+7' + digits.replace(/^\+/, '');
    const numbers = digits.replace(/\+/g, '').slice(1);
    let result = '+7 (';
    if (numbers.length > 0) result += numbers.slice(0, 3);
    if (numbers.length >= 3) result += ') ';
    if (numbers.length > 3) result += numbers.slice(3, 6);
    if (numbers.length > 6) result += '-' + numbers.slice(6, 8);
    if (numbers.length > 8) result += '-' + numbers.slice(8, 10);
    return result;
  }

  // === ОТПРАВКА ФОРМЫ ЧЕРЕZ FORMSPREE ===
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Останавливаем стандартную перезагрузку страницы

    const phone = form.querySelector('[name="phone"]');
    const name = form.querySelector('[name="name"]');

    // 1. Валидация
    if (phone.value.replace(/\D/g, '').length !== 11) {
      showError(phone, 'Введите полный номер телефона (11 цифр)');
      return;
    }
    if (name.value.trim().length < 2) {
      showError(name, 'Введите ваше имя (минимум 2 символа)');
      return;
    }

    // 2. Подготовка к отправке
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    statusDiv.innerHTML = ''; // Очищаем старые сообщения

    try {
      // 3. Отправка данных
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' } // Важно! Чтобы Formspree вернул JSON, а не делал редирект
      });

      // 4. Обработка ответа
      if (response.ok) {
        showSuccess('✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
        form.reset(); // Очистить форму
        phoneInput.value = ''; // Сбросить маску
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Ошибка сервера');
      }
    } catch (error) {
      showError(submitBtn, '❌ Не удалось отправить. Попробуйте позже или позвоните нам.');
      console.error('Formspree error:', error);
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });

  // === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
  function showError(element, message) {
    element.style.borderColor = '#ef4444'; // Красный
    statusDiv.innerHTML = `<p style="color: #ef4444; margin-top: 1rem; font-size: 0.9rem;">${message}</p>`;
    element.focus();
  }

  function clearError(element) {
    element.style.borderColor = '';
  }

  function showSuccess(message) {
    statusDiv.innerHTML = `<p style="color: #22c55e; margin-top: 1rem; font-weight: 500;">${message}</p>`;
    submitBtn.textContent = 'Отправлено!';
    setTimeout(() => {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
      statusDiv.innerHTML = '';
    }, 5000);
  }
});