 const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        const timeline = document.getElementById('timeline');
        
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
            body.classList.add('light-mode');
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
        });

        // Scroll animation for timeline entries
        const timelineEntries = document.querySelectorAll('.timeline-entry');
        
        const observer = new IntersectionObserver((entries) => {
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
            observer.observe(entry);
        });

        // Animate timeline line
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timeline.classList.add('animated');
                    timelineObserver.unobserve(timeline);
                }
            });
        }, {
            threshold: 0.1
        });
        
        timelineObserver.observe(timeline);

        // Add animation to decorative bubbles
        document.querySelectorAll('.bubble').forEach(bubble => {
            bubble.classList.add('floating');
        });