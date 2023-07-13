import logo from "./logo.svg";
import "./App.css";
import HomePage from "./page/HomePage/HomePage";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import LoginPage from "./page/LoginPage/LoginPage";
import Scanner from "./page/MobilePage/Scanner";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />

          {/* <Route path="/addresses/details/:id" element={<DetailPage />} /> */}
        </Route>
        <Route path="/scan/:id" element={<Scanner />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
