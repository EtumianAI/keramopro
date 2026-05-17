// Лайтбокс для галереи
document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = document.querySelectorAll('.gallery__img');
  let lightbox = null;
  let escHandler = null;

  const openLightbox = (img) => {
    if (lightbox) return;

    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Просмотр изображения');
    
    const fullImg = document.createElement('img');
    fullImg.src = img.dataset.full || img.src;
    fullImg.alt = img.alt;
    fullImg.loading = 'eager';
    
    // ← ДОБАВИТЬ: закрытие по клику на фото
    fullImg.addEventListener('click', closeLightbox);
    
    lightbox.appendChild(fullImg);
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';

    // Закрытие по клику на фон
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Закрытие по Escape
    escHandler = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    document.addEventListener('keydown', escHandler);
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    
    document.body.style.overflow = '';
    
    if (escHandler) {
      document.removeEventListener('keydown', escHandler);
      escHandler = null;
    }
    
    lightbox.remove();
    lightbox = null;
  };
  
  galleryImages.forEach(img => {
    img.addEventListener('click', () => openLightbox(img));
    img.style.cursor = 'pointer';
  });
});