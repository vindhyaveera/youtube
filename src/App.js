import "./App.css";
import Index from '../src/Routing/Index'
import BigVideos from "./Components/HomeComponents/BigVideos/BigVideos";
import UseRefExample from './Components/HomeComponents/UseRefExample/UseRefExample'
import Search from './Search'
import NavBar from '../src/Layouts/NavBar/NavBar'


function App() {
  return (
    <div className="App">
      {/* <Search/> */}
      <Index/>
      {/* <NavBar/> */}
      {/* <BigVideos /> */}
      {/* <UseRefExample/> */}
    </div>
  );
}

export default App;
