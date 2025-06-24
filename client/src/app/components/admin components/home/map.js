import { useEffect, useState, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "../../../api/axios";
import "/src/app/globals.css";
import AdminCard from "./admincard";

const LeafletMap = ({ adminToken }) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const [locations, setLocations] = useState([]);
  const [notifiedLocations, setNotifiedLocations] = useState(() => {
    const savedNotifiedLocations = localStorage.getItem("notifiedLocations");
    return new Set(
      savedNotifiedLocations ? JSON.parse(savedNotifiedLocations) : []
    );
  });
  const [filterCondition, setFilterCondition] = useState(null);
  const [dateFilter, setDateFilter] = useState({ start: null, end: null });
  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(13);

  const okIcon = new L.Icon({
    iconUrl: `${basePath}/ok.png`,
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const notOkIcon = new L.Icon({
    iconUrl: `${basePath}/notok.png`,
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const rescuedIcon = new L.Icon({
    iconUrl: `${basePath}/rescued.png`,
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    });

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "notifiedLocations",
      JSON.stringify([...notifiedLocations])
    );

    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }

    if (locations.length && mapRef.current) {
      const bounds = locations.map((location) => [
        parseFloat(location.latitude),
        parseFloat(location.longitude),
      ]);
      mapRef.current.fitBounds(bounds);
    }
  }, [locations, notifiedLocations]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/api/location-data", {
        headers: { Authorization: `Bearer ${adminToken}` },
      });

      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [adminToken]);

const handleSendHelp = useCallback(
  async (locationId) => {
    try {
      await axios.put(
        `/api/send-help/${locationId}`,
        {},
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      // Update the condition of the location in the state to show as "rescued"
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.id === locationId
            ? { ...location, condition: "is Rescued" }
            : location
        )
      );
      setNotifiedLocations((prev) => new Set(prev).add(locationId));
    } catch (error) {
      console.error("Error sending help:", error);
    }
  },
  [adminToken]
);



const handleRetractHelp = useCallback(
  async (locationId) => {
    try {
      await axios.put(
        `/api/retract-help/${locationId}`,
        {},
        {
          headers: { Authorization: `Bearer ${adminToken}` },
        }
      );
      // Update the condition of the location in the state to show as "rescued"
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.id === locationId
            ? { ...location, condition: "Needs Help" }
            : location
        )
      );
      setNotifiedLocations((prev) => new Set(prev).add(locationId));
    } catch (error) {
      console.error("Error sending help:", error);
    }
  },
  [adminToken]
);


  const handleDeleteMarker = useCallback(
    async (locationId) => {
      try {
        await axios.delete(`/api/delete-marker/${locationId}`, {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setLocations((prevLocations) =>
          prevLocations.filter((location) => location.id !== locationId)
        );
      } catch (error) {
        console.error("Error deleting marker:", error);
      }
    },
    [adminToken]
  );

  const okCount = locations.filter(
    (location) => location.condition.trim() === "is Safe"
  ).length;

  const notOkCount = locations.filter(
    (location) => location.condition.trim() === "Needs Help"
  ).length;

  const rescuedCount = locations.filter(
    (location) => location.condition.trim() === "is Rescued"
  ).length;

  const filteredLocations = locations.filter((location) => {
    const isConditionMatch = filterCondition
      ? location.condition.trim() === filterCondition
      : true;

    const isDateMatch =
      dateFilter.start && dateFilter.end
        ? new Date(location.createdAt) >= new Date(dateFilter.start) &&
          new Date(location.createdAt) <= new Date(dateFilter.end)
        : true;

    return isConditionMatch && isDateMatch;
  });

  return (
    <>
      <div className="my-4 hidden md:block">
        <AdminCard
          totalMarkers={locations.length}
          okCount={okCount}
          notOkCount={notOkCount}
          rescuedCount={rescuedCount}
          setFilterStatus={setFilterCondition}
          setDateFilter={setDateFilter}
        />
      </div>
      <MapContainer
        center={[13.75, 121.05]}
        zoom={zoom}
        style={{ height: "60vh", width: "100%" }}
        className="map-container"
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {filteredLocations.map((location) => (
          console.log(location),
          <Marker
            key={location.id}
            position={[
              parseFloat(location.latitude),
              parseFloat(location.longitude),
            ]}
            icon={
              location.condition.trim() === "is Safe"
                ? okIcon
                : location.condition.trim() === "is Rescued"
                ? rescuedIcon
                : notOkIcon
            }
          >
            <Popup>
              <div className="text-center popup-content">
                <img
                  src={`https://steerhub.batstateu.edu.ph/ligtas-app-backend/${location.image}`}
                  alt="No Image Sent"
                  className="w-full text-black mb-2 rounded-lg place-self-center"
                />
                <p className="text-black text-xs" style={{ color: "darkred" }}>
                  Location uploaded by {location.userName}
                </p>

                {
                  location.condition.trim() ==="Needs Help" && (
                    <p className="text-black text-xs" style={{ color: "darkred" }}>
                    Contact: {location.contactNumber}
                  </p>
                  )
                }
               
                <p className="text-black text-xs" style={{ color: "darkred" }}>
                  Email: {location.userEmail}
                </p>
                <p className="text-black text-xs" style={{ color: "darkred" }}>
                  Campus: {location.campus}
                </p>
                <p className="text-black text-xs" style={{ color: "darkred" }}>
                  Spartan {location.condition}
                </p>
                <p className="text-black text-xs" style={{ color: "darkred" }}>
                  {location.message ? location.message : "No message"}
                </p>

                {location.condition.trim() === "Needs Help" && (
                  <button
                    onClick={() => handleSendHelp(location.id)}
                    className={`${
                      notifiedLocations.has(location.id)
                        ? "bg-sky-800"
                        : "bg-sky-800 hover:bg-sky-800"
                    } text-white font-bold py-2 px-3 rounded mb-2`}
                    
                    >
                    Send Help
                  </button>
                )}

                
              {location.condition.trim() === "is Rescued" && (
                  <button
                    onClick={() => handleRetractHelp(location.id)}
                    className={`${
                      notifiedLocations.has(location.id)
                        ? "bg-gray-500"
                        : "bg-gray-500 hover:bg-gray-500"
                    } text-white font-bold py-2 px-3 rounded mb-2`}
                    >
                    Retract Help
                  </button>
                 )}

              {/* {notifiedLocations.has(location.id) && (
                  <button
                    onClick={() => handleRetractHelp(location.id)}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-3 rounded mb-2"
                  >
                    Retract Help
                  </button>
                )} */}


                <button
                  onClick={() => handleDeleteMarker(location.id)}
                  className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-2 ml-2"
                >
                  Delete Marker
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default LeafletMap;
