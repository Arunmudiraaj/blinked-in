import styled from "styled-components";

const Footer = () => {
  return (
    <Container>Copyright 2023 ©️ BlinkedIn - All Rights Reserved</Container>
  );
};
const Container = styled.div`
  text-align: center;
  width: 100%;

  margin-top: 1rem;
  padding: 0.5rem 0;
  color: white;
  background-color: #0a66c2;
`;

export default Footer;
