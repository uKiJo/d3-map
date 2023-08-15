import React, { useState } from "react";
import { geoPath, geoEquirectangular, geoGraticule, geoCentroid } from "d3-geo";
import "./style.css";
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";

const GeoPath = ({ map, data }) => {
  console.log("RERENDER!");
  const [showTooltip, setShowTooltip] = useState(false);
  const { countries, interiors } = map;
  const projection = geoEquirectangular();
  const path = geoPath(projection);
  const graticule = geoGraticule();
  const radiusValue = (d) => +d.mass;
  const sizeScale = scaleSqrt([0, max(data, radiusValue)], [1, 15]);
  // countries.features.forEach((d) => {
  //   d.properties.projected = projection(geoCentroid(d));
  // });

  // console.log("countries", countries);
  // console.log("landing data", data);
  return (
    <g>
      <path className="sphere" d={path({ type: "Sphere" })} />
      <path className="graticules" d={path(graticule())} />
      {countries.features.map((feature) => {
        return <path fill="#0C164F" d={path(feature)} />;
      })}

      <path className="interiors" d={path(interiors)} />
      {data.map((d) => {
        // console.log(d);
        const [lat, long] = projection([d.reclong, d.reclat]);
        // console.log(sizeScale(radiusValue(d)));
        return (
          <>
            <circle
              onMouseOver={() => {
                console.log(d.name);
              }}
              className="landing-circle"
              fill="#28d8da"
              r={sizeScale(radiusValue(d))}
              cx={lat}
              cy={long}
            />
          </>
        );
      })}
    </g>
  );
};

// <text x={lat} y={long} className="text">
//   {d.mass}
// </text>

export default GeoPath;
