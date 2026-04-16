/* Mrs. & Mr. Hietbrink — Wedding Guest Map */

(function () {
  'use strict';

  // ── Data ──────────────────────────────────────────────────
  var CITIES = [
    { city: 'Utrecht',          lat: 52.0907, lng: 5.1214, guests: 12, carpool_link: 'https://example.com/carpool/utrecht'          },
    { city: 'Houten',           lat: 52.0284, lng: 5.1688, guests: 10, carpool_link: 'https://example.com/carpool/houten'           },
    { city: 'Eindhoven',        lat: 51.4416, lng: 5.4697, guests:  9, carpool_link: 'https://example.com/carpool/eindhoven'        },
    { city: 'Tiel',             lat: 51.8833, lng: 5.4333, guests:  9, carpool_link: 'https://example.com/carpool/tiel'             },
    { city: 'Amsterdam',        lat: 52.3676, lng: 4.9041, guests:  8, carpool_link: 'https://example.com/carpool/amsterdam'        },
    { city: 'Rotterdam',        lat: 51.9244, lng: 4.4777, guests:  5, carpool_link: 'https://example.com/carpool/rotterdam'        },
    { city: 'Brummen',          lat: 52.0892, lng: 6.1567, guests:  5, carpool_link: 'https://example.com/carpool/brummen'          },
    { city: 'Eemnes',           lat: 52.2525, lng: 5.2615, guests:  4, carpool_link: 'https://example.com/carpool/eemnes'           },
    { city: "'s-Hertogenbosch", lat: 51.6978, lng: 5.3037, guests:  4, carpool_link: 'https://example.com/carpool/den-bosch'        },
    { city: 'Buren',            lat: 51.9117, lng: 5.3328, guests:  2, carpool_link: 'https://example.com/carpool/buren'            },
    { city: 'Den Haag',         lat: 52.0705, lng: 4.3007, guests:  2, carpool_link: 'https://example.com/carpool/den-haag'         },
    { city: 'Wageningen',       lat: 51.9692, lng: 5.6654, guests:  2, carpool_link: 'https://example.com/carpool/wageningen'       },
    { city: 'Nuenen',           lat: 51.4725, lng: 5.5492, guests:  2, carpool_link: 'https://example.com/carpool/nuenen'           },
    { city: 'Gouda',            lat: 52.0115, lng: 4.7104, guests:  2, carpool_link: 'https://example.com/carpool/gouda'            },
    { city: 'Zoelen',           lat: 51.9000, lng: 5.3833, guests:  2, carpool_link: 'https://example.com/carpool/zoelen'           },
    { city: 'Veenendaal',       lat: 52.0284, lng: 5.5584, guests:  2, carpool_link: 'https://example.com/carpool/veenendaal'       },
    { city: 'Hengelo',          lat: 52.2661, lng: 6.7927, guests:  2, carpool_link: 'https://example.com/carpool/hengelo'          },
    { city: 'Soest',            lat: 52.1738, lng: 5.2917, guests:  2, carpool_link: 'https://example.com/carpool/soest'            },
    { city: 'Warnsveld',        lat: 52.1500, lng: 6.2333, guests:  2, carpool_link: 'https://example.com/carpool/warnsveld'        },
    { city: 'Zwolle',           lat: 52.5168, lng: 6.0830, guests:  2, carpool_link: 'https://example.com/carpool/zwolle'           },
    { city: 'Haaren',           lat: 51.6017, lng: 5.2233, guests:  2, carpool_link: 'https://example.com/carpool/haaren'           },
    { city: 'Ophemert',         lat: 51.8500, lng: 5.3833, guests:  2, carpool_link: 'https://example.com/carpool/ophemert'         },
    { city: 'Bladel',           lat: 51.3700, lng: 5.2206, guests:  2, carpool_link: 'https://example.com/carpool/bladel'           },
    { city: 'Amersfoort',       lat: 52.1561, lng: 5.3878, guests:  2, carpool_link: 'https://example.com/carpool/amersfoort'       },
    { city: 'Delft',            lat: 52.0116, lng: 4.3571, guests:  1, carpool_link: 'https://example.com/carpool/delft'            },
    { city: 'Badhoevedorp',     lat: 52.3339, lng: 4.7831, guests:  1, carpool_link: 'https://example.com/carpool/badhoevedorp'     },
    { city: 'Nijmegen',         lat: 51.8426, lng: 5.8546, guests:  1, carpool_link: 'https://example.com/carpool/nijmegen'         },
    { city: 'Nieuwegein',       lat: 52.0286, lng: 5.0808, guests:  1, carpool_link: 'https://example.com/carpool/nieuwegein'       },
    { city: 'Borger',           lat: 52.9253, lng: 6.7933, guests:  1, carpool_link: 'https://example.com/carpool/borger'           },
    { city: 'Schagen',          lat: 52.7875, lng: 4.8042, guests:  1, carpool_link: 'https://example.com/carpool/schagen'          }
  ];

  // ── Helpers ───────────────────────────────────────────────
  var FILL   = 'rgba(180, 80, 80, 0.35)';
  var STROKE = 'rgba(180, 80, 80, 0.85)';
  var FILL_H = 'rgba(180, 80, 80, 0.60)';

  function guestRadius(n) { return Math.sqrt(n) * 5; }

  // ── Map ───────────────────────────────────────────────────
  var map = L.map('map').setView([52.3, 5.3], 8);

  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}@2x.png', {
    maxZoom: 19,
    subdomains: 'abcd',
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
