import GeoPath from "./GeoPath";
import { useMapData } from "../hooks/useMapData";
import { useCallback, useState, useEffect } from "react";

const Map = () => {
  const AllData = useMapData();
  const { map, data } = AllData;
  const [tooltipData, setTooltipData] = useState(null);

  const handleMouseOver = useCallback((d) => {
    const toolTipPosition = {
      lat: d.lat,
      long: d.long,
      name: d.name,
    };

    setTooltipData(toolTipPosition);
  }, []);

  const handleMouseOut = useCallback(() => {
    setTooltipData(null);
  }, []);

  if (!map || !data) {
    return <pre>Loading...</pre>;
  }
  return (
    <div style={{ position: "relative" }}>
      <GeoPath
        map={map}
        data={data}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />

      {tooltipData && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "5px",
            borderRadius: "3px",
            fontSize: "12px",
            left: tooltipData.lat * 1.3 + 10,
            top: tooltipData.long * 1.3 + 10,
          }}
        >
          {tooltipData.name}
        </div>
      )}
    </div>
  );
};

export default Map;
