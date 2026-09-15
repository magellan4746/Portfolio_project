document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero-banner');
    const backdrop = document.querySelector('.cyber-backdrop');

    if (!hero || !backdrop) return;

    const observer = new IntersectionObserver(([entry]) => {
        // 히어로가 화면에서 사라지면 다음 콘텐츠를 방해하지 않도록 장식을 약하게 표시한다.
        backdrop.classList.toggle('is-muted', !entry.isIntersecting);
    }, { threshold: 0.08 });

    observer.observe(hero);
});
