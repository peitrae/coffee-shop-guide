import React, { useEffect, useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import Spinner from "../../../components/UI/Spinner/Spinner";

import "./MapView.scss";

const MapView = ({ coffeeShops }) => {
  const [config, setConfig] = useState({
    lat: -7.983,
    long: 112.621,
    zoom: 13,
  });

  const [error, setError] = useState(null);

  const userMarker = new Icon({
    iconUrl: "/user-marker.svg",
    iconSize: [35, 35],
  });

  const getLocation = (location) => {
    setConfig({
      ...config,
      lat: location.coords.latitude,
      long: location.coords.longitude,
    });
  };

  const getLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("Geolocation is disabled");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred");
        break;
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getLocation, getLocationError);
    }
  }, []);

  if (!coffeeShops) {
    return <Spinner />;
  }

  const onMouseOverMarker = (e) => {
    e.target.openPopup();
  };

  const onMouseOutMarker = (e) => {
    e.target.closePopup();
  };

  return error ? (
    <div>{error}</div>
  ) : (
    <Map
      center={[config.lat, config.long]}
      zoom={config.zoom}
      className="mapview"
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        onMouseOver={onMouseOverMarker}
        onMouseOut={onMouseOutMarker}
        position={[config.lat, config.long]}
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
