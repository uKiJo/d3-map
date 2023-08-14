import "./App.css";
import GeoPath from "./components/GeoPath";
import { useMapData } from "./hooks/useMapData";

function App() {
  const data = useMapData();

  if (!data) {
    return <pre>Loading...</pre>;
  }
  return (
    <svg width={1920} height={1080}>
      <GeoPath data={data} />
    </svg>
  );
}

export default App;
