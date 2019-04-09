import React from "react";
import styled from "styled-components";

const Foot = styled.div`
  padding: 5vh;
  @media only screen and (min-width: 800px) {
    padding: 5px;
  }
`;

const Footer = () => {
  return <Foot />;
};

export default Footer;
