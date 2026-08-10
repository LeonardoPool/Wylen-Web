import { translations } from './translations';

/**
 * Home Page State & Logic Controller (Svelte 5 Runes)
 */
export class HomeState {
	isMobileMenuOpen = $state(false);
	activeModal = $state<string | null>(null);
	isPlayingVideo = $state(false);
	currentLanguage = $state<'es' | 'en'>('es');

	constructor() {
		// Constructor is kept light. Language auto-detection runs in initLanguage.
	}

	initLanguage = () => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('wylen-lang');
			if (saved === 'es' || saved === 'en') {
				this.currentLanguage = saved;
			} else {
				const browserLang = navigator.language;
				if (browserLang && browserLang.startsWith('en')) {
					this.currentLanguage = 'en';
				}
			}
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
	};

	closeMobileMenu = () => {
		this.isMobileMenuOpen = false;
	};
}

