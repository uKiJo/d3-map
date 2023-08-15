import "./App.css";
import GeoPath from "./components/GeoPath";
import { useMapData } from "./hooks/useMapData";

function App() {
  const AllData = useMapData();
  const { map, data } = AllData;
  if (!map || !data) {
    return <pre>Loading...</pre>;
  }
  return (
    <svg width={1920} height={1080}>
      <GeoPath map={map} data={data} />
    </svg>
  );
}

export default App;
