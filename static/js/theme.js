(() => {
	// Theme toggle
	const t = document.querySelector('.theme-toggle');
	const h = document.documentElement;
	const s = localStorage.getItem('theme');

	if (s) h.dataset.theme = s;

	t?.addEventListener('click', () => {
		const isDark =
			h.dataset.theme === 'dark' ||
			(h.dataset.theme !== 'light' && window.matchMedia('(prefers-color-scheme:dark)').matches);
		const n = isDark ? 'light' : 'dark';
		h.dataset.theme = n;
		localStorage.setItem('theme', n);
	});

	// TOC scroll tracking
	const toc = document.querySelector('.toc-sidebar');
	if (toc) {
		const links = toc.querySelectorAll('.toc-link');
		const ids = [...links].map((l) => l.getAttribute('href').slice(1));
		const headings = ids.map((id) => document.getElementById(id)).filter(Boolean);

		if (headings.length) {
			let active = null;
			const setActive = (link) => {
				if (link === active) return;
				if (active) active.classList.remove('toc-active');
				link?.classList.add('toc-active');
				active = link;
			};
			const obs = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							setActive(toc.querySelector(`a[href="#${e.target.id}"]`));
						} else {
							// Heading left the detection band — check if it exited
							// downward (user scrolled up). The band top is at 10% of
							// viewport, so if the heading is below that, activate previous.
							const bandTop = window.innerHeight * 0.1;
							if (e.boundingClientRect.top >= bandTop) {
								const idx = headings.indexOf(e.target);
								if (idx > 0) {
									setActive(toc.querySelector(`a[href="#${headings[idx - 1].id}"]`));
								} else {
									setActive(null);
								}
							}
						}
					});
				},
				{ rootMargin: '-10% 0px -80% 0px' },
			);
			headings.forEach((h) => obs.observe(h));
		}
	}
})();
