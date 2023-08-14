import "./App.css";
import GeoPath from "./components/GeoPath";
import { useGetData } from "./hooks/useGetData";

function App() {
  const data = useGetData();

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
