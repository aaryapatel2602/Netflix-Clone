import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import backgroundImage from '../assets/home.jpg';
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from '../store';
import Slider from '../components/Slider';

const Netflix = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} className="background-image" alt="Background" />
        <div className="container">
          <div className="logo">
            <img src={MovieLogo} alt="Movie Logo" />
          </div>
          <div className="buttons flex">
            <button className='flex j-center a-center' onClick={() => navigate('/player')}>
              <FaPlay /> Play
            </button>
            <button className='flex j-center a-center'>
              <AiOutlineInfoCircle /> More Info
            </button>
          </div>
        </div>
      </div>
      <Slider movies={movies} />
    </Container>
  );
};

const Container = styled.div`
  background-color: black;
  
  .hero {
    position: relative;

    .background-image {
      filter: brightness(60%);
      height: 100vh;
      width: 100vw;
      object-fit: cover; // Ensures the image covers the container without distortion
    }

    .container {
      position: absolute;
      bottom: 4rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center; // Centers the content horizontally

      .logo {
        img {
          width: 60%; // Adjust based on your preference
          max-width: 600px; // Prevents the logo from becoming too large
          height: auto;
        }
      }

      .buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 2rem 0;
        padding: 0 1rem;

        button {
          font-size: 1rem;
          gap: 1rem;
          border-radius: 0.5rem;
          padding: 0.5rem 2rem;
          cursor: pointer;
          border: none;
          transition: 0.3s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
          
          &:hover {
            opacity: 0.8;
          }

          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;

            svg {
              font-size: 1.5rem;
            }
          }

          svg {
            font-size: 1.4rem;
          }
        }
      }
    }
  }

  @media (max-width: 691px) {
    .hero {
      .background-image {
        height: 70vh; // Adjust height for smaller screens
      }

      .container {
        bottom: 2rem;

        .logo {
          img {
            width: 80%;
          }
        }

        .buttons {
          flex-direction: column;
          gap: 0.5rem;

          button {
            font-size: 0.9rem;
            padding: 0.5rem 1.5rem;
            
            svg {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    .hero {
      .background-image {
        height: 60vh; // Further adjustment for very small screens
      }

      .container {
        bottom: 1rem;

        .logo {
          img {
            width: 90%;
          }
        }

        .buttons {
          button {
            font-size: 0.8rem;
            padding: 0.5rem 1rem;

            svg {
              font-size: 1rem;
            }
          }
        }
      }
    }
  }
`;

export default Netflix;
