import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapPin } from 'lucide-react';

// Fix Leaflet's default icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const OUTREACH_CENTERS = [
  {
    id: 'hq',
    name: 'Kaduna HQ Campus',
    type: 'Main Operations & Orphanage',
    coordinates: [10.5186, 7.4208] as [number, number],
    address: 'Kakuri Road, Kaduna State',
    phone: '+234 803 123 4567'
  },
  {
    id: 'zaria',
    name: 'Zaria Educational Branch',
    type: 'Primary Hifz Center',
    coordinates: [11.0855, 7.7199] as [number, number],
    address: 'Kongo Layout, Zaria',
    phone: '+234 812 987 6543'
  },
  {
    id: 'kafanchan',
    name: 'Kafanchan Aid Center',
    type: 'Food Distribution & Skills Training',
    coordinates: [9.5833, 8.2917] as [number, number],
    address: 'Market Road, Kafanchan',
    phone: '+234 905 555 1234'
  }
];

// Helper to update map view when selecting a location
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  map.flyTo(center, 13, { duration: 1.5 });
  return null;
}

export function OutreachMap() {
  const [activeCenter, setActiveCenter] = useState(OUTREACH_CENTERS[0]);

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
        <MapPin className="w-5 h-5 text-emerald-700" />
        <div>
          <h3 className="font-display font-bold text-base text-slate-800">Our Outreach Centers</h3>
          <p className="text-[11px] text-slate-400">Locate our branches across Kaduna state.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 flex flex-col gap-3">
          {OUTREACH_CENTERS.map((center) => (
            <button
              key={center.id}
              onClick={() => setActiveCenter(center)}
              className={`text-left p-3 rounded-xl border transition-all ${
                activeCenter.id === center.id
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
              }`}
            >
              <h4 className="font-bold text-sm text-slate-800">{center.name}</h4>
              <p className="text-[10px] text-emerald-700 uppercase tracking-wider font-semibold mt-0.5">{center.type}</p>
              <p className="text-xs text-slate-500 mt-1">{center.address}</p>
            </button>
          ))}
        </div>

        <div className="md:w-2/3 h-[300px] md:h-auto min-h-[300px] rounded-2xl overflow-hidden border border-slate-200 relative z-0">
          <MapContainer center={activeCenter.coordinates} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapUpdater center={activeCenter.coordinates} />
            {OUTREACH_CENTERS.map((center) => (
              <Marker key={center.id} position={center.coordinates}>
                <Popup>
                  <div className="text-center font-sans">
                    <h5 className="font-bold text-sm text-slate-800">{center.name}</h5>
                    <p className="text-xs text-slate-500 mt-1">{center.address}</p>
                    <p className="text-xs font-semibold text-emerald-700 mt-1">{center.phone}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
