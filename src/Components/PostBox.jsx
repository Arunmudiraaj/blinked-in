import { useSelector } from "react-redux";
import styled from "styled-components";

const PostBox = (props) => {
  const userImg = useSelector((state) => state.auth.photoUrl);
  return (
    <Container>
      <Top>
        <img src={userImg} />
        <div
          style={{ width: "100%" }}
          onClick={() => {
            props.show();
          }}
        >
          <input readOnly placeholder="Start a post" />
        </div>
      </Top>
      <Bottom>
        <span>Photo</span>
        <span>Video</span>
        <span>Event</span>
        <span>Write article</span>
      </Bottom>
    </Container>
  );
};
const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: calc(100%-1rem);
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > img {
    width: 3rem;
    border-radius: 50%;
  }
  & > div > input {
    font-weight: 700;
    width: calc(100% - 3rem);
    border: 1px solid black;
    padding: 0.3rem 1rem;
    outline: none;
    margin: 0 0.5rem;
    border-radius: 1rem;
  }
  input {
    cursor: pointer;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.3rem;
  font-weight: 600;
  color: #0a66c2;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export default PostBox;
