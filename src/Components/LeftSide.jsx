import styled from "styled-components";
import { useSelector } from "react-redux";

const LeftSide = () => {
  const name = useSelector((state) => state.auth.name);

  return (
    <Container>
      <Card></Card>
      <img src="/public/Images/user.svg" />
      <div>
        <Greet>
          <b>Welcome, {name}</b>
        </Greet>
        <div style={{ color: "#0a66c2", fontSize: "small" }}>Add a photo</div>
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "rgba(0,0,0,0.4)",
          margin: "0.5rem 0",
        }}
      />
      <Activity>
        <div>Who has viewed your profile</div>
        <b>78</b>
      </Activity>
      <Activity>
        <div>Impressions of your post</div>
        <b>815</b>
      </Activity>
    </Container>
  );
};

const Card = styled.div`
  width: 100%;
  border-radius: 0.5rem 0.5rem 0 0;
  background-image: url("/public/Images/card-bg.svg");
  height: 3rem;
`;
const Greet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: large;
  font-family: Arial, Helvetica, sans-serif;
`;
const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 10rem;
  min-width: 14rem;
  width: 100%;
  padding-bottom: 1rem;
  & > div {
    text-align: center;
  }
  & > img {
    width: 4rem;

    margin: auto;
    margin-top: 3px;
    border-radius: 50%;
  }
`;
const Activity = styled.div`
  margin: 0.3rem 0;
  display: flex;
  font-size: smaller;
  font-family: sans-serif;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  & > b {
    color: #0a66c2;
    text-decoration: underline;
  }
`;

export default LeftSide;
