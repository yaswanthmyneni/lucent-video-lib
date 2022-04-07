import "./utility.css";
import { useLocation } from "react-router-dom";
import { Footer, Navigation, Routing, Toast } from "components";

function App() {
  const location = useLocation();

  return (
    <>
      <Navigation />
      <Toast />
      <Routing />
      {location.pathname === "/" && <Footer />}
    </>
  );
}

export default App;
