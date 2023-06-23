import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { auth } from "../firebase";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";

const Welcome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  auth.onAuthStateChanged((user) => {
    if (user) {
      const data = {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
      };
      dispatch(authActions.login(data));
    } else {
      dispatch(authActions.logout());
    }
  });

  const signoutHandler = () => {
    auth.signOut();
    navigate("/login");
    // dispatch(authActions.logout());
  };
  // useEffect(() => {
  //   if (!curUser) {
  //     navigate("/login");
  //   }
  // }, [curUser, navigate]);
  return (
    <Container>
      <Actions>
        <Search>
          <img src="/public/Images/linkedin.png" />
          <BiSearch
            size={"1.5rem"}
            style={{
              marginLeft: "1rem",
              backgroundColor: "#cccbcb",
              padding: "0.3rem",
              paddingRight: "0px",
              borderTopLeftRadius: "0.3rem",
              borderBottomLeftRadius: "0.3rem",
            }}
          />
          <input placeholder="Search" />
        </Search>
        <NavBar>
          <div>
            <img src="/public/Images/nav-home.svg" />
            <span>Home</span>
          </div>
          <div>
            <img src="/public/Images/nav-network.svg" />
            <span>My Network</span>
          </div>
          <div>
            <img src="/public/Images/nav-jobs.svg" />
            <span>Jobs</span>
          </div>
          <div>
            <img src="/public/Images/nav-messaging.svg" />
            <span>Messages</span>
          </div>
          <div>
            <img src="/public/Images/nav-notifications.svg" />
            <span>Notifications</span>
          </div>
          <User>
            <img src={user.photoUrl} style={{ borderRadius: "0.8rem" }} />
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              Me <AiFillCaretDown />
            </span>
            <Signout onClick={signoutHandler}>Sign out</Signout>
          </User>
        </NavBar>
      </Actions>
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Actions = styled.div`
  background-color: white;
  display: flex;
  justify-content: space-around;
  @media (min-width: 800px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
`;
const Content = styled.div`
  min-height: 100vh;
  max-width: 1200px;
  width: 100%;
  padding-top: 2.3rem;
  @media (max-width: 800px) {
    padding: 2.3rem 0 3.4rem 0;
  }
`;
const Search = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  padding: 0.2rem;
  width: 25%;

  @media (max-width: 800px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: auto;
  }
  img {
    padding-left: 1rem;
  }
  input {
    border: none;
    width: 100%;
    outline: none;
    height: 1.9rem;
    background-color: #cccbcb;
    padding: 0.1rem 1rem;
    padding-left: 0.2rem;
    border-radius: 0 0.3rem 0.3rem 0;
    @media (max-width: 800px) {
      width: 50%;
    }
  }
`;
const NavBar = styled.div`
  background-color: white;
  display: flex;
  gap: 2rem;
  justify-content: space-around;
  align-items: center;
  & > div {
    width: 4rem;
    font-family: sans-serif;
    font-size: 0.7rem;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > img {
      width: 1.5rem;
    }
  }
  @media (max-width: 800px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: 0.2rem;
    padding-top: 0.1rem;
    gap: 0;
  }
`;
const Signout = styled.div`
  background-color: white;
  padding: 0.3rem 0.5rem;
  color: red;
  border-radius: 0.5rem;
  position: absolute;
  top: 2.4rem;
  cursor: pointer;
  display: none;
  border: 1px solid black;
  @media (max-width: 800px) {
    position: absolute;
    top: -1.2rem;
  }
`;
const User = styled.div`
  width: 4rem;
  font-family: sans-serif;
  font-size: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  & > img {
    width: 1.5rem;
  }
  &:hover {
    ${Signout} {
      display: block;
    }
  }
`;

export default Welcome;
