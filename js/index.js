document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero-banner');
    const backdrop = document.querySelector('.cyber-backdrop');

    if (!hero || !backdrop) return;

    const observer = new IntersectionObserver(([entry]) => {
        // 히어로가 화면에서 사라지면 다음 콘텐츠를 방해하지 않도록 장식을 약하게 표시한다.
        backdrop.classList.toggle('is-muted', !entry.isIntersecting);
    }, { threshold: 0.08 });

    observer.observe(hero);

    // 마우스 위치를 -1~1 범위로 변환해, 깊이가 다른 레이어에 시차를 적용한다.
    // 부드러운 보간으로 움직임이 튀지 않으며 터치 기기에서는 동작하지 않는다.
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId;

    const renderParallax = () => {
        currentX += (targetX - currentX) * 0.075;
        currentY += (targetY - currentY) * 0.075;

        backdrop.style.setProperty('--backdrop-x', `${currentX * 13}px`);
        backdrop.style.setProperty('--backdrop-y', `${currentY * 13}px`);
        hero.style.setProperty('--hero-x', `${currentX * 8}px`);
        hero.style.setProperty('--hero-y', `${currentY * 8}px`);
        hero.style.setProperty('--title-x', `${currentX * -5}px`);
        hero.style.setProperty('--title-y', `${currentY * -5}px`);
        hero.style.setProperty('--index-x', `${currentX * -10}px`);
        hero.style.setProperty('--index-y', `${currentY * -10}px`);

        if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
            frameId = requestAnimationFrame(renderParallax);
        } else {
            frameId = undefined;
        }
    };

    const updateParallax = ({ clientX, clientY }) => {
        targetX = (clientX / window.innerWidth - 0.5) * 2;
        targetY = (clientY / window.innerHeight - 0.5) * 2;
        if (!frameId) frameId = requestAnimationFrame(renderParallax);
    };

    window.addEventListener('pointermove', updateParallax, { passive: true });
    window.addEventListener('blur', () => {
        targetX = 0;
        targetY = 0;
        if (!frameId) frameId = requestAnimationFrame(renderParallax);
    });
});
