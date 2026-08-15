import { translations } from './translations';

/**
 * Home Page State & Logic Controller (Svelte 5 Runes)
 */

/** Spanish-speaking country codes (ISO 3166-1 alpha-2) */
const SPANISH_COUNTRIES = new Set([
	'MX', 'ES', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU',
	'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'PR', 'GQ'
]);

export class HomeState {
	isMobileMenuOpen = $state(false);
	activeModal = $state<string | null>(null);
	isPlayingVideo = $state(false);
	currentLanguage = $state<'es' | 'en'>('es');
	activeDropdown = $state<string | null>(null);

	constructor() {
		// Constructor is kept light. Language auto-detection runs in initLanguage.
	}

	initLanguage = async () => {
		if (typeof window === 'undefined') return;

		// Priority 1: Saved user preference
		const saved = localStorage.getItem('wylen-lang');
		if (saved === 'es' || saved === 'en') {
			this.currentLanguage = saved;
			return;
		}

		// Priority 2: IP-based geolocation
		try {
			const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(3000) });
			if (res.ok) {
				const data = await res.json();
				const countryCode = (data.country_code || '').toUpperCase();
				if (countryCode) {
					this.currentLanguage = SPANISH_COUNTRIES.has(countryCode) ? 'es' : 'en';
					localStorage.setItem('wylen-lang', this.currentLanguage);
					return;
				}
			}
		} catch {
			// Geolocation failed — fall through to browser language
		}

		// Priority 3: Browser language fallback
		const browserLang = navigator.language;
		if (browserLang && browserLang.startsWith('en')) {
			this.currentLanguage = 'en';
		}
	};

	setLanguage = (lang: 'es' | 'en') => {
		this.currentLanguage = lang;
		if (typeof window !== 'undefined') {
			localStorage.setItem('wylen-lang', lang);
		}
	};

	t = (key: string): string => {
		const langDict = translations[this.currentLanguage] || translations['es'];
		let translated = langDict[key as keyof typeof langDict] || key;
		if (translated.includes('{year}')) {
			translated = translated.replace('{year}', new Date().getFullYear().toString());
		}
		return translated;
	};

	openModal = (modalName: string) => {
		this.activeModal = modalName;
	};

	closeModal = () => {
		this.activeModal = null;
	};

	toggleVideo = () => {
		this.isPlayingVideo = !this.isPlayingVideo;
	};

	toggleMobileMenu = () => {
		this.isMobileMenuOpen = !this.isMobileMenuOpen;
		// Close any open dropdown when toggling mobile menu
		this.activeDropdown = null;
	};

	closeMobileMenu = () => {
		this.isMobileMenuOpen = false;
		this.activeDropdown = null;
	};

	openDropdown = (name: string) => {
		this.activeDropdown = name;
	};

	closeDropdown = () => {
		this.activeDropdown = null;
	};

	toggleDropdown = (name: string) => {
		this.activeDropdown = this.activeDropdown === name ? null : name;
	};
}


