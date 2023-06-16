import styled from "styled-components";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Welcome />}>
          <Route path="/" element={<div></div>} />
          <Route path="about" element={<div>about</div>} />
          <Route path="settings" element={<div>settings</div>} />
        </Route>
      </Routes>
    </Container>
  );
}
const Container = styled.div``;
export default App;
