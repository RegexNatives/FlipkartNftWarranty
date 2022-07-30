import logo from "./logo.svg";
import "./App.css";
import Navigation from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ContextProvider } from "./context/BasicContext";
import Navbar from "./component/Navbar";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
      {/* {window.location.pathname==="/"?null: */}
      
      <Navbar/>
      {/* } */}
        <Navigation />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
