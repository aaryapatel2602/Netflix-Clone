import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaSearch, FaPowerOff, FaBars, FaTimes } from 'react-icons/fa';
import { firebaseAuth } from '../utils/firebas-config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

const Navbar = ({ isScrolled }) => {
  const navigate = useNavigate();
  const links = [
    { name: 'Home', link: '/' },
    { name: 'TV Shows', link: '/TVShows' },
    { name: 'Movies', link: '/movies' },
    { name: 'My List', link: '/mylist' },
  ];
  const [email, setEmail] = useState(undefined);
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setEmail(currentUser.email);
      } else {
        navigate("/login");
      }
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [navigate]);

 

  return (
    <Container isScrolled={isScrolled}>
      <nav>
        <div className="left">
          <div className="brand">
            <img src={logo} alt="logo" />
          </div>
          <ul className={`links ${isMenuOpen ? 'open' : ''}`}>
            {links.map(({ name, link }) => (
              <li key={name}>
                <Link to={link}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right">
          <div className={`search ${showSearch ? 'show-search' : ''}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </Container>
  );
};

const Container = styled.div`
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4rem;
    transition: 0.3s ease-in-out;
    background-color: ${({ isScrolled }) => (isScrolled ? 'black' : 'transparent')};
    z-index: 2;

    .left {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex: 1;
      
      .brand {
        img {
          height: 4rem;
        }
      }

      .links {
        display: flex;
        list-style-type: none;
        gap: 2rem;

        li {
          a {
            color: white;
            text-decoration: none;
            font-size: 1rem;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }

    .right {
      display: flex;
      align-items: center;
      gap: 1rem;

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }

        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }

      .search {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.2rem 0.5rem;

        button {
          background-color: transparent;
        }

        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          background-color: transparent;
          border: none;
          color: white;
          transition: width 0.4s ease-in-out, opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
          &:focus {
            outline: none;
          }
        }

        &.show-search input {
          width: 150px;  // Adjust the width as needed
          opacity: 1;
          visibility: visible;
        }
      }

      .menu-toggle {
        display: none;
      }
    }
  }

  @media (max-width: 691px) {
    nav {
      padding: 0 1rem;
      flex-direction: column;
      height: auto;

      .left {
        .links {
          display: none;  // Hidden by default
          flex-direction: column;
          gap: 1rem;
          list-style-type: none;
          margin: 0;
          padding: 0;

          li {
            a {
              font-size: 1rem;
              padding: 0.5rem;
              display: block;
              text-align: center;
              color: white;
              background: #333;
              border-radius: 0.3rem;
              &:hover {
                background: #444;
              }
            }
          }
        }
      }

      .right {
        .search {
          display: none;
        }
        
        .menu-toggle {
          display: block;
          font-size: 1.5rem;
          color: #f34242;
        }
      }

      .links {
        display: none;
        position: absolute;
        top: 6.5rem; // Adjust based on the navbar height
        left: 0;
        width: 100%;
        background-color: black;
        padding: 1rem 0;
        z-index: 10;

        &.open {
          display: flex;
        }

        li {
          a {
            font-size: 1.2rem;
            padding: 1rem;
            display: block;
            text-align: center;
            color: white;
            &:hover {
              background: #444;
            }
          }
        }
      }
    }
  }
`;

export default Navbar;
