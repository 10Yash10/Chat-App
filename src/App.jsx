import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Chat from "./pages/chat";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="*" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
