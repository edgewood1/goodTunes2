import styled from "styled-components";

export const Container = styled.div`
  width: "50vw";
  order: "2";
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid black;
  border-radius: 5%;
  margin: 4%;
  padding: 3%;
  overflow: scroll;
`;

export const Names = styled.div`
  display: flex;
  flex-direction: column;

  flex-grow: 3;
`;
export const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const LargeFont = styled.div`
  font-size: 1.5em;
  padding: 2%;
`;

export const MedFont = styled.div`
  font-size: 1.25em;
  padding: 4%;
`;
