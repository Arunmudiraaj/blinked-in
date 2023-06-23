import styled from "styled-components";
import Footer from "../Components/Footer";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const signInHandler = async () => {
    try {
      await signInWithPopup(auth, googleAuth);

      // dispatch(authActions.login(user));
      navigate("/");
    } catch (err) {
      alert("Something went wrong");
    }
  };
  return (
    <>
      <Container>
        <Head>
          <img src="/public/Images/linkedin.png" height={"40rem"} alt="logo" />
          <div>
            <Join>Join Now</Join>
            <Signin>Sign in</Signin>
          </div>
        </Head>
        <Section>
          <h2>Welcome to your professional community</h2>
          <div>
            <img src="/public/Images/login-hero.svg" />
            <GoogleBtn onClick={signInHandler}>
              <img src="/public/Images/google.svg" />{" "}
              <span>Sign in with Google</span>
            </GoogleBtn>
          </div>
        </Section>
      </Container>
      <Footer />
    </>
  );
};
const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;
const Join = styled.button`
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 10%;
  font-size: medium;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.7);
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const Signin = styled.button`
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  border-color: #0a66c2;
  color: #0a66c2;
  border-radius: 1rem;

  font-size: medium;
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    text-decoration: none;
  }
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  height: 3rem;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;
const GoogleBtn = styled.button`
  color: rgba(0, 0, 0, 0.7);
  display: flex;
  font-size: large;
  width: 100%;
  max-width: 500px;
  width: calc(100% - (2 * 1rem));
  margin: 1rem;
  margin-top: 3rem;
  justify-content: center;
  align-items: center;
  padding: 0.9rem 1rem;
  border-radius: 1.7rem;
  border: 2px solid black;
  transition: 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  @media (max-width: 800px) {
    margin: auto;
  }
`;
const Section = styled.section`
  h2 {
    text-align: center;
    font-family: sans-serif;
    color: #0a66c2;
    @media (min-width: 800px) {
      text-align: left;

      font-size: 4rem;
    }
  }
  div {
    & > img {
      @media (min-width: 800px) {
        width: 65%;
      }
    }
    @media (min-width: 800px) {
      display: flex;
      flex-direction: row-reverse;
      justify-content: center;
      align-items: flex-start;
    }
  }
`;

export default Login;
