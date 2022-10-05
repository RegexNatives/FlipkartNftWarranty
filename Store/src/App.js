import logo from "./logo.svg";
import "./App.css";
import Navigation from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/BasicContext";
import Navbar from "./component/Navbar";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Navigation />
        </BrowserRouter>
      </ContextProvider>
  );
}

export default App;
