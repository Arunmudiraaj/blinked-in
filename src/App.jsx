import styled from "styled-components";
import Login from "./pages/login";
import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Protected from "./Components/Protected";
import UnderConstruction from "./pages/UnderConstruction";
function App() {
  return (
    <Container>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/" element={<Welcome />}>
            <Route path="/" element={<Home />} />
            <Route path=":name" element={<UnderConstruction />} />
            {/* <Route path="jobs" element={<UnderConstruction />} />
            <Route path="messages" element={<UnderConstruction />} />
            <Route path="notifications" element={<UnderConstruction />} /> */}
          </Route>
        </Route>
      </Routes>
    </Container>
  );
}
const Container = styled.div``;
export default App;
