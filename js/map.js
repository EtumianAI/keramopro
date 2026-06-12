// Загружаем карту только когда пользователь доскроллил до неё
const mapContainer = document.getElementById('yandex-map');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Загружаем скрипт Яндекс Карт
            const script = document.createElement('script');
            script.src = 'https://api-maps.yandex.ru/2.1/?apikey=YOUR_KEY&lang=ru_RU';
            script.onload = () => ymaps.ready(initMap);
            document.body.appendChild(script);
            observer.disconnect();
        }
    });
});

observer.observe(mapContainer);