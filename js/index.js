document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll(
        '.con1-profile, .con-about-me-wrap, .con1-about-me, .con1-text-main, .text-contain-right, .con1-card-wrap, .con1-skill-card, .con2-popup, .con2-poster, .con2-banner, .con2-product-page'
    );

    // 각 작업 블록이 화면에 들어오면 왼쪽에서 나타나고, 벗어나면 다시 왼쪽으로 사라집니다.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
    }, {
        threshold: 0.12
    });

    sections.forEach((section) => {
        section.classList.add('reveal-on-scroll');
        observer.observe(section);
    });
});
