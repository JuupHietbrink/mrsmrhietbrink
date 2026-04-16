/* ─────────────────────────────────────────────────────────────
   Wedding Guest Map — script.js
   ───────────────────────────────────────────────────────────── */

// ── Map initialisation ────────────────────────────────────────
const map = L.map('map', {
  center: [52.3, 5.3],   // centre of the Netherlands
  zoom: 8,
  zoomControl: true,
});

// OpenStreetMap tiles (light, clean style)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// ── Marker cluster group ──────────────────────────────────────
const clusterGroup = L.markerClusterGroup({
  showCoverageOnHover: false,
  maxClusterRadius: 60,
  iconCreateFunction(cluster) {
    const count = cluster.getChildCount();
    return L.divIcon({
      html: `<div class="cluster-icon">${count}</div>`,
      className: '',
      iconSize: [40, 40],
    });
  },
});

// ── Colour & radius helpers ───────────────────────────────────
const FILL   = 'rgba(180, 80, 80, 0.35)';
const STROKE = 'rgba(180, 80, 80, 0.85)';
const FILL_H = 'rgba(180, 80, 80, 0.60)';   // hover fill

function guestRadius(guests) {
  return Math.sqrt(guests) * 5;
}

// ── Load data & render markers ────────────────────────────────
fetch('data.json')
  .then(r => r.json())
  .then(cities => {
    let totalGuests = 0;

    cities.forEach(({ city, lat, lng, guests, carpool_link }) => {
      totalGuests += guests;
      const radius = guestRadius(guests);

      const circle = L.circleMarker([lat, lng], {
        radius,
        fillColor: FILL,
        color: STROKE,
        weight: 2,
        fillOpacity: 1,
      });

      // ── Popup ───────────────────────────────────────────────
      const guestWord = guests === 1 ? 'guest' : 'guests';
      circle.bindPopup(`
        <div class="popup-inner">
          <div class="popup-city">📍 ${city}</div>
          <div class="popup-guests">
            <strong>${guests}</strong> ${guestWord} travelling from here
          </div>
          <a class="popup-link" href="${carpool_link}" target="_blank" rel="noopener">
            🚗 Join carpool
          </a>
        </div>
      `, { maxWidth: 240 });

      // ── Hover effects ───────────────────────────────────────
      circle.on('mouseover', function () {
        this.setStyle({ fillColor: FILL_H, weight: 3 });
        this.openPopup();
      });
      circle.on('mouseout', function () {
        this.setStyle({ fillColor: FILL, weight: 2 });
        this.closePopup();
      });
      circle.on('click', function () {
        this.openPopup();
      });

      clusterGroup.addLayer(circle);
    });

    map.addLayer(clusterGroup);

    // Update header badge
    const badge = document.getElementById('guest-count');
    if (badge) {
      badge.textContent = `${totalGuests} guests · ${cities.length} cities`;
    }
  })
  .catch(err => console.error('Could not load data.json:', err));

// ── Legend ────────────────────────────────────────────────────
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'legend');

  // Example circle sizes for 1 / 5 / 15 guests
  const sizes = [
    { label: '1 guest',    guests: 1  },
    { label: '5 guests',   guests: 5  },
    { label: '15 guests',  guests: 15 },
  ];

  let rows = sizes.map(({ label, guests }) => {
    const r  = guestRadius(guests);
    const px = Math.round(r * 2);
    return `
      <div class="legend-row">
        <span class="legend-circle"
              style="width:${px}px;height:${px}px;"></span>
        <span>${label}</span>
      </div>`;
  }).join('');

  div.innerHTML = `<h4>🎉 Wedding guests</h4>${rows}`;
  return div;
};

legend.addTo(map);
