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

			// Track which headings are currently in the observation band
			const visibleIds = new Set();
			const bandTop = 0.1; // 10% from top

			const obs = new IntersectionObserver(
				(entries) => {
					// Update visibility set
					for (const e of entries) {
						if (e.isIntersecting) {
							visibleIds.add(e.target.id);
						} else {
							visibleIds.delete(e.target.id);
						}
					}

					// Activate first visible heading (in document order)
					for (const h of headings) {
						if (visibleIds.has(h.id)) {
							setActive(toc.querySelector(`a[href="#${h.id}"]`));
							return;
						}
					}

					// No heading in band — find last heading above the band
					for (let i = headings.length - 1; i >= 0; i--) {
						const rect = headings[i].getBoundingClientRect();
						if (rect.top < window.innerHeight * bandTop) {
							setActive(toc.querySelector(`a[href="#${headings[i].id}"]`));
							return;
						}
					}

					setActive(null);
				},
				{ rootMargin: '-10% 0px -80% 0px' },
			);
			headings.forEach((h) => obs.observe(h));
		}
	}
})();
