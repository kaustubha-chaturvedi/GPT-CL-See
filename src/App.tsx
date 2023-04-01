import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CoverLetter from "./pages/CoverLetter";
import HomePage from "./pages/HomePage";

function App() {
  const [profileId, setProfileId] = useState("");
  return (
    <>
      <Header profileId={profileId} setProfileId={setProfileId} />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage profileId={profileId} setProfileId={setProfileId} />
          }
        />
        <Route path="/cover-letter" element={<CoverLetter />} />
      </Routes>
    </>
  );
}

export default App;
