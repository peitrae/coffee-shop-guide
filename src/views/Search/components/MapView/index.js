import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import Spinner from "../../../../components/UI/Spinner";

const MapView = ({ userLocation, coffeeShops }) => {
  const userMarker = new Icon({
    iconUrl: "/user-marker.svg",
    iconSize: [35, 35],
  });

  if (!coffeeShops) {
    return <Spinner />;
  }

  const handleMouseOverMarker = (e) => e.target.openPopup();

  const handleMouseOutMarker = (e) => e.target.closePopup();

  return userLocation.error ? (
    <div className="search__map">{userLocation.error}</div>
  ) : (
    <Map
      center={[userLocation.lat, userLocation.long]}
      zoom="13"
      className="search__map"
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        onMouseOver={handleMouseOverMarker}
        onMouseOut={handleMouseOutMarker}
        position={[userLocation.lat, userLocation.long]}
        icon={userMarker}
      >
        <Popup>You</Popup>
      </Marker>
      {coffeeShops.map(({ id, name, location }) => {
        if (!name || !location) {
          return null;
        }

        return (
          <Marker
            key={id}
            onMouseOver={handleMouseOverMarker}
            onMouseOut={handleMouseOutMarker}
            position={[location.lat, location.long]}
          >
            <Popup>{name}</Popup>
          </Marker>
        );
      })}
    </Map>
  );
};

export default MapView;
