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

    const codeSamples = [
        'SYS.LINK / 0xC0DE / ACTIVE',
        'VISUAL.SIGNAL // 10010011',
        'UI_LAYER : SYNCHRONIZED',
        'SCAN.DATA / NODE_204 / OK'
    ];

    document.querySelectorAll('.list-wrap').forEach((listWrap, index) => {
        const hologram = document.createElement('div');
        hologram.className = 'hologram-ui';
        hologram.setAttribute('aria-hidden', 'true');
        hologram.innerHTML = `
            <p class="hologram-ui__code hologram-ui__code--top"></p>
            <p class="hologram-ui__code hologram-ui__code--bottom"></p>
            <span class="hologram-ui__node"></span>
            <span class="hologram-ui__ring"></span>
        `;
        listWrap.append(hologram);

        const codes = hologram.querySelectorAll('.hologram-ui__code');
        const updateCode = () => {
            codes.forEach((code, codeIndex) => {
                code.textContent = codeSamples[(index + codeIndex + Math.floor(Date.now() / 2400)) % codeSamples.length];
            });
        };

        updateCode();
        window.setInterval(updateCode, 2400);

        if (!window.matchMedia('(pointer: fine)').matches) return;

        listWrap.addEventListener('pointermove', ({ clientX, clientY }) => {
            const bounds = listWrap.getBoundingClientRect();
            const x = (clientX - bounds.left) / bounds.width - 0.5;
            const y = (clientY - bounds.top) / bounds.height - 0.5;
            hologram.style.setProperty('--holo-x', `${x * 14}px`);
            hologram.style.setProperty('--holo-y', `${y * 14}px`);
        });

        listWrap.addEventListener('pointerleave', () => {
            hologram.style.setProperty('--holo-x', '0px');
            hologram.style.setProperty('--holo-y', '0px');
        });
    });
});
