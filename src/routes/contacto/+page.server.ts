import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { dev } from '$app/environment';

// Simple in-memory rate limiter
const submissions = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const windowMs = 5 * 60 * 1000; // 5 minutes
	const maxSubmissions = 3;

	let times = submissions.get(ip) || [];
	// Filter timestamps older than 5 minutes
	times = times.filter((t) => now - t < windowMs);

	if (times.length >= maxSubmissions) {
		return false;
	}

	times.push(now);
	submissions.set(ip, times);
	return true;
}

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		
		// 1. Honeypot check
		const honeypot = data.get('wylen_hp');
		if (honeypot && honeypot.toString().length > 0) {
			return fail(400, { error: 'spam' });
		}

		// 2. Rate limiting check
		let clientIp = '127.0.0.1';
		try {
			clientIp = event.getClientAddress();
		} catch {
			// Fail-safe default IP
		}

		if (!checkRateLimit(clientIp)) {
			return fail(429, { error: 'ratelimit' });
		}

		// 3. Extract & Validate Fields
		const nombre = data.get('nombre')?.toString().trim() || '';
		const email = data.get('email')?.toString().trim() || '';
		const empresa = data.get('empresa')?.toString().trim() || '';
		const consulta = data.get('consulta')?.toString().trim() || '';
		const mensaje = data.get('mensaje')?.toString().trim() || '';

		// Validation checks
		if (!nombre || !email || !consulta || !mensaje) {
			return fail(400, { error: 'validation', fields: { nombre, email, empresa, consulta, mensaje } });
		}

		// Email format validation (regex)
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return fail(400, { error: 'email', fields: { nombre, email, empresa, consulta, mensaje } });
		}

		// Length checks
		if (mensaje.length > 5000) {
			return fail(400, { error: 'validation', fields: { nombre, email, empresa, consulta, mensaje } });
		}

		// 4. Force error mock trigger (for developer testing)
		if (mensaje.includes('force_error')) {
			return fail(500, { error: 'server' });
		}

		// 5. Message Delivery / Resend API
		const apiKey = env.RESEND_API_KEY;

		if (!apiKey) {
			if (dev) {
				// Save locally in dev mode
				console.log('--- Dev Fallback: Private Env Key Missing ---');
				console.log('Inquiry details:', { nombre, email, empresa, consulta, mensaje });
				
				try {
					const fs = await import('fs');
					const path = await import('path');
					const dir = path.resolve('src/lib/data');
					const filePath = path.join(dir, 'inquiries.json');

					// Ensure folder exists
					if (!fs.existsSync(dir)) {
						fs.mkdirSync(dir, { recursive: true });
					}

					let currentList = [];
					if (fs.existsSync(filePath)) {
						const raw = fs.readFileSync(filePath, 'utf-8');
						currentList = JSON.parse(raw || '[]');
					}

					currentList.push({
						id: Date.now().toString(),
						nombre,
						email,
						empresa,
						consulta,
						mensaje,
						timestamp: new Date().toISOString()
					});

					fs.writeFileSync(filePath, JSON.stringify(currentList, null, 2), 'utf-8');
				} catch (err) {
					console.error('Failed to write to local inquiries database:', err);
				}

				return { success: true, fallback: true, consulta };
			} else {
				// Fail in production if API key is not configured
				return fail(500, { error: 'missing_env' });
			}
		}

		// Call Resend REST API
		try {
			const response = await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${apiKey}`
				},
				body: JSON.stringify({
					from: 'Wylen Inquiries <onboarding@resend.dev>',
					to: 'contacto@wylen.co',
					subject: `Nueva Consulta Wylen - ${consulta}`,
					html: `
						<h2>Nueva consulta recibida</h2>
						<p><strong>Nombre:</strong> ${nombre}</p>
						<p><strong>Email:</strong> ${email}</p>
						<p><strong>Empresa:</strong> ${empresa || 'No especificada'}</p>
						<p><strong>Tipo de consulta:</strong> ${consulta}</p>
						<br/>
						<p><strong>Mensaje:</strong></p>
						<p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">${mensaje}</p>
					`
				})
			});

			if (!response.ok) {
				const errorDetails = await response.text();
				console.error('Resend API call failed:', errorDetails);
				return fail(500, { error: 'server' });
			}

			return { success: true, consulta };
		} catch (error) {
			console.error('Error dispatching contact inquiry email:', error);
			return fail(500, { error: 'server' });
		}
	}
};
