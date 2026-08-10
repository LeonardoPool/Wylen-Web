<script lang="ts">
    const currentYear = new Date().getFullYear();

    const footerColumns = [
        {
            title: 'Servicios',
            links: [
                { label: 'Software empresarial', href: '#' },
                { label: 'Productos digitales', href: '#' },
                { label: 'Consultoría técnica', href: '#' },
                { label: 'Automatización', href: '#' },
                { label: 'Integraciones', href: '#' }
            ]
        },
        {
            title: 'Empresa',
            links: [
                { label: 'Nosotros', href: '#' },
                { label: 'Ingeniería', href: '#' },
                { label: 'Filosofía', href: '#' },
                { label: 'Equipo', href: '#' },
                { label: 'Carreras', href: '#' }
            ]
        },
        {
            title: 'Recursos',
            links: [
                { label: 'Blog', href: '#' },
                { label: 'Casos de estudio', href: '#' },
                { label: 'Documentación', href: '#' },
                { label: 'Guías técnicas', href: '#' }
            ]
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacidad', href: '#' },
                { label: 'Términos de uso', href: '#' },
                { label: 'Responsable AI', href: '#' },
                { label: 'Seguridad', href: '#' }
            ]
        }
    ];
</script>

<footer class="site-footer">
    <div class="footer-inner">
        <!-- Top row: brand + columns -->
        <div class="footer-top">
            <div class="footer-brand">
                <span class="footer-logo">WYLEN</span>
                <p class="footer-tagline">Engineering that inspires.</p>
            </div>

            <div class="footer-columns">
                {#each footerColumns as column}
                    <div class="footer-column">
                        <h4 class="footer-column-title">{column.title}</h4>
                        <ul class="footer-links">
                            {#each column.links as link}
                                <li><a href={link.href} class="footer-link">{link.label}</a></li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Divider -->
        <div class="footer-divider"></div>

        <!-- Bottom row: copyright + social -->
        <div class="footer-bottom">
            <p class="footer-copyright">© {currentYear} Wylen. Todos los derechos reservados.</p>

            <div class="footer-social">
                <!-- LinkedIn -->
                <a href="#" class="social-link" aria-label="LinkedIn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                </a>
                <!-- X / Twitter -->
                <a href="#" class="social-link" aria-label="X">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                </a>
                <!-- GitHub -->
                <a href="#" class="social-link" aria-label="GitHub">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</footer>

<style>
    .site-footer {
        background-color: #191A17;
        color: #A1A1A6;
        padding: 5rem 4rem 3rem;
        font-family: var(--font-interface, 'Manrope', sans-serif);
    }

    .footer-inner {
        max-width: 1400px;
        margin: 0 auto;
    }

    .footer-top {
        display: grid;
        grid-template-columns: 1fr 3fr;
        gap: 4rem;
        margin-bottom: 4rem;
    }

    .footer-brand {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .footer-logo {
        font-family: var(--font-brand, 'Switzer', sans-serif);
        font-size: 1.4rem;
        font-weight: 800;
        color: #F5F2EB;
        letter-spacing: 0.08em;
    }

    .footer-tagline {
        font-size: 0.9rem;
        color: #6B6B70;
        line-height: 1.5;
        max-width: 220px;
    }

    .footer-columns {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
    }

    .footer-column-title {
        font-size: 0.8rem;
        font-weight: 600;
        color: #F5F2EB;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        margin-bottom: 1.5rem;
    }

    .footer-links {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
    }

    .footer-link {
        font-size: 0.9rem;
        color: #8A8A8F;
        text-decoration: none;
        transition: color 0.2s ease;
        line-height: 1.4;
    }

    .footer-link:hover {
        color: #F5F2EB;
    }

    .footer-divider {
        height: 1px;
        background: rgba(255, 255, 255, 0.08);
        margin-bottom: 2rem;
    }

    .footer-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .footer-copyright {
        font-size: 0.82rem;
        color: #5A5A5F;
    }

    .footer-social {
        display: flex;
        align-items: center;
        gap: 1.2rem;
    }

    .social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        color: #6B6B70;
        transition: color 0.2s ease, background-color 0.2s ease;
    }

    .social-link:hover {
        color: #F5F2EB;
        background-color: rgba(255, 255, 255, 0.06);
    }

    /* Responsive */
    @media (max-width: 1024px) {
        .site-footer {
            padding: 4rem 2.5rem 2.5rem;
        }

        .footer-top {
            grid-template-columns: 1fr;
            gap: 3rem;
        }

        .footer-columns {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
        }
    }

    @media (max-width: 640px) {
        .site-footer {
            padding: 3rem 1.5rem 2rem;
        }

        .footer-columns {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }

        .footer-bottom {
            flex-direction: column;
            gap: 1.5rem;
            align-items: flex-start;
        }
    }
</style>
