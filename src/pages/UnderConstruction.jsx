import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
const UnderConstruction = () => {
  const { name } = useParams();
  return <Container> '{name}' Tab is under construction ⚠️🚧👷‍♂️</Container>;
};

const Container = styled.h2`
  /* background-color: transparent;
  font-size: larger;
  font-weight: 700; */
  /* height: 100%; */
  text-align: center;
  margin-top: 4rem;
`;

export default UnderConstruction;
