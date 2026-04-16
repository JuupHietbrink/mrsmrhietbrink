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

// ── Guest data (inline – no server required) ────────────────
const CITIES = [
  { city: 'Amsterdam',  lat: 52.3676, lng: 4.9041,  guests: 14, carpool_link: 'https://example.com/carpool/amsterdam'  },
  { city: 'Rotterdam',  lat: 51.9244, lng: 4.4777,  guests: 9,  carpool_link: 'https://example.com/carpool/rotterdam'  },
  { city: 'Utrecht',    lat: 52.0907, lng: 5.1214,  guests: 11, carpool_link: 'https://example.com/carpool/utrecht'    },
  { city: 'Den Haag',   lat: 52.0705, lng: 4.3007,  guests: 7,  carpool_link: 'https://example.com/carpool/den-haag'   },
  { city: 'Eindhoven',  lat: 51.4416, lng: 5.4697,  guests: 6,  carpool_link: 'https://example.com/carpool/eindhoven'  },
  { city: 'Groningen',  lat: 53.2194, lng: 6.5665,  guests: 4,  carpool_link: 'https://example.com/carpool/groningen'  },
  { city: 'Maastricht', lat: 50.8514, lng: 5.6910,  guests: 5,  carpool_link: 'https://example.com/carpool/maastricht' },
  { city: 'Arnhem',     lat: 51.9851, lng: 5.8987,  guests: 8,  carpool_link: 'https://example.com/carpool/arnhem'     },
  { city: 'Breda',      lat: 51.5719, lng: 4.7683,  guests: 3,  carpool_link: 'https://example.com/carpool/breda'      },
  { city: 'Zwolle',     lat: 52.5168, lng: 6.0830,  guests: 5,  carpool_link: 'https://example.com/carpool/zwolle'     },
  { city: 'Haarlem',    lat: 52.3874, lng: 4.6462,  guests: 6,  carpool_link: 'https://example.com/carpool/haarlem'    },
  { city: 'Nijmegen',   lat: 51.8426, lng: 5.8546,  guests: 4,  carpool_link: 'https://example.com/carpool/nijmegen'   },
];

// ── Load data & render markers ────────────────────────────────
(function (cities) {
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
      const guestWord = guests === 1 ? 'gast' : 'gasten';
      circle.bindPopup(`
        <div class="popup-inner">
          <div class="popup-city">📍 ${city}</div>
          <div class="popup-guests">
            <strong>${guests}</strong> ${guestWord} reizen vanuit hier
          </div>
          <a class="popup-link" href="${carpool_link}" target="_blank" rel="noopener">
            🚗 Deelnemen aan carpool
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
      badge.textContent = `${totalGuests} gasten · ${cities.length} steden`;
    }
}(CITIES));

// ── Legend ────────────────────────────────────────────────────
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {
  const div = L.DomUtil.create('div', 'legend');

  // Example circle sizes for 1 / 5 / 15 guests
  const sizes = [
    { label: '1 gast',    guests: 1  },
    { label: '5 gasten',  guests: 5  },
    { label: '15 gasten', guests: 15 },
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

  div.innerHTML = `<h4>🎉 Bruiloftsgasten</h4>${rows}`;
  return div;
};

legend.addTo(map);
