import "./utility.css";
import { Routes, Route } from "react-router-dom";
import { HomePage, MockAPI } from "pages";
import { Footer, Navigation } from "components";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mockman" element={<MockAPI />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
