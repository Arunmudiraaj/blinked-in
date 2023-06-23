import styled from "styled-components";
import LeftSide from "../Components/LeftSide";
import MainFeed from "../Components/MainFeed";
import RightSide from "../Components/RightSide";

const Home = () => {
  return (
    <Container>
      <Left>
        <LeftSide />
      </Left>
      <Main>
        <MainFeed />
      </Main>
      <Right>
        <RightSide />
      </Right>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-areas: "left" "right" "main";
  @media (min-width: 800px) {
    grid-template-areas: "left main main main right";
  }
`;
const Left = styled.div`
  grid-area: left;
`;
const Main = styled.div`
  grid-area: main;
`;
const Right = styled.div`
  grid-area: right;
`;

export default Home;
