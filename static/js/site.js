(() => {
	// Mobile nav toggle - sync aria-expanded with checkbox
	const navToggle = document.getElementById('nav-toggle');
	const navLabel = document.querySelector('.nav-toggle-label');
	if (navToggle && navLabel) {
		navToggle.addEventListener('change', () => {
			navLabel.setAttribute('aria-expanded', navToggle.checked ? 'true' : 'false');
		});
	}

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
			let activeLink = null;
			let ticking = false;
			const update = () => {
				ticking = false;
				let current = headings[0];
				for (const h of headings) {
					if (h.getBoundingClientRect().top <= 100) current = h;
				}
				const link = toc.querySelector(`a[href="#${current.id}"]`);
				if (link === activeLink) return;
				activeLink?.classList.remove('toc-active');
				activeLink?.removeAttribute('aria-current');
				link?.classList.add('toc-active');
				link?.setAttribute('aria-current', 'true');
				activeLink = link;
			};
			document.addEventListener('scroll', () => {
				if (!ticking) { ticking = true; requestAnimationFrame(update); }
			}, { passive: true });
			update();
		}
	}
})();
