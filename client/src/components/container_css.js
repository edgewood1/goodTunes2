import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 65vh;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
    justify-content: space-evenly;
    overflow: none;
  }
`;

export const Col1 = styled.div`
  order: 1;
  margin: 5% 0 5% 2%;
  border-radius: 5%;
  border: 1px solid yellow;
  width: 40%;

  @media only screen and (max-width: 400px) {
    margin: 0;
    order: 1;
    width: 100%;
  }
`;

export const Col2 = styled.div`
  order: 2;
  width: 40%;
  margin: 5% 2% 5% 0;
  border-radius: 5%;
  overflow: scroll;
  border: 1px solid yellow;
  @media only screen and (max-width: 400px) {
    order: 2;
    width: 100%;
    // margin: 0;
  }
`;
