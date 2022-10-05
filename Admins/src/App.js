import logo from "./logo.svg";
import "./App.css";
import Navigation from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/BasicContext";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
      {/* {window.location.pathname==="/"?null: */}
      <Navbar/>
      <Sidebar />
      {/* } */}
        <Navigation />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
