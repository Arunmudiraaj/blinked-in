import { Outlet, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { BiSearch } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { auth } from "../firebase";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import HomeImg from "../assets/Images/nav-home.svg";
import jobsImg from "../assets/Images/nav-jobs.svg";
import myNetwork from "../assets/Images/nav-network.svg";
import messagesImg from "../assets/Images/nav-messaging.svg";
import notificationImg from "../assets/Images/nav-notifications.svg";
import linkedinImg from "../assets/Images/linkedin.png";

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
          <img src={linkedinImg} />
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
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <div>
              <img src={HomeImg} />
              <span>Home</span>
            </div>
          </Link>
          <Link to={"/mynetwork"} style={{ textDecoration: "none" }}>
            <div>
              <img src={myNetwork} />
              <span>My Network</span>
            </div>
          </Link>
          <Link to={"/jobs"} style={{ textDecoration: "none" }}>
            <div>
              <img src={jobsImg} />
              <span>Jobs</span>
            </div>
          </Link>
          <Link to={"/messages"} style={{ textDecoration: "none" }}>
            <div>
              <img src={messagesImg} />
              <span>Messages</span>
            </div>
          </Link>
          <Link to={"notifications"} style={{ textDecoration: "none" }}>
            <div>
              <img src={notificationImg} />
              <span>Notifications</span>
            </div>
          </Link>
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

// const activeClassName = "active-link";

// const StyledNavLink = styled(NavLink)`
//   /* Define your styles for the NavLink */
//   color: black;
//   text-decoration: none;

//   /* Styles for the active link */
//   &.${activeClassName} {
//     font-weight: bold;
//     color: blue !important;
//     background-color: red;
//   }
// `;

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
  /* min-height: 100vh; */
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

  div {
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
  padding: 0.3rem 0.1rem;
  color: red;
  border-radius: 0.5rem;
  position: absolute;
  top: 2.4rem;
  text-align: center;
  cursor: pointer;
  display: none !important;
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
      display: block !important;
    }
  }
`;

export default Welcome;
