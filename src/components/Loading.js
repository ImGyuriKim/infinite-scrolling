import React from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
function Loading() {
  return (
    <Container>
      <Oval color="#ff0000" height={100} width={100} />
    </Container>
  );
}

export default Loading;
