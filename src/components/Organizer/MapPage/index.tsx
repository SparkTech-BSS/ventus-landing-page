import { useCallback, useState, memo } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import styles from "./styles.module.scss";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = { lat: -8.906223, lng: 13.223104 };

export interface MapPageProps {}

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAu1-DL4TjyU7EOcdJrjp3jT810IyDOy2s",
  });
  //-8.906223, 13.223104
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState<any>(null);

  console.log(marker);

  const onLoad = useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <div style={{ width: "100%", height: "auto" }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={(event) => {
            setMarker({ lat: event.latLng?.lat(), lng: event.latLng?.lng() });
          }}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <Marker
            position={marker ? marker : center}
            options={{
              label: {
                text: "Local do Evento",
                className: `${styles["map-marker"]}`,
              },
            }}
          ></Marker>
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default memo(MapPage);
