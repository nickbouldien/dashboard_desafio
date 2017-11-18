import React from 'react';
import styled, { keyframes } from 'styled-components';
import spinnerImage from "../../public/images/load2.png";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Image = styled.img`
  animation: ${spin} 4s infinite linear;
  width: 10%;
  height: auto;
`;

const Spinner1 = () => <Image src={spinnerImage} alt="loading indicator" />;

export default Spinner1;
