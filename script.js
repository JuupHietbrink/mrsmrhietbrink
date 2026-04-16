/* Mrs. & Mr. Hietbrink — Wedding Guest Map */

(function () {
  'use strict';

  // ── Data ──────────────────────────────────────────────────
  var CITIES = [
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
    { city: 'Nijmegen',   lat: 51.8426, lng: 5.8546,  guests: 4,  carpool_link: 'https://example.com/carpool/nijmegen'   }
  ];

  // ── Helpers ───────────────────────────────────────────────
  var FILL   = 'rgba(180, 80, 80, 0.35)';
  var STROKE = 'rgba(180, 80, 80, 0.85)';
  var FILL_H = 'rgba(180, 80, 80, 0.60)';

  function guestRadius(n) { return Math.sqrt(n) * 5; }

  // ── Map ───────────────────────────────────────────────────
  var map = L.map('map').setView([52.3, 5.3], 8);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
  }).addTo(map);

  // Force Leaflet to pick up the container size
  setTimeout(function () { map.invalidateSize(); }, 200);

  // ── Cluster group ─────────────────────────────────────────
  var clusterGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 60,
    iconCreateFunction: function (cluster) {
      return L.divIcon({
        html: '<div class="cluster-icon">' + cluster.getChildCount() + '</div>',
        className: '',
        iconSize: [40, 40]
      });
    }
  });

  // ── Markers ───────────────────────────────────────────────
  var totalGuests = 0;

  CITIES.forEach(function (d) {
    totalGuests += d.guests;

    var circle = L.circleMarker([d.lat, d.lng], {
      radius: guestRadius(d.guests),
      fillColor: FILL,
      color: STROKE,
      weight: 2,
      fillOpacity: 1
    });

    var word = d.guests === 1 ? 'gast' : 'gasten';
    circle.bindPopup(
      '<div class="popup-inner">' +
        '<div class="popup-city">\ud83d\udccd ' + d.city + '</div>' +
        '<div class="popup-guests"><strong>' + d.guests + '</strong> ' + word + ' reizen vanuit hier</div>' +
        '<a class="popup-link" href="' + d.carpool_link + '" target="_blank" rel="noopener">\ud83d\ude97 Deelnemen aan carpool</a>' +
      '</div>',
      { maxWidth: 240 }
    );

    circle.on('mouseover', function () {
      this.setStyle({ fillColor: FILL_H, weight: 3 });
      this.openPopup();
    });
    circle.on('mouseout', function () {
      this.setStyle({ fillColor: FILL, weight: 2 });
      this.closePopup();
    });
    circle.on('click', function () { this.openPopup(); });

    clusterGroup.addLayer(circle);
  });

  map.addLayer(clusterGroup);

  // ── Header badge ──────────────────────────────────────────
  var badge = document.getElementById('guest-count');
  if (badge) {
    badge.textContent = totalGuests + ' gasten \u00b7 ' + CITIES.length + ' steden';
  }

  // ── Legend ────────────────────────────────────────────────
  var legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    var div = L.DomUtil.create('div', 'legend');
    var sizes = [
      { label: '1 gast',    g: 1  },
      { label: '5 gasten',  g: 5  },
      { label: '15 gasten', g: 15 }
    ];
    var html = '<h4>\ud83c\udf89 Bruiloftsgasten</h4>';
    sizes.forEach(function (s) {
      var px = Math.round(guestRadius(s.g) * 2);
      html += '<div class="legend-row">' +
        '<span class="legend-circle" style="width:' + px + 'px;height:' + px + 'px;"></span>' +
        '<span>' + s.label + '</span></div>';
    });
    div.innerHTML = html;
    return div;
  };
  legend.addTo(map);

})();
