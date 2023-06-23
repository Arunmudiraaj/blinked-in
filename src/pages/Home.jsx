import styled, { css } from "styled-components";
import LeftSide from "../Components/LeftSide";
import MainFeed from "../Components/MainFeed";
import RightSide from "../Components/RightSide";
import { useState } from "react";
import { useEffect } from "react";

const Home = () => {
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 500; // Adjust this value as needed
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollTop > scrollThreshold) {
        setShowContent(true);
      } else {
        setShowContent(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <Container>
      <Left>
        <LeftSide />
        {showContent && (
          <Fixed show={showContent}>
            <LeftSide />
          </Fixed>
        )}
      </Left>
      <Main>
        <MainFeed />
      </Main>
      <Right>
        <RightSide />
        {showContent && (
          <Fixed show={showContent}>
            <RightSide />
          </Fixed>
        )}
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
const Fixed = styled.div`
  position: fixed;
  top: 5rem;
  @media (max-width: 800px) {
    display: none;
  }
`;

export default Home;
