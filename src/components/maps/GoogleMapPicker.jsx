import { GoogleMap, Marker } from "@react-google-maps/api";
export default function GoogleMapPicker({ position, setPosition }) {
  return (
    <GoogleMap
    key={`${position.lat}-${position.lng}`} 
      center={position}
      zoom={16}
      mapContainerClassName="map"
      onClick={(e) =>
        setPosition({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        })
      }
    >
      <Marker
        position={position}
        draggable
        onDragEnd={(e) =>
          setPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          })
        }
      />
    </GoogleMap>
  );
}
