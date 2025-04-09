// pages/businesses/market-map.tsx
import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Farmer {
  id: string;
  name: string;
  produce: string;
  price: number;
  latitude: number;
  longitude: number;
}

const mockFarmers: Farmer[] = [
  {
    id: '1',
    name: 'Farmer John',
    produce: 'Tomatoes',
    price: 120,
    latitude: -1.286389,
    longitude: 36.817223,
  },
  {
    id: '2',
    name: 'Mama Mboga',
    produce: 'Kale',
    price: 50,
    latitude: -1.28333,
    longitude: 36.81667,
  },
];

const MarketMap: React.FC = () => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    const initializeMap = () => {
      const mapInstance = new mapboxgl.Map({
        container: 'market-map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [36.817223, -1.286389],
        zoom: 12,
      });

      mockFarmers.forEach((farmer) => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3>${farmer.name}</h3><p>${farmer.produce} @ Ksh ${farmer.price}</p><a href="/farmers/${farmer.id}" style="color:blue;">View Profile</a>`
        );

        new mapboxgl.Marker()
          .setLngLat([farmer.longitude, farmer.latitude])
          .setPopup(popup)
          .addTo(mapInstance);
      });

      setMap(mapInstance);
    };

    if (!map) initializeMap();
  }, [map]);

  return (
    <div style={{ height: '90vh', width: '100%' }}>
      <h1 style={{ padding: '1rem', textAlign: 'center' }}>Live Market Survey Map</h1>
      <div id="market-map" style={{ height: '80vh' }} />
    </div>
  );
};

export default MarketMap;
