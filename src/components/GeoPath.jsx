import React from "react";
import { geoPath, geoEquirectangular, geoGraticule } from "d3-geo";
import "./style.css";

const GeoPath = ({ data }) => {
  const projection = geoEquirectangular();
  const path = geoPath(projection);
  const graticule = geoGraticule();
  const { countries, interiors } = data;

  return (
    <g>
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticules" d={path(graticule())} />
      {countries.features.map((feature) => {
        return <path fill="#0C164F" d={path(feature)} />;
      })}
      <path className="interiors" d={path(interiors)} />
    </g>
  );
};

export default GeoPath;
