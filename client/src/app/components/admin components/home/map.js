import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "../../../api/axios";
import "/src/app/globals.css";
import AdminCard from "./admincard";

const LeafletMap = ({ adminToken }) => {
  const [locations, setLocations] = useState([]);
  const [notifiedLocations, setNotifiedLocations] = useState(() => {
    const savedNotifiedLocations = localStorage.getItem("notifiedLocations");
    return savedNotifiedLocations
      ? new Set(JSON.parse(savedNotifiedLocations))
      : new Set();
  });
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
    // Save notifiedLocations to local storage whenever it changes
    localStorage.setItem(
      "notifiedLocations",
      JSON.stringify(Array.from(notifiedLocations))
    );

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
  }, [locations, notifiedLocations]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/location-data", {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      console.log("Fetched locations:", response.data);
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSendHelp = async (locationId) => {
    try {
      const response = await axios.post(
        `/api/send-help/${locationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );
      console.log("Notification sent successfully:", response.data);
      setNotifiedLocations((prev) => new Set(prev).add(locationId));
    } catch (error) {
      console.error("Error sending help:", error);
    }
  };

  const handleDeleteMarker = async (locationId) => {
    try {
      const response = await axios.delete(`/api/delete-marker/${locationId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      console.log("Marker deleted successfully:", response.data);
      // Remove the deleted marker from locations state
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location.id !== locationId)
      );
    } catch (error) {
      console.error("Error deleting marker:", error);
    }
  };

  return (
    <>
      <div className="my-4">
        <AdminCard totalMarkers={locations.length} />
      </div>
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
              <div className="text-center">
                <img
                  src={`http://localhost:5000${location.image}`}
                  alt="Popup Image"
                  className="w-full text-white mb-5 rounded-lg"
                />
                <p className="text-white">
                  Location uploaded by {location.userName}
                </p>
                <button
                  onClick={() => handleSendHelp(location.id)}
                  className={`${
                    notifiedLocations.has(location.id)
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-700 hover:bg-red-800"
                  } text-white font-bold py-2 px-4 rounded mt-3`}
                  disabled={notifiedLocations.has(location.id)}
                >
                  {notifiedLocations.has(location.id)
                    ? "Help sent"
                    : "Send Help"}
                </button>
                {notifiedLocations.has(location.id) && (
                  <button
                    onClick={() => handleDeleteMarker(location.id)}
                    className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-3 ml-3"
                  >
                    Delete Marker
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
