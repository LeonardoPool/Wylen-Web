/**
 * Google Analytics 4 (GA4) Tracker for SvelteKit
 */

declare global {
	interface Window {
		dataLayer: any[];
		gtag: (...args: any[]) => void;
	}
}

export const DEFAULT_GA_MEASUREMENT_ID = 'G-57HXS03CPJ';

let isInitialized = false;

/**
 * Gets the GA Measurement ID from environment or fallback default.
 */
export function getMeasurementId(): string {
	if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PUBLIC_GA_MEASUREMENT_ID) {
		return import.meta.env.PUBLIC_GA_MEASUREMENT_ID;
	}
	return DEFAULT_GA_MEASUREMENT_ID;
}

/**
 * Initializes the gtag.js script and sets up GA4 on the window.
 */
export function initGA(measurementId: string = getMeasurementId()): void {
	if (typeof window === 'undefined' || isInitialized) return;

	// Ensure dataLayer array exists
	window.dataLayer = window.dataLayer || [];

	// Define global gtag function if not existing
	if (!window.gtag) {
		window.gtag = function () {
			window.dataLayer.push(arguments);
		};
	}

	// Prevent duplicate script injection
	const scriptId = 'ga-gtag-script';
	if (!document.getElementById(scriptId)) {
		const script = document.createElement('script');
		script.id = scriptId;
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
		document.head.appendChild(script);
	}

	window.gtag('js', new Date());
	window.gtag('config', measurementId, {
		send_page_view: false // Handled manually on SvelteKit page changes
	});

	isInitialized = true;
	console.log(`[Analytics] Google Analytics 4 initialized with ID: ${measurementId}`);
}

/**
 * Tracks a pageview event for SPA route navigation in SvelteKit.
 */
export function trackPageView(url: string, title?: string): void {
	if (typeof window === 'undefined' || !window.gtag) return;

	const measurementId = getMeasurementId();
	window.gtag('config', measurementId, {
		page_path: url,
		page_title: title || document.title,
		page_location: window.location.href
	});

	console.log(`[Analytics] PageView tracked: ${url}`);
}

/**
 * Tracks custom interactions and events.
 */
export function trackEvent(
	eventName: string,
	params: Record<string, any> = {}
): void {
	if (typeof window === 'undefined' || !window.gtag) return;

	window.gtag('event', eventName, params);
	console.log(`[Analytics] Event tracked: ${eventName}`, params);
}
