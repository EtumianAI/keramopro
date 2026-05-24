document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.scroll-up-button');
    if (!btn) return;
    const btnShowed = 400;

    const isVisible = () => {
        if (window.scrollY > btnShowed) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    const scrollUp = () => {
        window.scrollTo(0, 0)
    }

    window.addEventListener('scroll', isVisible, { passive: true });
    btn.addEventListener('click', scrollUp)

    toggleVisibility();
})