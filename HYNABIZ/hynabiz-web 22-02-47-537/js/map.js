/**
 * HYNA BIZ — Geospatial Business Corridors & Global Network Map
 * Renders realistic geopolitical trade and enterprise connection lines.
 * Strictly avoids sci-fi neon spinning globes in favor of financial-grade corporate cartography.
 */

const MapModule = (() => {
  const nodes = [
    { id: 'mumbai', name: 'Mumbai', country: 'India 🇮🇳', x: 670, y: 280, volume: '$18.4M/mo', connections: 142, status: 'Active Manufacturing & Export Hub' },
    { id: 'dubai', name: 'Dubai', country: 'UAE 🇦🇪', x: 580, y: 260, volume: '$34.2M/mo', connections: 289, status: 'Middle East Regional Logistics Core' },
    { id: 'hamburg', name: 'Hamburg', country: 'Germany 🇩🇪', x: 490, y: 160, volume: '$29.0M/mo', connections: 215, status: 'North Sea Maritime Terminal' },
    { id: 'singapore', name: 'Singapore', country: 'Singapore 🇸🇬', x: 770, y: 340, volume: '$46.8M/mo', connections: 380, status: 'APAC Trade & Customs Clearing' },
    { id: 'tokyo', name: 'Tokyo', country: 'Japan 🇯🇵', x: 860, y: 230, volume: '$22.5M/mo', connections: 194, status: 'Advanced Precision & Robotics Node' },
    { id: 'london', name: 'London', country: 'UK 🇬🇧', x: 460, y: 170, volume: '$31.7M/mo', connections: 310, status: 'Financial Settlements & Trade Credit' },
    { id: 'chicago', name: 'Chicago', country: 'USA 🇺🇸', x: 230, y: 190, volume: '$27.4M/mo', connections: 178, status: 'Midwest Industrial Logistics Hub' },
    { id: 'saopaulo', name: 'São Paulo', country: 'Brazil 🇧🇷', x: 330, y: 390, volume: '$12.9M/mo', connections: 96, status: 'South American Commodities Gateway' }
  ];

  const corridors = [
    { from: 'mumbai', to: 'dubai', transit: '3 Days Sea / 3.5h Air', goods: 'Industrial Components & Castings' },
    { from: 'dubai', to: 'hamburg', transit: '14 Days Sea / 6.5h Air', goods: 'Re-Export Electronics & Tooling' },
    { from: 'singapore', to: 'tokyo', transit: '6 Days Sea / 7h Air', goods: 'Optoelectronics & Microchips' },
    { from: 'mumbai', to: 'singapore', transit: '5 Days Sea / 5h Air', goods: 'Fabricated Steel & Minerals' },
    { from: 'london', to: 'dubai', transit: '16 Days Sea / 7h Air', goods: 'Capital Goods & Financial Contracts' },
    { from: 'chicago', to: 'london', transit: '12 Days Sea / 8h Air', goods: 'Heavy Assemblies & Polymers' },
    { from: 'saopaulo', to: 'hamburg', transit: '18 Days Sea / 11h Air', goods: 'Agricultural Commodities & Cellulose' }
  ];

  function renderMap(containerId, isMini = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const viewBoxWidth = 1000;
    const viewBoxHeight = 500;

    // Build SVG paths for corridors
    const corridorPaths = corridors.map(c => {
      const start = nodes.find(n => n.id === c.from);
      const end = nodes.find(n => n.id === c.to);
      if (!start || !end) return '';

      // Curved Bezier line between cities
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const cx = (start.x + end.x) / 2;
      const cy = (start.y + end.y) / 2 - Math.min(Math.abs(dx) * 0.22, 60);

      return `
        <g class="corridor-group" data-transit="${c.transit}" data-goods="${c.goods}">
          <path d="M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}" 
                fill="none" 
                stroke="${isMini ? 'rgba(0, 194, 255, 0.4)' : 'rgba(0, 194, 255, 0.45)'}" 
                stroke-width="${isMini ? '1.5' : '2'}" 
                stroke-dasharray="4, 4"
                class="map-corridor-line" />
        </g>
      `;
    }).join('');

    // Build SVG markers for nodes
    const nodeMarkers = nodes.map(node => {
      return `
        <g class="map-node-marker" 
           data-node-id="${node.id}"
           onclick="MapModule.showNodeTooltip('${node.id}', ${node.x}, ${node.y})"
           style="cursor:pointer;">
          <circle cx="${node.x}" cy="${node.y}" r="${isMini ? '4' : '6'}" fill="#00C2FF" opacity="0.9" />
          <circle cx="${node.x}" cy="${node.y}" r="${isMini ? '8' : '12'}" fill="#00C2FF" opacity="0.2" class="node-halo" />
          ${!isMini ? `
            <text x="${node.x}" y="${node.y + 18}" 
                  fill="#94A3B8" 
                  font-family="'Inter', sans-serif" 
                  font-size="11" 
                  font-weight="600" 
                  text-anchor="middle"
                  style="pointer-events:none;">
              ${node.name}
            </text>
          ` : ''}
        </g>
      `;
    }).join('');

    // Realistic simplified world continent outlines
    const landmasses = `
      <!-- North America -->
      <path d="M 120 90 L 260 80 L 320 130 L 290 190 L 230 250 L 190 280 L 160 210 L 110 160 Z" fill="#13233E" opacity="0.6"/>
      <!-- South America -->
      <path d="M 280 290 L 370 320 L 360 430 L 310 470 L 270 370 Z" fill="#13233E" opacity="0.6"/>
      <!-- Europe -->
      <path d="M 440 110 L 530 110 L 540 180 L 480 200 L 430 170 Z" fill="#13233E" opacity="0.6"/>
      <!-- Africa -->
      <path d="M 460 210 L 560 210 L 570 340 L 510 420 L 460 330 Z" fill="#13233E" opacity="0.6"/>
      <!-- Asia -->
      <path d="M 550 100 L 850 110 L 890 220 L 800 320 L 680 320 L 580 240 Z" fill="#13233E" opacity="0.6"/>
      <!-- Australia -->
      <path d="M 780 360 L 880 370 L 870 450 L 790 440 Z" fill="#13233E" opacity="0.6"/>
    `;

    container.innerHTML = `
      <svg viewBox="0 0 ${viewBoxWidth} ${viewBoxHeight}" class="${isMini ? 'map-svg-routes' : 'map-svg-full'}" style="width:100%;height:100%;">
        <!-- Coordinate Grid -->
        <defs>
          <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.03)" stroke-width="1"/>
          </pattern>
        </defs>
        <rect width="1000" height="500" fill="url(#gridPattern)" />

        <!-- Continents -->
        ${landmasses}

        <!-- Corridors & Nodes -->
        ${corridorPaths}
        ${nodeMarkers}
      </svg>
      <div id="map-tooltip" style="position:absolute;display:none;background:#0B1220;border:1px solid #00C2FF;padding:10px 14px;border-radius:6px;box-shadow:0 8px 24px rgba(0,0,0,0.5);color:#FFFFFF;font-size:0.8rem;z-index:20;pointer-events:none;"></div>
    `;
  }

  function showNodeTooltip(nodeId, x, y) {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    App.showToast(`${node.name} Hub (${node.country}): Processing ${node.volume} across ${node.connections} verified enterprises.`, 'info');
  }

  return {
    init: () => {
      renderMap('hero-mini-map-container', true);
      renderMap('global-network-map-container', false);
    },
    showNodeTooltip
  };
})();
