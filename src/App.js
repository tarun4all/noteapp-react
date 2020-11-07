import './App.css';
import data from "./data/wikiData";
import Banner from "./components/Banner";
import Task2 from "./components/Task2";

function App() {
  console.log(data.length);
  return (
    <div>
      <Banner data={data} />
      <Task2 data={data} />
    </div>
  );
}

export default App;
