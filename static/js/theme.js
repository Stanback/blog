(() => {
	// Theme toggle
	const t = document.querySelector('.theme-toggle');
	const h = document.documentElement;
	const s = localStorage.getItem('theme');

	if (s) h.dataset.theme = s;

	// Set initial aria-pressed state
	const updateAriaPressed = () => {
		const isDark =
			h.dataset.theme === 'dark' ||
			(h.dataset.theme !== 'light' && window.matchMedia('(prefers-color-scheme:dark)').matches);
		t?.setAttribute('aria-pressed', isDark ? 'true' : 'false');
	};
	updateAriaPressed();

	t?.addEventListener('click', () => {
		const isDark =
			h.dataset.theme === 'dark' ||
			(h.dataset.theme !== 'light' && window.matchMedia('(prefers-color-scheme:dark)').matches);
		const n = isDark ? 'light' : 'dark';
		h.dataset.theme = n;
		localStorage.setItem('theme', n);
		t.setAttribute('aria-pressed', n === 'dark' ? 'true' : 'false');
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
				active?.classList.remove('toc-active');
				link?.classList.add('toc-active');
				active = link;
			};

			const update = () => {
				// Find last heading above the 20% line
				let current = null;
				for (const h of headings) {
					if (h.getBoundingClientRect().top < window.innerHeight * 0.2) current = h;
				}
				setActive(current ? toc.querySelector(`a[href="#${current.id}"]`) : null);
			};

			const obs = new IntersectionObserver(update, { rootMargin: '-10% 0px -80% 0px' });
			headings.forEach((h) => obs.observe(h));
		}
	}
})();
