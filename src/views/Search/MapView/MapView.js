import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import Spinner from "../../../components/UI/Spinner/Spinner";

import "./MapView.scss";

const MapView = ({ coffeeShops }) => {
  const [position] = useState({
    lat: -7.983,
    long: 112.621,
    zoom: 13,
  });

  // if (!coffeeShops) {
  //   return <Spinner />;
  // }

  if (true) {
    return <Spinner />;
  }

  const onMouseOverMarker = (e) => {
    e.target.openPopup();
  };

  const onMouseOutMarker = (e) => {
    e.target.closePopup();
  };

  return (
    <Map
      center={[position.lat, position.long]}
      zoom={position.zoom}
      className="mapview"
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
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
