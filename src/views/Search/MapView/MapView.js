import React from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import Spinner from "../../../components/UI/Spinner/Spinner";

import "./MapView.scss";

const MapView = ({ userLocation, locationError, coffeeShops }) => {
  const userMarker = new Icon({
    iconUrl: "/user-marker.svg",
    iconSize: [35, 35],
  });

  if (!coffeeShops) {
    return <Spinner />;
  }

  const onMouseOverMarker = (e) => {
    e.target.openPopup();
  };

  const onMouseOutMarker = (e) => {
    e.target.closePopup();
  };

  return locationError ? (
    <div>{locationError}</div>
  ) : (
    <Map
      center={[userLocation.lat, userLocation.long]}
      zoom="13"
      className="mapview"
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        onMouseOver={onMouseOverMarker}
        onMouseOut={onMouseOutMarker}
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
            onMouseOver={onMouseOverMarker}
            onMouseOut={onMouseOutMarker}
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
