import GeoPath from "./GeoPath";
import { useMapData } from "../hooks/useMapData";
import { useCallback, useState } from "react";

const Map = () => {
  const AllData = useMapData();
  const { map, data } = AllData;
  const [tooltipData, setTooltipData] = useState(null);

  const handleMouseOver = useCallback((event, d) => {
    // console.log(event.pageX);
    // console.log(d);
    setTooltipData(d);
  }, []);

  const handleMouseOut = useCallback(() => {
    setTooltipData(null);
  }, []);

  if (!map || !data) {
    return <pre>Loading...</pre>;
  }
  return (
    <>
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
            left: tooltipData.lat + 10,
            top: tooltipData.long + 10,
            // left: 20,
            // top: 20,
          }}
        >
          {tooltipData.name}
        </div>
      )}
    </>
  );
};

export default Map;
