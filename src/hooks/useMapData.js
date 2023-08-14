//
// import { feature, mesh } from "topojson-client";
//
// const url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
//
// export const useMapData = () => {
//   const [data, setData] = useState(null);
//
//   console.log(data);
//
//   useEffect(() => {
//     json(url).then((topology) => {
//       if (topology) {
//         const { countries } = topology.objects;
//
//         setData({
//           countries: feature(topology, countries),
//           interiors: mesh(topology, countries, (a, b) => a != b),
//         });
//       }
//     });
//   }, []);
//   return data;
// };

import { json } from "d3-fetch";
import { useEffect, useState } from "react";
import { feature, mesh } from "topojson-client";

const url = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useMapData = () => {
  const [data, setData] = useState(null);
  console.log(data);
  useEffect(() => {
    json(url).then((topology) => {
      if (topology) {
        const { countries } = topology.objects;
        console.log(topology);

        setData({
          countries: feature(topology, countries),
          interiors: mesh(topology, countries, (a, b) => a != b),
        });
      }
    });
  }, []);

  return data;
};
