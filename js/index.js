document.addEventListener('DOMContentLoaded', () => {
    const scrollTopButton = document.querySelector('.scl-top-btn');
    const heroBanner = document.querySelector('.hero-banner');

    if (scrollTopButton && heroBanner) {
        const updateScrollTopButton = () => {
            const isPastHero = heroBanner.getBoundingClientRect().bottom <= 0;
            scrollTopButton.classList.toggle('is-active', isPastHero);
            scrollTopButton.disabled = !isPastHero;
        };

        const heroObserver = new IntersectionObserver(updateScrollTopButton, {
            threshold: 0
        });
        heroObserver.observe(heroBanner);
        window.addEventListener('pageshow', updateScrollTopButton);
        updateScrollTopButton();

        scrollTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
            });
        });
    }

    const codeSets = {
        system: ['// SYSTEM : ONLINE  01.01.0101', '// CORE : STABLE  0xA11C', '// MEMORY : CLEAR  98.4%'],
        interface: ['NEON_INTERFACE / PORTFOLIO / 2024', 'DESIGN_MATRIX / CHANNEL_07', 'UI.ARCHIVE / SESSION_ACTIVE'],
        ambient: ['// RENDER_PIPELINE : INITIALIZED', '0x0F / VISUAL_NODE / STANDBY', 'GRID[12:08] :: SIGNAL DETECTED', 'MODULE.DESIGN / FRAME_READY', '// DATA_LINK : 2048kb/s', 'CORE::AESTHETIC / SYNC_100', '[ RX-07 ] CHANNEL OPEN'],
        signal: ['[ VISUAL_SIGNAL ]  00FFFC  // SYNCHRONIZED', '[ CORE_SIGNAL ]  FF50A8  // CONNECTED', '[ DATA_STREAM ]  0xCAFE  // RUNNING'],
        header: ['LINK://CORE_01 / ONLINE', 'SYNC://VISUAL_07 / READY', 'NODE://SEOUL_00 / LIVE'],
        heroTop: ['SYS.CORE_01 / VISUAL PROTOCOL', 'DESIGN.OS / LAYER ACTIVE', 'INTERFACE / SIGNAL SCAN'],
        binary: ['01001100 01001111 01000001 01000100', '11001010 00110110 10101100 01010011', '00110010 11100001 01001110 10011001'],
        coordinate: ['LAT 37.5665° / LAYER_00 / ACTIVE', 'GRID 127.0246° / NODE_07 / LINK', 'SECTOR_01 / DEPTH_03 / SCANNING'],
        pixel: ['PX / 2304', 'RGB / 00FFFC', 'BIT / 101010'],
        frame: ['FRAME 001', 'FRAME 028', 'FRAME 064'],
        node: ['SEOUL_NODE', 'CORE_NODE', 'VISUAL_NODE'],
        status: ['SYSTEM READY', 'SIGNAL LOCKED', 'LINK ESTABLISHED'],
        rightChannel: ['CHANNEL_07 // CORE LINK // 0xB17E', 'UPLINK_03 // VISUAL SYNC // OK', 'PORT_8080 // DESIGN STREAM // LIVE']
    };

    const codeTargets = [...document.querySelectorAll('.js-cycling-code')].map((element) => ({ element, group: element.dataset.codeGroup }));
    const addCodeTarget = (selector, group) => {
        const element = document.querySelector(selector);
        if (element) codeTargets.push({ element, group });
    };
    addCodeTarget('.hero-data--top', 'heroTop');
    addCodeTarget('.hero-data--left', 'binary');
    addCodeTarget('.hero-data--right', 'coordinate');
    addCodeTarget('.hero-data--bottom', 'signal');
    addCodeTarget('.hero-coordinate span:nth-child(1)', 'pixel');
    addCodeTarget('.hero-coordinate span:nth-child(2)', 'frame');
    addCodeTarget('.hero-coordinate span:nth-child(3)', 'node');
    addCodeTarget('.hero-status span', 'status');

    let codeStep = 0;
    let codeIntervalId = null;
    const typingTasks = new Map();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileLayout = window.matchMedia('(max-width: 768px), (pointer: coarse)');
    let heroVisible = true;
    const cancelTyping = (element) => {
        const task = typingTasks.get(element);
        if (!task) return;
        window.clearTimeout(task.timeoutId);
        // 중단할 때 문구를 완성해 잘린 텍스트와 커서가 남지 않게 한다.
        element.textContent = task.value;
        element.classList.remove('is-typing');
        typingTasks.delete(element);
    };
    const typeCode = (element, value, delay) => {
        cancelTyping(element);
        if (mobileLayout.matches || reducedMotion.matches) {
            element.textContent = value;
            return;
        }
        const task = { value, timeoutId: null };
        typingTasks.set(element, task);
        task.timeoutId = window.setTimeout(() => {
            if (typingTasks.get(element) !== task) return;
            let characterIndex = 0;
            element.textContent = '';
            element.classList.add('is-typing');

            const typeNextCharacter = () => {
                if (typingTasks.get(element) !== task) return;
                characterIndex += 1;
                element.textContent = value.slice(0, characterIndex);
                if (characterIndex < value.length) {
                    task.timeoutId = window.setTimeout(typeNextCharacter, 22);
                } else {
                    element.classList.remove('is-typing');
                    typingTasks.delete(element);
                }
            };

            typeNextCharacter();
        }, delay);
    };

    const updateCyclingCodes = () => {
        if (document.hidden || !document.hasFocus() || reducedMotion.matches) return;
        codeStep += 1;
        codeTargets.forEach(({ element, group }, index) => {
            if (!heroVisible && heroBanner?.contains(element)) return;
            const values = codeSets[group];
            if (!values) return;
            typeCode(element, values[(codeStep + index) % values.length], index * 85);
        });
    };
    const stopCyclingCodes = () => {
        window.clearInterval(codeIntervalId);
        codeIntervalId = null;
        for (const element of typingTasks.keys()) cancelTyping(element);
    };
    const syncCyclingCodes = () => {
        if (document.hidden || !document.hasFocus() || reducedMotion.matches) {
            stopCyclingCodes();
            return;
        }
        // focus와 visibilitychange가 연이어 발생해도 하나만 실행한다.
        if (codeIntervalId === null) {
            codeIntervalId = window.setInterval(updateCyclingCodes, 6200);
        }
    };
    document.addEventListener('visibilitychange', syncCyclingCodes);
    window.addEventListener('blur', stopCyclingCodes);
    window.addEventListener('focus', syncCyclingCodes);
    window.addEventListener('pagehide', stopCyclingCodes);
    window.addEventListener('pageshow', syncCyclingCodes);
    reducedMotion.addEventListener('change', syncCyclingCodes);
    mobileLayout.addEventListener('change', () => {
        for (const element of typingTasks.keys()) cancelTyping(element);
    });
    if (heroBanner) {
        const decorationObserver = new IntersectionObserver(([entry]) => {
            heroVisible = entry.isIntersecting;
            heroBanner.classList.toggle('is-decoration-paused', !heroVisible);
            if (!heroVisible) {
                for (const element of typingTasks.keys()) {
                    if (heroBanner.contains(element)) cancelTyping(element);
                }
            }
        }, { threshold: 0 });
        decorationObserver.observe(heroBanner);
    }
    syncCyclingCodes();

    const sections = document.querySelectorAll(
        '.l-title, .con1-profile, .con1-about-me > h2, .list-wrap, .text-contain-left, .text-contain-right, .con1-text-sub, .con1-skill-card, .con2-popup, .con2-poster, .con2-banner, .con2-product-page, .con3, .con3-shopping-mall, .con3-team-project, .btn-shortcut'
    );

    // 각 작업 블록이 화면에 들어오면 왼쪽에서 나타나고, 벗어나면 다시 왼쪽으로 사라집니다.
    const updateReveal = (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle('is-visible', entry.isIntersecting);
        });
    };
    const observer = new IntersectionObserver(updateReveal, {
        threshold: 0
    });
    // 긴 모바일 콘텐츠도 화면에 진입하면 표시하고, 완전히 벗어날 때 숨깁니다.
    const profileObserver = new IntersectionObserver(updateReveal, {
        threshold: 0
    });

    sections.forEach((section) => {
        section.classList.add('reveal-on-scroll');
        const sectionObserver = section.closest('.con1') ? profileObserver : observer;
        sectionObserver.observe(section);
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
        let hologramIntervalId = null;
        const stopHologramCode = () => {
            window.clearInterval(hologramIntervalId);
            hologramIntervalId = null;
        };
        const syncHologramCode = () => {
            if (document.hidden || !document.hasFocus() || reducedMotion.matches) {
                stopHologramCode();
            } else if (hologramIntervalId === null) {
                hologramIntervalId = window.setInterval(updateCode, 2400);
            }
        };
        reducedMotion.addEventListener('change', syncHologramCode);
        document.addEventListener('visibilitychange', syncHologramCode);
        window.addEventListener('blur', stopHologramCode);
        window.addEventListener('focus', syncHologramCode);
        window.addEventListener('pagehide', stopHologramCode);
        window.addEventListener('pageshow', syncHologramCode);
        syncHologramCode();

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
