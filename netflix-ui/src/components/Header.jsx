import React from 'react'
import logo from '../assets/logo.png'
import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function Header(props) {
  const navigate=useNavigate();
  return (
    <Container className='flex a-center j-between'>
      <div className="logo">
      <img src={logo} alt="" />
      </div>
      <button onClick={()=>navigate(props.login? "/login":"/signup")}>
        {props.login? "Login": "Sign In"}
      </button>
    </Container>
  )
}

const Container= styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo img {
    width: 15vw;
    max-width: 150px;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    background-color: #e50914;
    color: white;
    font-weight: bold;
    font-size: 1rem;
    transition: all 0.3s ease;
    min-width: 100px;

    &:hover {
      background-color: #d40813;
    }

    @media (max-width: 768px) {
      font-size: 0.9rem;
      padding: 0.4rem 0.8rem;
      min-width: 90px;
    }

    @media (max-width: 674px) {
      font-size: 0.85rem;
      padding: 0.35rem 0.7rem;
      min-width: 80px;
    }

    @media (max-width: 480px) {
      font-size: 0.8rem;
      padding: 0.3rem 0.6rem;
      min-width: 70px;
    }
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
  }

  @media (max-width: 674px) {
    padding: 0.5rem 1rem;
    
    .logo img {
      width: 20vw;
      max-width: 100px;
    }
  }

  @media (max-width: 480px) {
    padding: 0.5rem;

    .logo img {
      width: 30vw;
      max-width: 80px;
    }
  }
`;
export default Header