import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeComponent from "./home";
import '@fortawesome/fontawesome-free/css/all.css';
import {LoginForm} from "./login";

function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Routes>

            <Route index element={<HomeComponent/>}/>
            <Route path="/login" element={<LoginForm/>}/>
          </Routes>
        </div>
      </BrowserRouter>

  );
}

export default App;
