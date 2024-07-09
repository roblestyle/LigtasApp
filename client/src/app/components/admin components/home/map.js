"use client";

import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "../../../api/axios";

const LeafletMap = () => {
  const [locations, setLocations] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    // Customizing default Leaflet marker icons
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    // Fetch location and image data
    fetchData();
  }, []);

  useEffect(() => {
    // Ensure map updates size after initial render
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }

    // Adjust map bounds to fit all markers
    if (locations.length && mapRef.current) {
      const bounds = locations.map((location) => [
        parseFloat(location.latitude),
        parseFloat(location.longitude),
      ]);
      mapRef.current.fitBounds(bounds);
    }
  }, [locations]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/location-data");
      console.log("Fetched locations:", response.data);
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <MapContainer
      center={[13.75, 121.05]}
      zoom={13}
      style={{ height: "480px", width: "100%" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[
            parseFloat(location.latitude),
            parseFloat(location.longitude),
          ]}
        >
          <Popup>
            <div>
              <img
                src={`http://localhost:5000${location.image}`}
                alt="Popup Image"
                style={{ width: "100%" }}
              />
              <p>Location uploaded by user {location.userId}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
