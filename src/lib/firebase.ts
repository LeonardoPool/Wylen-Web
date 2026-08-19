import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCHohmImGeIDz_CiKxjOinMjbBLPONBaOQ',
	authDomain: 'wylen-4a4ef.firebaseapp.com',
	projectId: 'wylen-4a4ef',
	storageBucket: 'wylen-4a4ef.firebasestorage.app',
	messagingSenderId: '443063301097',
	appId: '1:443063301097:web:1a2f9fddea3a91e1839178',
	measurementId: 'G-57HXS03CPJ'
};

// Initialize Firebase App (prevents re-initialization on hot-reloads)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore Database instance
export const db = getFirestore(app);

// Data structure for Blog Articles
export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	title_en?: string;
	subtitle?: string;
	subtitle_en?: string;
	excerpt: string;
	excerpt_en?: string;
	content: string;
	content_en?: string;
	category: 'Ingeniería' | 'Inteligencia Artificial' | 'Filosofía' | 'Diseño' | 'Anuncios' | string;
	category_en?: string;
	author: {
		name: string;
		role: string;
		role_en?: string;
		avatar?: string;
	};
	date: string;
	date_en?: string;
	readTime: string;
	readTime_en?: string;
	likes: number;
	featured?: boolean;
	coverImage?: string;
	tags?: string[];
}

/**
 * Category translation helper
 */
export function translateCategory(category: string, lang: 'es' | 'en'): string {
	if (lang === 'es') return category;
	const map: Record<string, string> = {
		'Todos': 'All',
		'Ingeniería': 'Engineering',
		'Inteligencia Artificial': 'Artificial Intelligence',
		'Filosofía': 'Philosophy',
		'Diseño': 'Design',
		'Anuncios': 'Announcements'
	};
	return map[category] || category;
}

/**
 * Read time translation helper
 */
export function translateReadTime(readTime: string, lang: 'es' | 'en'): string {
	if (lang === 'es') return readTime;
	if (readTime.includes('min read')) return readTime;
	return readTime
		.replace(/minutos? de lectura/gi, 'min read')
		.replace(/min de lectura/gi, 'min read')
		.replace(/(\d+)\s*min\b/gi, '$1 min read')
		.replace(/min read read/gi, 'min read');
}

/**
 * Author role translation helper
 */
export function translateAuthorRole(role: string, lang: 'es' | 'en'): string {
	if (lang === 'es') return role;
	const map: Record<string, string> = {
		'Ingeniería': 'Engineering',
		'Investigación & Sistemas': 'Research & Systems',
		'Autor': 'Author',
		'Diseño': 'Design',
		'Equipo Wylen': 'Wylen Team',
		'Lead Architect': 'Lead Architect',
		'Product Strategy': 'Product Strategy',
		'Design Lead': 'Design Lead'
	};
	return map[role] || role;
}

/**
 * Date translation helper
 */
export function translateDateStr(dateStr: string, lang: 'es' | 'en'): string {
	if (lang === 'es') return dateStr;
	const monthsEsToEn: Record<string, string> = {
		'enero': 'January', 'febrero': 'February', 'marzo': 'March', 'abril': 'April',
		'mayo': 'May', 'junio': 'June', 'julio': 'July', 'agosto': 'August',
		'septiembre': 'September', 'octubre': 'October', 'noviembre': 'November', 'diciembre': 'December'
	};
	
	let res = dateStr;
	for (const [es, en] of Object.entries(monthsEsToEn)) {
		const regex = new RegExp(`(\\d+)\\s+de\\s+${es}(?:\\s+de\\s+|,\\s*)(\\d+)`, 'gi');
		if (regex.test(res)) {
			return res.replace(regex, `${en} $1, $2`);
		}
	}
	for (const [es, en] of Object.entries(monthsEsToEn)) {
		res = res.replace(new RegExp(`\\bde ${es}\\b`, 'gi'), en);
		res = res.replace(new RegExp(`\\b${es}\\b`, 'gi'), en);
	}
	return res.replace(/\s+de\s+/gi, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * English fallback dictionary for known articles without explicit Firestore _en fields
 */
const KNOWN_EN_TRANSLATIONS: Record<string, Partial<BlogPost>> = {
	'capiy': {
		title: 'CHAPTER 1. Nobody is Born Knowing',
		subtitle: 'It all starts with a question',
		excerpt: 'Learning does not begin when we have all the answers, but when we dare to ask questions. Sometimes, approaching technology only requires stopping, observing, and discovering new possibilities.',
		category: 'Engineering',
		content: `
			<div class="article-text-block">
				<div>There is something we all have in common when we arrive in the world:</div>
				<div><br><b>We do not know.</b></div>
				<div><br></div>
				<div><p>We do not know how to walk, talk, build, solve problems, or understand how the world around us works.</p><p>And yet, we learn.</p><p>Little by little.<br>At our own pace.<br>Asking, making mistakes, and trying again.</p><p>Over time, perhaps we forget how natural that process was.</p></div>
			</div>
			<div class="article-text-block">
				<h2><b>Before Finding Answers</b></h2>
				<div><br></div>
				<div><p>When we talk about technology, we usually do so from the answers.</p><p>Which tool to use.<br>Which system to hire.<br>What we can automate.<br>What artificial intelligence can do.</p><p>But perhaps we are starting in the wrong place.</p><p>Before looking for an answer, we need to understand what we are asking.</p></div>
			</div>
			<div class="article-text-block">
				<h2>Learning is also about pausing.</h2>
				<div><br></div>
				<div><p>Not every problem needs an app.</p><p>Not every process needs automation.</p><p>Not every business needs to adopt every new tool that emerges.</p><p>Technology makes sense when it helps us do something better: when it gives us time back, reduces difficulty, facilitates a task, or allows us to offer something that previously seemed out of reach.</p></div>
			</div>
			<div class="article-text-block">
				<h2>Nobody should feel small for not knowing</h2>
				<div><br></div>
				<div><p>There is an important difference between not knowing something and being unable to learn it.</p><p>The first is part of life.</p><p>The second is an idea we often teach ourselves.</p><p>When we see a tool that looks complicated, it is easy to think: "This is not for me."</p></div>
			</div>
			<div class="article-text-block">
				<h2>Questions also build.</h2>
				<div><br></div>
				<div><p>A good question doesn't always give us an immediate answer.</p><p>Sometimes it does something more important:</p><p><br></p><p><b>It helps us see.</b></p><p><br></p><p>It makes us notice what we had normalized.</p><p>It allows us to discover an opportunity.</p></div>
			</div>
			<blockquote class="article-quote-block">
				<p>«WYLEN - Engineering That Inspires.»</p>
				<cite style="display:block; margin-top:0.5rem; font-style:normal; font-weight:600; font-size:0.9rem; color:var(--blog-accent);">— IDGS Leonardo Pool</cite>
			</blockquote>
			<div class="article-text-block">
				<p>— <em>James 1:5</em></p>
			</div>
		`
	}
};

/**
 * Returns a localized BlogPost based on the current language ('es' | 'en')
 */
export function getLocalizedPost(post: BlogPost, lang: string): BlogPost {
	if (lang === 'es') return post;

	// Check if post has explicit English fields or known translations dictionary
	const knownEn = KNOWN_EN_TRANSLATIONS[post.slug] || KNOWN_EN_TRANSLATIONS[post.id];

	return {
		...post,
		title: post.title_en || knownEn?.title || post.title,
		subtitle: post.subtitle_en || knownEn?.subtitle || post.subtitle,
		excerpt: post.excerpt_en || knownEn?.excerpt || post.excerpt,
		content: post.content_en || knownEn?.content || post.content,
		category: post.category_en || knownEn?.category || translateCategory(post.category, 'en'),
		author: {
			...post.author,
			role: post.author.role_en || translateAuthorRole(post.author.role, 'en')
		},
		date: post.date_en || translateDateStr(post.date, 'en'),
		readTime: post.readTime_en || translateReadTime(post.readTime, 'en')
	};
}

// Anthropic-inspired default fallback dataset for immediate demonstration & fallback
export const MOCK_BLOG_POSTS: BlogPost[] = [
	{
		id: 'construyendo-sistemas-con-intencion',
		slug: 'construyendo-sistemas-con-intencion',
		title: 'Construyendo sistemas con intención: Más allá de la fiebre por la inteligencia artificial',
		subtitle: 'Un análisis sobre por qué el rigor de ingeniería y la claridad conceptual importan más que la complejidad apresurada.',
		excerpt: 'En un ecosistema obsesionado con la velocidad y la proliferación de modelos, defendemos el rigor arquitectónico, la simplicidad y el diseño de software pensado para perdurar.',
		category: 'Inteligencia Artificial',
		author: {
			name: 'Equipo de Ingeniería Wylen',
			role: 'Investigación & Sistemas'
		},
		date: '18 de Agosto, 2026',
		readTime: '6 min de lectura',
		likes: 18,
		featured: true,
		tags: ['Inteligencia Artificial', 'Arquitectura', 'Filosofía Technical'],
		content: `
<p class="lead">El desarrollo moderno de tecnología atraviesa una etapa de aceleración sin precedentes. Sin embargo, en la prisa por desplegar agentes e integrar modelos masivos de lenguaje, muchas organizaciones están sacrificando la base fundamental de todo software duradero: la intención clara y la simplicidad estructural.</p>

<h2>La ilusión de la complejidad</h2>
<p>Es fácil confundir la cantidad de capas de un software con su valor real. En Wylen hemos observado que los sistemas más resilientes no son aquellos que implementan los frameworks más nuevos ni los algoritmos más cargados de ruido, sino aquellos cuyas piezas encajan de manera limpia y predecible.</p>

<blockquote>«La verdadera sofisticación técnica no es añadir capas de abstracción innecesarias, sino reducir los puntos de falla hasta encontrar la esencia del problema.»</blockquote>

<h2>Tres principios para la IA en producción</h2>
<p>Para construir soluciones basadas en IA que generen valor medible sin convertirse en una pesadilla de mantenimiento, guiamos nuestro trabajo bajo tres pilares:</p>

<ul>
	<li><strong>Determinismo sobre magia:</strong> La inteligencia artificial debe complementar flujos deterministas bien estructurados, no intentar adivinar lógica de negocio básica.</li>
	<li><strong>Transparencia operacional:</strong> Cada inferencia, consulta o decisión tomada por un agente debe ser auditable y comprensible para los operadores humanos.</li>
	<li><strong>Economía de cómputo:</strong> Usar el modelo adecuado para la tarea adecuada. No se requiere una red neuronal gigantesca para tareas que una función bien optimizada resuelve en milisegundos.</li>
</ul>

<h2>Diseñando para las personas</h2>
<p>Al final del día, el software no existe en el vacío. Existe para ampliar la capacidad de las personas que lo operan. Cuando diseñamos sistemas con intención, transformamos el caos de datos en herramientas que inspiran confianza y claridad.</p>
		`
	},
	{
		id: 'arquitectura-de-software-minimalista',
		slug: 'arquitectura-de-software-minimalista',
		title: 'Arquitectura de software minimalista: Por qué menos componentes equivalen a más confiabilidad',
		subtitle: 'Cómo la eliminación de dependencias superfluas acelera el desarrollo y garantiza la mantenibilidad a largo plazo.',
		excerpt: 'La verdadera sofisticación técnica no es añadir capas de abstracción innecesarias, sino reducir los puntos de falla hasta encontrar la esencia del problema.',
		category: 'Ingeniería',
		author: {
			name: 'Carlos Mendoza',
			role: 'Lead Architect'
		},
		date: '12 de Agosto, 2026',
		readTime: '4 min de lectura',
		featured: false,
		tags: ['Ingeniería', 'Arquitectura', 'Performance'],
		content: `
<p class="lead">Cada dependencia que agregas a un proyecto es una promesa de mantenimiento futuro. En esta entrega analizamos cómo reducir la huella de código mejora drásticamente los tiempos de respuesta y la estabilidad operacional.</p>

<h2>El costo oculto de las abstracciones excesivas</h2>
<p>Crear abstracciones demasiado pronto en el ciclo de vida de un producto genera una rigidez artificial. Cuando el código se escribe pensando en flexibilidad imaginaria en lugar de requerimientos concretos, la complejidad crece de forma exponencial.</p>

<h2>Principios de diseño limpio</h2>
<p>Adoptar un enfoque minimalista significa priorizar módulos autónomos, interfaces limpias y pruebas de integración enfocadas en escenarios reales.</p>
		`
	},
	{
		id: 'impacto-humano-automatizacion',
		slug: 'impacto-humano-automatizacion',
		title: 'El impacto humano en la automatización empresarial',
		subtitle: 'Diseñando procesos que liberan el potencial de las personas en lugar de relegarlas.',
		excerpt: 'La automatización no consiste en reemplazar la interacción humana, sino en eliminar las tareas repetitivas para amplificar el criterio estratégico.',
		category: 'Filosofía',
		author: {
			name: 'Sofía Valenzuela',
			role: 'Product Strategy'
		},
		date: '5 de Agosto, 2026',
		readTime: '5 min de lectura',
		featured: false,
		tags: ['Automatización', 'Diseño Humano', 'Estrategia'],
		content: `
<p class="lead">Cuando automatizamos un proceso de negocio, nuestro primer objetivo no es ahorrar minutos en una hoja de cálculo, sino devolver la capacidad creativa y de toma de decisiones a los equipos de trabajo.</p>

<h2>Automatización orientada a la empatía</h2>
<p>Un sistema de automatización exitoso se integra de manera imperceptible en las rutinas de la empresa, eliminando fricciones operativas y permitiendo que las personas se concentren en lo que realmente aporta valor.</p>
		`
	},
	{
		id: 'diseno-de-interfaces-con-contexto',
		slug: 'diseno-de-interfaces-con-contexto',
		title: 'Diseño de interfaces con contexto: La estética de la claridad',
		subtitle: 'Cómo la jerarquía visual y la tipografía adecuada transforman datos complejos en experiencias intuitivas.',
		excerpt: 'El diseño de producto en Wylen busca eliminar la fricción visual para que el usuario se enfoque únicamente en tomar decisiones informadas.',
		category: 'Diseño',
		author: {
			name: 'Mateo Ríos',
			role: 'Design Lead'
		},
		date: '28 de Julio, 2026',
		readTime: '4 min de lectura',
		featured: false,
		tags: ['Diseño UI/UX', 'Tipografía', 'Sistemas de Diseño'],
		content: `
<p class="lead">En la era de la sobrecarga de información, el buen diseño no atrae la atención hacia sí mismo; atrae la atención hacia el contenido y las acciones cruciales.</p>

<h2>Jerarquía visual y contraste intencional</h2>
<p>Analizamos cómo el uso disciplinado de la tipografía, los espacios en blanco y las paletas cromáticas sobrias permiten estructurar aplicaciones donde la navegación se siente natural e instintiva.</p>
		`
	}
];

/**
 * Safe parser for Firestore Timestamps or String dates
 */
function parseTimestamp(ts: any): string {
	if (!ts) return '';
	if (typeof ts === 'string') return ts;
	if (typeof ts.toDate === 'function') {
		return ts.toDate().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
	}
	if (typeof ts.seconds === 'number') {
		return new Date(ts.seconds * 1000).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
	}
	return String(ts);
}

/**
 * Specialized parser for the 'content' collection's body block array schema
 */
function parseBodyBlocks(body: any): string {
	if (!body) return '';
	if (typeof body === 'string') return body;
	if (!Array.isArray(body)) return parseContentField(body);

	return body
		.map((block) => {
			if (!block) return '';
			if (typeof block === 'string') return `<p>${block}</p>`;

			const blockType = block.type || '';
			const data = block.data || block;

			if (blockType === 'text') {
				const htmlContent = data.html || data.text || data.content || '';
				return `<div class="article-text-block">${htmlContent}</div>`;
			}

			if (blockType === 'image') {
				const imgUrl = data.url || '';
				const altText = data.alt || '';
				const caption = data.caption || '';
				if (!imgUrl) return '';
				return `
					<figure class="article-image-block" style="margin: 2rem 0;">
						<img src="${imgUrl}" alt="${altText}" loading="lazy" style="width:100%; height:auto; border-radius:14px; border: 1px solid var(--blog-border); display: block;" />
						${caption ? `<figcaption style="text-align:center; font-size:0.85rem; color:var(--blog-text-muted); margin-top:0.6rem;">${caption}</figcaption>` : ''}
					</figure>
				`;
			}

			if (blockType === 'quote') {
				const quoteText = data.text || data.quote || '';
				const quoteAuthor = data.author || data.autor || '';
				return `
					<blockquote class="article-quote-block">
						<p>«${quoteText}»</p>
						${quoteAuthor ? `<cite style="display:block; margin-top:0.5rem; font-style:normal; font-weight:600; font-size:0.9rem; color:var(--blog-accent);">— ${quoteAuthor}</cite>` : ''}
					</blockquote>
				`;
			}

			if (data.html) return `<div class="article-block">${data.html}</div>`;
			if (data.text) return `<p>${data.text}</p>`;
			return '';
		})
		.filter(Boolean)
		.join('\n');
}

/**
 * Helper to safely extract string HTML/text from generic content fields
 */
function parseContentField(rawContent: any): string {
	if (!rawContent) return '';
	if (typeof rawContent === 'string') return rawContent;
	if (Array.isArray(rawContent)) return parseBodyBlocks(rawContent);
	if (typeof rawContent === 'object') {
		const text = rawContent.text || rawContent.texto || rawContent.body || rawContent.cuerpo || rawContent.content || rawContent.contenido;
		if (text && typeof text === 'string') return text;
		if (text && (Array.isArray(text) || typeof text === 'object')) return parseContentField(text);
	}
	return String(rawContent);
}

/**
 * Maps raw Firestore document fields (supporting Spanish and English key names) to BlogPost
 */
function parseFirestoreDoc(docId: string, data: any): BlogPost {
	const title = data.title || data.titulo || data.name || data.nombre || data.heading || 'Sin título';
	const subtitle = parseContentField(data.subtitle || data.subtitulo || data.summary || data.resumen || data.bajada || '');
	const rawExcerpt = data.excerpt || data.extracto || data.description || data.descripcion || data.resumen || data.intro || '';
	
	// Parse structured body blocks array or raw content string
	const content = data.body ? parseBodyBlocks(data.body) : parseContentField(data.content || data.contenido || data.text || rawExcerpt);
	
	// Excerpt fallback
	let excerpt = parseContentField(rawExcerpt);
	if (!excerpt && content) {
		const cleanText = content.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
		excerpt = cleanText.length > 180 ? cleanText.slice(0, 180) + '...' : cleanText;
	}

	const category = data.category || data.categoria || data.tag || data.type || 'Ingeniería';

	// Extract author info from author field or quote blocks in body
	let author = { name: 'Equipo Wylen', role: 'Ingeniería' };
	if (Array.isArray(data.body)) {
		const quoteWithAuthor = data.body.find((b: any) => b.type === 'quote' && b.data?.author);
		if (quoteWithAuthor && quoteWithAuthor.data.author) {
			author = { name: quoteWithAuthor.data.author, role: 'Autor' };
		}
	}
	if (typeof data.author === 'string') {
		author = { name: data.author, role: 'Wylen' };
	} else if (typeof data.autor === 'string') {
		author = { name: data.autor, role: 'Wylen' };
	} else if (data.author && typeof data.author === 'object') {
		author = {
			name: data.author.name || data.author.nombre || author.name,
			role: data.author.role || data.author.rol || author.role
		};
	}

	// Date parsing (publishedAt -> createdAt -> date -> fecha)
	let dateStr = parseTimestamp(data.publishedAt) || parseTimestamp(data.createdAt) || data.date || data.fecha || '18 de Agosto, 2026';

	const readTime = data.readTime || data.tiempoLectura || data.tiempo_lectura || data.read_time || '5 min de lectura';
	const slug = data.slug || docId;
	const featured = Boolean(data.featured || data.destacado);
	const tags = Array.isArray(data.tags) ? data.tags : (Array.isArray(data.etiquetas) ? data.etiquetas : ['Wylen']);

	// Cover Image extraction (map with url vs string vs images array)
	let coverImage = '';
	if (data.coverImage) {
		if (typeof data.coverImage === 'string') coverImage = data.coverImage;
		else if (typeof data.coverImage === 'object' && data.coverImage.url) coverImage = data.coverImage.url;
	}
	if (!coverImage && Array.isArray(data.images)) {
		const coverImg = data.images.find((img: any) => img.isCover) || data.images[0];
		if (coverImg && coverImg.url) coverImage = coverImg.url;
	}

	// Extract likes count (defaults to 0 if missing)
	const likes = typeof data.likes === 'number'
		? data.likes
		: (typeof data.meGusta === 'number' ? data.meGusta : (typeof data.likesCount === 'number' ? data.likesCount : 0));

	return {
		id: docId,
		slug,
		title,
		subtitle,
		excerpt,
		content,
		category,
		author,
		date: dateStr,
		readTime,
		likes,
		featured,
		coverImage,
		tags
	};
}

/**
 * Candidate collections in Firestore to check (primary collection: 'content')
 */
const CANDIDATE_COLLECTIONS = ['content', 'blogs', 'posts', 'articulos', 'articles', 'blog'];

/**
 * Ensures the 'likes' field is created/initialized on a Firestore document when consulted
 */
export async function ensureArticleLikesField(slugOrId: string, currentLikes: number = 0): Promise<void> {
	for (const colName of CANDIDATE_COLLECTIONS) {
		try {
			const docRef = doc(db, colName, slugOrId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const data = docSnap.data();
				if (typeof data.likes !== 'number') {
					await setDoc(docRef, { likes: currentLikes || 0 }, { merge: true });
					console.log(`[Firestore] Initialized missing 'likes' field (${currentLikes || 0}) for document '${slugOrId}' in '${colName}'`);
				}
				return;
			}
		} catch (err) {
			console.warn(`[Firestore] Failed to ensure likes field for '${slugOrId}' in '${colName}':`, err);
		}
	}
}

/**
 * Toggles like count (+1 or -1) atomically in Firestore and returns updated count
 */
export async function toggleArticleLike(slugOrId: string, isLiking: boolean): Promise<number> {
	const delta = isLiking ? 1 : -1;
	for (const colName of CANDIDATE_COLLECTIONS) {
		try {
			const docRef = doc(db, colName, slugOrId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const currentLikes = docSnap.data().likes || 0;
				const updatedLikes = Math.max(0, currentLikes + delta);
				await setDoc(docRef, { likes: increment(delta) }, { merge: true });
				console.log(`[Firestore] Updated likes for '${slugOrId}' to ${updatedLikes} in '${colName}'`);
				return updatedLikes;
			}
		} catch (err) {
			console.warn(`[Firestore] Error updating likes in collection '${colName}':`, err);
		}
	}
	return 0;
}

/**
 * Fetch all blog posts from Firestore
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
	for (const colName of CANDIDATE_COLLECTIONS) {
		try {
			const ref = collection(db, colName);
			const snapshot = await getDocs(ref);
			if (!snapshot.empty) {
				const posts: BlogPost[] = [];
				snapshot.forEach((docSnap) => {
					posts.push(parseFirestoreDoc(docSnap.id, docSnap.data()));
				});
				console.log(`[Firestore] Loaded ${posts.length} posts from collection '${colName}'`);
				return posts;
			}
		} catch (err) {
			console.warn(`[Firestore] Could not fetch collection '${colName}':`, err);
		}
	}

	console.log('[Firestore] No documents found in Firestore collections, returning fallback posts.');
	return MOCK_BLOG_POSTS;
}

/**
 * Fetch a single blog post by its slug or ID
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
	const posts = await getBlogPosts();
	const match = posts.find((p) => p.slug === slug || p.id === slug);
	if (match) {
		// Ensure 'likes' field is created in Firestore upon consultation if missing
		ensureArticleLikesField(match.id, match.likes);
		return match;
	}

	// Try direct collection lookup across candidate collections
	for (const colName of CANDIDATE_COLLECTIONS) {
		try {
			const docRef = doc(db, colName, slug);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const post = parseFirestoreDoc(docSnap.id, docSnap.data());
				ensureArticleLikesField(docSnap.id, post.likes);
				return post;
			}
		} catch (err) {
			console.warn(`[Firestore] Direct doc lookup failed on collection '${colName}':`, err);
		}
	}

	return MOCK_BLOG_POSTS.find((p) => p.slug === slug || p.id === slug) || null;
}
