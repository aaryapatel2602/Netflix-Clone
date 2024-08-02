import React from 'react';
import background from '../assets/login.jpg';
import styled from 'styled-components';

export default function BackgroundImage() {
  return (
    <Container>
      <img src={background} alt="background" />
      <Content>
        
        <h1>Welcome</h1>
      
      </Content>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: hidden; // Ensures no scrollbars for overflowing content

  img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover; // Ensures image covers the entire area without distortion
    z-index: -1; // Keeps the image behind other content
  }
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  padding: 0 1rem; // Adjust padding as needed

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    @media (max-width: 600px) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.2rem;
    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }
`;
