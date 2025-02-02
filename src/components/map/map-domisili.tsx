"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useState } from "react";

export interface MarkerPosition {
  lat: number;
  lng: number;
}

interface MapDomisiliProps {
  onMarkerDragEnd?: (position: MarkerPosition) => void;
}

const MapDomisili = ({ onMarkerDragEnd = () => {} }: MapDomisiliProps) => {
  const [markerPosition, setMarkerPosition] = useState<MarkerPosition>({
    lat: -6.265743984306413,
    lng: 106.93047096067491,
  });
  const [inputValue, setInputValue] = useState<string>("");

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const newPosition = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setMarkerPosition(newPosition);
      setInputValue(`${newPosition.lat}, ${newPosition.lng}`);
      onMarkerDragEnd(newPosition);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCariLokasi = () => {
    const [latStr, lngStr] = inputValue.split(",");
    if (latStr && lngStr) {
      const lat = parseFloat(latStr.trim());
      const lng = parseFloat(lngStr.trim());
      if (!isNaN(lat) && !isNaN(lng)) {
        const newPosition = { lat, lng };
        setMarkerPosition(newPosition);
      } else {
        alert("Please enter valid coordinates in the format: number, number.");
      }
    } else {
      alert("Please enter valid coordinates in the format: number, number.");
    }
  };

  return (
    <div className="w-full h-96 relative">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <Map
          defaultCenter={markerPosition}
          center={markerPosition}
          defaultZoom={13}
          gestureHandling={"greedy"}
          disableDefaultUI={false}
        />
        <Marker
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
        />
      </APIProvider>
      <div className="absolute bottom-4 left-4 bg-white p-4 shadow-lg rounded-lg w-2/3">
        <div className="flex flex-row gap-2">
          <Input
            type="text"
            placeholder="Latitude, Longitude"
            value={inputValue}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
          />
          <Button
            onClick={handleCariLokasi}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Cari Lokasi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapDomisili;
