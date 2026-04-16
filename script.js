/* Mrs. & Mr. Hietbrink — Wedding Guest Map */

function startRickRoll() {
  var overlay = document.getElementById('rickroll-overlay');
  var video = document.getElementById('rickroll-video');
  video.src = 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1';
  overlay.style.display = 'flex';
}

(function () {
  'use strict';

  // ── Data ──────────────────────────────────────────────────
  var CITIES = [
    { city: 'Utrecht',          lat: 52.0907, lng: 5.1214, guests: 12, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'          },
    { city: 'Houten',           lat: 52.0284, lng: 5.1688, guests: 10, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'           },
    { city: 'Eindhoven',        lat: 51.4416, lng: 5.4697, guests:  8, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'        },
    { city: 'Tiel',             lat: 51.8833, lng: 5.4333, guests:  9, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'             },
    { city: 'Amsterdam',        lat: 52.3676, lng: 4.9041, guests:  8, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'        },
    { city: 'Rotterdam',        lat: 51.9244, lng: 4.4777, guests:  5, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'        },
    { city: 'Brummen',          lat: 52.0892, lng: 6.1567, guests:  5, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'          },
    { city: 'Eemnes',           lat: 52.2525, lng: 5.2615, guests:  4, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'           },
    { city: "'s-Hertogenbosch", lat: 51.6978, lng: 5.3037, guests:  4, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'        },
    { city: 'Buren',            lat: 51.9117, lng: 5.3328, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'            },
    { city: 'Den Haag',         lat: 52.0705, lng: 4.3007, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'         },
    { city: 'Wageningen',       lat: 51.9692, lng: 5.6654, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'       },
    { city: 'Nuenen',           lat: 51.4725, lng: 5.5492, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'           },
    { city: 'Gouda',            lat: 52.0115, lng: 4.7104, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'            },
    { city: 'Zoelen',           lat: 51.9000, lng: 5.3833, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'           },
    { city: 'Veenendaal',       lat: 52.0284, lng: 5.5584, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'       },
    { city: 'Hengelo',          lat: 52.2661, lng: 6.7927, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'          },
    { city: 'Soest',            lat: 52.1738, lng: 5.2917, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'            },
    { city: 'Warnsveld',        lat: 52.1500, lng: 6.2333, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'        },
    { city: 'Zwolle',           lat: 52.5168, lng: 6.0830, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'           },
    { city: 'Haaren',           lat: 51.6017, lng: 5.2233, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'           },
    { city: 'Ophemert',         lat: 51.8500, lng: 5.3833, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'         },
    { city: 'Bladel',           lat: 51.3700, lng: 5.2206, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'           },
    { city: 'Amersfoort',       lat: 52.1561, lng: 5.3878, guests:  2, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'       },
    { city: 'Delft',            lat: 52.0116, lng: 4.3571, guests:  1, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'            },
    { city: 'Badhoevedorp',     lat: 52.3339, lng: 4.7831, guests:  1, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'     },
    { city: 'Nijmegen',         lat: 51.8426, lng: 5.8546, guests:  1, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'         },
    { city: 'Nieuwegein',       lat: 52.0286, lng: 5.0808, guests:  1, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'       },
    { city: 'Borger',           lat: 52.9253, lng: 6.7933, guests:  1, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'           },
    { city: 'Schagen',          lat: 52.7875, lng: 4.8042, guests:  1, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'          },
    { city: 'Istanbul',         lat: 41.0082, lng: 28.9784, guests:  1, carpool_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'         }
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
      var totalG = 0;
      cluster.getAllChildMarkers().forEach(function (m) {
        totalG += (m.options.guestCount || 0);
      });
      var size = Math.max(36, Math.min(60, 20 + Math.sqrt(totalG) * 8));
      return L.divIcon({
        html: '<div class="cluster-icon" style="width:' + size + 'px;height:' + size + 'px;">' + totalG + '</div>',
        className: '',
        iconSize: [size, size]
      });
    }
  });

  // ── Markers ───────────────────────────────────────────────
  var totalGuests = 0;

  CITIES.forEach(function (d) {
    totalGuests += d.guests;

    var size = Math.max(30, Math.min(54, 16 + Math.sqrt(d.guests) * 8));
    var marker = L.marker([d.lat, d.lng], {
      guestCount: d.guests,
      icon: L.divIcon({
        html: '<div class="guest-bubble" style="width:' + size + 'px;height:' + size + 'px;">' + d.guests + '</div>',
        className: '',
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2]
      })
    });

    var word = d.guests === 1 ? 'gast' : 'gasten';
    marker.bindPopup(
      '<div class="popup-inner">' +
        '<div class="popup-city">\ud83d\udccd ' + d.city + '</div>' +
        '<div class="popup-guests"><strong>' + d.guests + '</strong> ' + word + ' reizen vanuit hier</div>' +
        '<a class="popup-link" href="javascript:void(0)" onclick="startRickRoll()">\ud83d\ude97 Deelnemen aan carpool</a>' +
      '</div>',
      { maxWidth: 320 }
    );

    clusterGroup.addLayer(marker);
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
    div.innerHTML = '<h4>\ud83c\udf89 Bruiloftsgasten</h4>' +
      '<div class="legend-row"><span class="legend-circle" style="width:24px;height:24px;font-size:.7rem;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;">3</span><span>Gasten per stad</span></div>' +
      '<div class="legend-row"><span class="legend-circle" style="width:36px;height:36px;font-size:.7rem;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;background:rgba(180,80,80,.85);border-color:rgba(180,80,80,1);">12</span><span>Cluster (klik om te splitsen)</span></div>';
    return div;
  };
  legend.addTo(map);

})();
