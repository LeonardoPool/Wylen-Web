/**
 * Home Page State & Logic Controller (Svelte 5 Runes)
 */
export class HomeState {
	isMobileMenuOpen = $state(false);
	activeModal = $state<string | null>(null);
	isPlayingVideo = $state(false);

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
