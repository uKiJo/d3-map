import { geoPath, geoEquirectangular, geoGraticule } from "d3-geo";
import { scaleSqrt } from "d3-scale";
import { max } from "d3-array";
import "./style.css";
import { memo, useEffect, useMemo, useRef } from "react";

const GeoPath = memo(({ map, data, onMouseOver, onMouseOut }) => {
  console.log("RERENDER!");
  const circleRef = useRef(null);
  const { countries, interiors } = map;
  const projection = useMemo(() => geoEquirectangular(), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const graticule = useMemo(() => geoGraticule(), []);
  const radiusValue = (d) => +d.mass;
  const sizeScale = useMemo(
    () => scaleSqrt([0, max(data, radiusValue)], [1, 15]),
    []
  );
  console.log("expensive");

  // console.log("countries", countries);
  // console.log("landing data", data);
  return (
    <svg width={1250} height={625}>
      <g transform="scale(1.3)">
        <path className="sphere" d={path({ type: "Sphere" })} />
        <path className="graticules" d={path(graticule())} />
        {countries.features.map((feature) => {
          return <path fill="#0C164F" d={path(feature)} />;
        })}

        <path className="interiors" d={path(interiors)} />
        {data.map((d) => {
          const [lat, long] = projection([d.reclong, d.reclat]);
          d = { ...d, lat, long };

          return (
            <circle
              ref={circleRef}
              key={d.id}
              onMouseOver={() => onMouseOver(d)}
              onMouseOut={onMouseOut}
              className="landing-circle"
              fill="#28d8da"
              stroke="#26ACAD"
              strokeWidth={0.5}
              r={sizeScale(radiusValue(d))}
              cx={lat}
              cy={long}
            />
          );
        })}
      </g>
    </svg>
  );
});

GeoPath.displayName = GeoPath;

export default GeoPath;
