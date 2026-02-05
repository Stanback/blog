(() => {
	const t = document.querySelector('.theme-toggle');
	const h = document.documentElement;
	const s = localStorage.getItem('theme');

	// Apply saved preference, or let CSS media query handle it
	if (s) h.dataset.theme = s;

	t?.addEventListener('click', () => {
		// Detect current effective theme (from data-attr or system)
		const isDark =
			h.dataset.theme === 'dark' ||
			(h.dataset.theme !== 'light' && window.matchMedia('(prefers-color-scheme:dark)').matches);
		const n = isDark ? 'light' : 'dark';
		h.dataset.theme = n;
		localStorage.setItem('theme', n);
	});
})();
