import { json, csv } from "d3-fetch";
import { useEffect, useState } from "react";
import { feature, mesh } from "topojson-client";

const mapDataUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";
const dataUrl =
  "https://gist.githubusercontent.com/uKiJo/8655699e6f0a64c84d25ad652a9ca072/raw/8ed19eadc38db9a5606d3831c1c717d6b5358920/meteorite-landing.csv";

export const useMapData = () => {
  console.log("HOOK");
  const [map, setMap] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    console.log("EFFECT");
    Promise.all([
      csv(dataUrl, (d) => {
        return {
          ...d,
          mass: +d["mass (g)"],
        };
      }),
      json(mapDataUrl),
    ]).then(([data, topology]) => {
      if (topology) {
        const { countries } = topology.objects;
        // console.log("map", topology);
        // console.log("data", data);

        setMap({
          countries: feature(topology, countries),
          interiors: mesh(topology, countries, (a, b) => a != b),
        });
        setData(data);
      }
    });
  }, []);

  return {
    map,
    data,
  };
};
