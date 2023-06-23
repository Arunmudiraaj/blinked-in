import styled from "styled-components";
import Login from "./pages/login";
import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<div>about</div>} />
          <Route path="settings" element={<div>settings</div>} />
        </Route>
      </Routes>
    </Container>
  );
}
const Container = styled.div``;
export default App;
