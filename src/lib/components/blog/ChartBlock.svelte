<script lang="ts">
	interface Props {
		data: {
			type?: 'bar' | 'line' | 'pie' | string;
			title?: string;
			caption?: string;
			labels?: string[];
			values?: number[];
		};
	}

	let { data }: Props = $props();

	const chartType = $derived(data.type || 'bar');
	const title = $derived(data.title || '');
	const caption = $derived(data.caption || '');
	const labels = $derived(data.labels || ['A', 'B', 'C', 'D']);
	const values = $derived(data.values || [30, 60, 45, 80]);

	const PIE_COLORS = ['#D97757', '#3D6158', '#8B5CF6', '#F59E0B', '#10B981', '#6366F1'];

	// Calculations for Bar and Line charts
	const maxValue = $derived(Math.max(...values, 1));
	const totalValue = $derived(values.reduce((a, b) => a + b, 0) || 1);

	// Calculate slices for Pie Chart SVG paths
	let pieSlices = $derived.by(() => {
		let accumulatedAngle = 0;
		return values.map((val, index) => {
			const percentage = val / totalValue;
			const angle = percentage * 360;
			const startAngle = accumulatedAngle;
			const endAngle = accumulatedAngle + angle;
			accumulatedAngle += angle;

			// Radians
			const startRad = (startAngle - 90) * (Math.PI / 180);
			const endRad = (endAngle - 90) * (Math.PI / 180);

			const r = 90;
			const cx = 100;
			const cy = 100;

			const x1 = cx + r * Math.cos(startRad);
			const y1 = cy + r * Math.sin(startRad);
			const x2 = cx + r * Math.cos(endRad);
			const y2 = cy + r * Math.sin(endRad);

			const largeArc = angle > 180 ? 1 : 0;

			const d = angle >= 360
				? `M ${cx - r},${cy} a ${r},${r} 0 1,0 ${r * 2},0 a ${r},${r} 0 1,0 -${r * 2},0`
				: `M ${cx},${cy} L ${x1},${y1} A ${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;

			return {
				d,
				color: PIE_COLORS[index % PIE_COLORS.length],
				label: labels[index] || `Item ${index + 1}`,
				value: val,
				percentage: Math.round(percentage * 100)
			};
		});
	});

	// Calculations for Line chart SVG points
	let linePoints = $derived.by(() => {
		const width = 440;
		const height = 180;
		const padding = 40;
		const usableW = width - padding * 2;
		const usableH = height - padding * 2;

		const step = labels.length > 1 ? usableW / (labels.length - 1) : usableW;

		const points = values.map((val, i) => {
			const x = padding + i * step;
			const y = height - padding - (val / maxValue) * usableH;
			return { x, y, val, label: labels[i] };
		});

		const pathD = points.length > 0
			? points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`, '')
			: '';

		const areaD = points.length > 0
			? `${pathD} L ${points[points.length - 1].x},${height - padding} L ${points[0].x},${height - padding} Z`
			: '';

		return { points, pathD, areaD, height, padding, width };
	});
</script>

<div class="chart-card">
	{#if title}
		<h4 class="chart-title">{title}</h4>
	{/if}

	<div class="chart-canvas-wrapper">
		{#if chartType === 'bar'}
			<svg viewBox="0 0 460 200" class="chart-svg">
				<!-- Grid lines -->
				<line x1="40" y1="30" x2="440" y2="30" stroke="#E8E6DD" stroke-dasharray="3,3" />
				<line x1="40" y1="90" x2="440" y2="90" stroke="#E8E6DD" stroke-dasharray="3,3" />
				<line x1="40" y1="150" x2="440" y2="150" stroke="#E8E6DD" />

				<!-- Y Axis Values -->
				<text x="32" y="34" font-size="10" fill="#73726C" text-anchor="end">{Math.round(maxValue)}</text>
				<text x="32" y="94" font-size="10" fill="#73726C" text-anchor="end">{Math.round(maxValue / 2)}</text>
				<text x="32" y="154" font-size="10" fill="#73726C" text-anchor="end">0</text>

				<!-- Bars -->
				{#each values as val, i}
					{@const barWidth = Math.min(45, Math.max(16, 360 / values.length - 16))}
					{@const step = 380 / values.length}
					{@const x = 50 + i * step + (step - barWidth) / 2}
					{@const barHeight = (val / maxValue) * 120}
					{@const y = 150 - barHeight}

					<rect
						{x}
						{y}
						width={barWidth}
						height={barHeight}
						rx="5"
						fill="#D97757"
						class="bar-rect"
					/>
					<!-- Value text on top -->
					<text
						x={x + barWidth / 2}
						y={y - 6}
						font-size="10"
						font-weight="600"
						fill="#141413"
						text-anchor="middle"
					>{val}</text>
					<!-- Label below -->
					<text
						x={x + barWidth / 2}
						y="170"
						font-size="11"
						fill="#73726C"
						text-anchor="middle"
					>{labels[i] || ''}</text>
				{/each}
			</svg>
		{:else if chartType === 'line'}
			<svg viewBox="0 0 460 200" class="chart-svg">
				<!-- Grid lines -->
				<line x1="40" y1="30" x2="440" y2="30" stroke="#E8E6DD" stroke-dasharray="3,3" />
				<line x1="40" y1="90" x2="440" y2="90" stroke="#E8E6DD" stroke-dasharray="3,3" />
				<line x1="40" y1="150" x2="440" y2="150" stroke="#E8E6DD" />

				<!-- Y Axis Values -->
				<text x="32" y="34" font-size="10" fill="#73726C" text-anchor="end">{Math.round(maxValue)}</text>
				<text x="32" y="94" font-size="10" fill="#73726C" text-anchor="end">{Math.round(maxValue / 2)}</text>
				<text x="32" y="154" font-size="10" fill="#73726C" text-anchor="end">0</text>

				<!-- Area Fill -->
				<path d={linePoints.areaD} fill="rgba(217, 119, 87, 0.12)" />
				<!-- Line Path -->
				<path d={linePoints.pathD} fill="none" stroke="#D97757" stroke-width="3" stroke-linecap="round" />

				<!-- Points and X Labels -->
				{#each linePoints.points as pt}
					<circle cx={pt.x} cy={pt.y} r="5" fill="#D97757" stroke="#FFFFFF" stroke-width="2" />
					<text x={pt.x} y={pt.y - 10} font-size="10" font-weight="600" fill="#141413" text-anchor="middle">{pt.val}</text>
					<text x={pt.x} y="170" font-size="11" fill="#73726C" text-anchor="middle">{pt.label || ''}</text>
				{/each}
			</svg>
		{:else if chartType === 'pie'}
			<div class="pie-layout">
				<svg viewBox="0 0 200 200" class="pie-svg">
					{#each pieSlices as slice}
						<path d={slice.d} fill={slice.color} stroke="#FAF7F2" stroke-width="2.5" class="pie-slice" />
					{/each}
				</svg>

				<div class="pie-legend">
					{#each pieSlices as slice}
						<div class="legend-item">
							<span class="legend-color" style="background-color: {slice.color};"></span>
							<span class="legend-label">{slice.label}</span>
							<span class="legend-val">{slice.value} ({slice.percentage}%)</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>

	{#if caption}
		<p class="chart-caption">{caption}</p>
	{/if}
</div>

<style>
	.chart-card {
		background: #FAF7F2;
		border: 1px solid #E8E6DD;
		border-radius: 16px;
		padding: 1.75rem;
		margin: 2.25rem 0;
	}

	.chart-title {
		font-family: var(--blog-font-sans, 'Inter', system-ui, sans-serif);
		font-size: 1.15rem;
		font-weight: 700;
		color: #141413;
		margin: 0 0 1.25rem 0;
	}

	.chart-canvas-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.chart-svg {
		width: 100%;
		max-height: 230px;
		overflow: visible;
	}

	.bar-rect {
		transition: transform 0.2s ease, opacity 0.2s ease;
	}

	.bar-rect:hover {
		opacity: 0.85;
	}

	.pie-layout {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		width: 100%;
		gap: 2rem;
	}

	.pie-svg {
		width: 180px;
		height: 180px;
		flex-shrink: 0;
	}

	.pie-slice {
		transition: transform 0.2s ease, opacity 0.2s ease;
	}

	.pie-slice:hover {
		opacity: 0.88;
	}

	.pie-legend {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
		flex: 1;
	}

	.legend-item {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		font-size: 0.875rem;
		color: #141413;
	}

	.legend-color {
		width: 12px;
		height: 12px;
		border-radius: 3px;
		flex-shrink: 0;
	}

	.legend-label {
		font-weight: 500;
		flex: 1;
	}

	.legend-val {
		color: #73726C;
		font-size: 0.825rem;
	}

	.chart-caption {
		font-size: 0.85rem;
		color: #73726C;
		font-style: italic;
		text-align: center;
		margin: 1rem 0 0 0;
	}

	@media (max-width: 540px) {
		.pie-layout {
			flex-direction: column;
		}

		.chart-card {
			padding: 1.25rem;
		}
	}
</style>
