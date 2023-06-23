import styled from "styled-components";

const RightSide = () => {
  return (
    <>
      <Container>
        <Inner>
          <div>Groups</div>
          <Events>
            <span>Events</span>
            <img src="/public/Images/plus-icon.svg" />
          </Events>
          <div>Follow Hashtags</div>
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgba(0,0,0,0.4)",
              margin: "0.5rem 0",
            }}
          />
        </Inner>

        <Discover>Discover More</Discover>
      </Container>
    </>
  );
};
const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: space-around;
`;
const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  min-width: 12rem;
  width: calc(100%-1rem);
  padding: 1rem;
  & > {
    text-align: left;
  }
`;

const Events = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const Discover = styled.div`
  color: #0a66c2;
`;

export default RightSide;
