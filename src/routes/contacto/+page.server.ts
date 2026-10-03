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

		const INQUIRY_LABELS: Record<string, string> = {
			software: 'Desarrollo de Software',
			products: 'Productos Digitales',
			consulting: 'Consultoría Técnica',
			automation: 'Automatización',
			integrations: 'Integraciones',
			other: 'Otro'
		};

		const escapeHtml = (text: string) =>
			text
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;')
				.replace(/'/g, '&#039;');

		const inquiryLabel = INQUIRY_LABELS[consulta] || consulta;
		const fromEmail = env.RESEND_FROM_EMAIL || 'Wylen <contacto@wylen.com.mx>';
		const toEmail = env.CONTACT_EMAIL_TO || 'contacto@wylen.com.mx';

		// 1. Plantilla para el equipo interno de Wylen
		const internalEmailHtml = `
			<!DOCTYPE html>
			<html lang="es">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
			</head>
			<body style="margin: 0; padding: 32px 16px; background-color: #0b0c10; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937;">
				<div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
					<div style="background: #090a0d; padding: 26px 32px; border-bottom: 1px solid rgba(255,255,255,0.08);">
						<table style="width: 100%; border-collapse: collapse;">
							<tr>
								<td><span style="color: #ffffff; font-size: 19px; font-weight: 800; letter-spacing: 0.15em;">WYLEN</span></td>
								<td style="text-align: right;">
									<span style="background: rgba(255,255,255,0.1); color: #cbd5e1; font-size: 11px; padding: 4px 10px; border-radius: 20px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">
										Nueva Consulta
									</span>
								</td>
							</tr>
						</table>
					</div>

					<div style="padding: 32px;">
						<h2 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0 0 20px 0; line-height: 1.3;">
							Has recibido un nuevo mensaje de contacto
						</h2>

						<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
							<tr>
								<td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; font-weight: 600; width: 130px; text-transform: uppercase; letter-spacing: 0.05em;">Nombre</td>
								<td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 15px; font-weight: 600;">${escapeHtml(nombre)}</td>
							</tr>
							<tr>
								<td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
								<td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 15px;">
									<a href="mailto:${escapeHtml(email)}" style="color: #2563eb; text-decoration: none; font-weight: 500;">${escapeHtml(email)}</a>
								</td>
							</tr>
							<tr>
								<td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Empresa</td>
								<td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #334155; font-size: 15px;">${escapeHtml(empresa || 'No especificada')}</td>
							</tr>
							<tr>
								<td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Tipo de Consulta</td>
								<td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-size: 15px; font-weight: 600;">${escapeHtml(inquiryLabel)}</td>
							</tr>
						</table>

						<div style="margin-top: 20px;">
							<div style="font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Mensaje</div>
							<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #090a0d; padding: 18px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${escapeHtml(mensaje)}</div>
						</div>

						<div style="margin-top: 30px; text-align: center;">
							<a href="mailto:${escapeHtml(email)}?subject=Re: Consulta Wylen - ${encodeURIComponent(inquiryLabel)}" 
							   style="display: inline-block; background: #090a0d; color: #ffffff; text-decoration: none; padding: 12px 26px; border-radius: 8px; font-size: 14px; font-weight: 600; letter-spacing: 0.02em;">
								Responder directamente a ${escapeHtml(nombre)}
							</a>
						</div>
					</div>

					<div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 32px; font-size: 12px; color: #94a3b8; text-align: center;">
						Mensaje recibido a través del sitio web oficial <a href="https://wylen.co" style="color: #64748b; text-decoration: underline;">wylen.co</a>
					</div>
				</div>
			</body>
			</html>
		`;

		// Enviar ambos correos en paralelo
		try {
			const [internalRes, userRes] = await Promise.allSettled([
				// 1. Notificación interna para Wylen
				fetch('https://api.resend.com/emails', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${apiKey}`,
						'User-Agent': 'wylen-web/1.0'
					},
					body: JSON.stringify({
						from: fromEmail,
						to: toEmail,
						reply_to: email,
						subject: `Nueva Consulta Wylen - ${nombre} (${inquiryLabel})`,
						html: internalEmailHtml
					})
				}),
				// 2. Confirmación para el usuario con la plantilla "solicitud-recibida"
				fetch('https://api.resend.com/emails', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${apiKey}`,
						'User-Agent': 'wylen-web/1.0'
					},
					body: JSON.stringify({
						from: fromEmail,
						to: email,
						reply_to: toEmail,
						template: {
							id: 'solicitud-recibida',
							variables: {
								nombre,
								consulta: inquiryLabel,
								empresa: empresa || ''
							}
						}
					})
				})
			]);

			// Comprobamos notificación interna (crítica)
			if (internalRes.status === 'rejected' || !internalRes.value.ok) {
				const errorDetails = internalRes.status === 'fulfilled' ? await internalRes.value.text() : internalRes.reason;
				console.error('Error enviando notificación interna a Wylen:', errorDetails);
				return fail(500, { error: 'server' });
			}

			// Notificamos si la confirmación al usuario tuvo algún problema (sin bloquear la transacción)
			if (userRes.status === 'rejected' || !userRes.value.ok) {
				const userErr = userRes.status === 'fulfilled' ? await userRes.value.text() : userRes.reason;
				console.warn('Advertencia: No se pudo entregar el correo de confirmación al usuario:', userErr);
			}

			return { success: true, consulta };
		} catch (error) {
			console.error('Error dispatching contact inquiry emails:', error);
			return fail(500, { error: 'server' });
		}
	}
};
