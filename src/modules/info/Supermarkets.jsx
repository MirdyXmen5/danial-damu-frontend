import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import api from '../../api/axios';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const DEFAULT_CENTER = [42.925047, 71.364237];
const MAP_ZOOM = 12;

const Supermarkets = () => {
  const { t } = useTranslation();
  const [shops, setShops] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const { data } = await api.get('/shops/');
        setShops(data);
      } catch (err) {
        setError('Unable to load store locations.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);

  const mapCenter = useMemo(() => {
    if (!shops.length) {
      return DEFAULT_CENTER;
    }

    const total = shops.reduce(
      (acc, shop) => ({
        latitude: acc.latitude + Number(shop.latitude),
        longitude: acc.longitude + Number(shop.longitude),
      }),
      { latitude: 0, longitude: 0 },
    );

    return [total.latitude / shops.length, total.longitude / shops.length];
  }, [shops]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[#FFC107] [-webkit-text-stroke:1px_#C2282A] mb-8">
        {t('supermarkets.title')}
      </h1>
      <div className="max-w-3xl space-y-6 text-brand-text-secondary text-lg mb-10">
        <p>{t('advantages.card2.desc')}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-h-[420px] overflow-hidden rounded-lg border border-black/10 shadow-sm">
          <MapContainer
            center={mapCenter}
            zoom={MAP_ZOOM}
            scrollWheelZoom={false}
            className="h-[420px] w-full md:h-[520px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {shops.map((shop) => (
              <Marker
                key={`${shop.name}-${shop.latitude}-${shop.longitude}`}
                position={[Number(shop.latitude), Number(shop.longitude)]}
              >
                <Popup>
                  <div className="space-y-1">
                    <strong className="block text-sm">{shop.name}</strong>
                    <span className="block text-xs text-gray-600">{shop.address}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <aside className="rounded-lg border border-black/10 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-brand-text-primary">
            {t('supermarkets.title')}
          </h2>

          {isLoading && (
            <p className="text-sm text-brand-text-secondary">Loading store locations...</p>
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {!isLoading && !error && (
            <ul className="space-y-4">
              {shops.map((shop) => (
                <li key={shop.name} className="border-b border-black/10 pb-3 last:border-b-0 last:pb-0">
                  <p className="font-semibold text-brand-text-primary">{shop.name}</p>
                  <p className="text-sm text-brand-text-secondary">{shop.address}</p>
                  <p className="mt-1 text-xs text-brand-text-secondary">
                    {shop.latitude}, {shop.longitude}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </motion.div>
  );
};

export default Supermarkets;
