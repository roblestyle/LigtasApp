"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "../../../api/axios";

const LeafletMap = () => {
  const [locations, setLocations] = useState([]);

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

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/location-data");
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
    >
      <TileLayer url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
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
