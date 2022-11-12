import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeComponent from "./home";
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Routes>

            <Route index path="/*" element={<HomeComponent/>}/>

          </Routes>
        </div>
      </BrowserRouter>

  );
}

export default App;
