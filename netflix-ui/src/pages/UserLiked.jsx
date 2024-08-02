import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserLikedMovies } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebas-config';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

const UserLiked = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
      if (email) {
        dispatch(getUserLikedMovies(email)).then(() => setLoading(false));
      }
    }, [email, dispatch]);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    if (loading) {
      return <p>Loading...</p>;
    }

    return (
      <Container>
        <Navbar isScrolled={isScrolled}/>
        <div className="content flex column">
            <h1>My List</h1>
            <div className="grid flex">
                {movies && movies.length > 0 ? (
                  movies.map((movie, index) => (
                    <Card movieData={movie} index={index} key={movie.id || index} isLiked={true} />
                  ))
                ) : (
                  <p>No movies found</p>
                )}
            </div>
        </div>
      </Container>
    );
};

const Container=styled.div`
    .content{
      margin:2.3rem;
      margin-top: 8rem;
      gap: 3rem;
      h1{
        margin-left: 3rem;
      }
      .grid{
        flex-wrap: wrap;
        gap: 1rem;
      }
    }
`

export default UserLiked