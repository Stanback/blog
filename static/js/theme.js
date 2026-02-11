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
			const visible = new Set();
			const obs = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) visible.add(e.target);
						else visible.delete(e.target);
					});
					// Pick the last visible heading in DOM order
					let current = null;
					for (const h of headings) {
						if (visible.has(h)) current = h;
					}
					const link = current
						? toc.querySelector(`a[href="#${current.id}"]`)
						: null;
					if (link === active) return;
					if (active) active.classList.remove('toc-active');
					if (link) link.classList.add('toc-active');
					active = link;
				},
				{
					// Large positive top margin: headings above viewport stay "visible"
					// Bottom margin: match scroll-margin-top (--space-6: 24px) so the
					// activation line aligns with where headings land after a jump click
					rootMargin: `${document.documentElement.scrollHeight}px 0px ${-(window.innerHeight - 24)}px 0px`,
				},
			);
			headings.forEach((h) => obs.observe(h));
		}
	}
})();
