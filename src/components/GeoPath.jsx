import React from "react";
import { geoPath, geoEquirectangular, geoGraticule, geoCentroid } from "d3-geo";
import "./style.css";
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";

const GeoPath = ({ data }) => {
  const { countries, interiors } = data;
  const projection = geoEquirectangular();
  const path = geoPath(projection);
  const graticule = geoGraticule();
  const radiusValue = (d) => d.properties["mass"];
  const sizeScale = scaleSqrt()
    .domain([0, max(countries.features, radiusValue)])
    .range(0, 33);
  countries.features.forEach((d) => {
    d.properties.projected = projection(geoCentroid(d));
  });

  console.log(countries);
  return (
    <g>
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticules" d={path(graticule())} />
      {countries.features.map((feature) => {
        return <path fill="#0C164F" d={path(feature)} />;
      })}
      {countries.features.map((d) => {
        return (
          <circle
            fill="#28d8da"
            r={10}
            cx={d.properties.projected[0]}
            cy={d.properties.projected[1]}
          />
        );
      })}
      <path className="interiors" d={path(interiors)} />
    </g>
  );
};

export default GeoPath;
