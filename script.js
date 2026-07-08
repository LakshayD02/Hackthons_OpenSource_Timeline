window.addEventListener("load", () => {

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const timeline = document.getElementById('timeline');

    // Theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        localStorage.setItem(
            'theme',
            body.classList.contains('light-mode') ? 'light' : 'dark'
        );
    });

    // Timeline Cards Animation
    const timelineEntries = document.querySelectorAll('.timeline-entry');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineEntries.forEach(entry => {
        cardObserver.observe(entry);
    });

    // Timeline Line Animation
    const lineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                timeline.classList.add('animated');
                lineObserver.disconnect();
            }
        });
    }, {
        threshold: 0,
        rootMargin: '-150px 0px'
    });

    lineObserver.observe(timeline);

    // Fallback (ensures line always appears)
    setTimeout(() => {
        timeline.classList.add('animated');
    }, 1000);

    // Recalculate after resize
    window.addEventListener('resize', () => {
        timeline.classList.remove('animated');

        requestAnimationFrame(() => {
            timeline.classList.add('animated');
        });
    });

    // Floating bubbles
    document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.classList.add('floating');
    });

});
