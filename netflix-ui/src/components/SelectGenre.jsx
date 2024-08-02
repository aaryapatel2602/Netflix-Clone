import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { fetchDataByGenre } from '../store';

const SelectGenre = ({ genres, type }) => {
    const dispatch= useDispatch()
  return (
    <Container>
      <Select className='flex' onChange={e=>{
        dispatch(fetchDataByGenre({genre:e.target.value,type}))
      }}>
        {genres.map((genre) => (
          <option value={genre.id} key={genre.id}>{genre.name}</option>
        ))}
      </Select>
    </Container>
  );
};

const Container = styled.div`
  margin: 1rem;
`;

const Select = styled.select`
  margin-left: 5rem;
  cursor: pointer;
  font-size: 1.3rem;
  background-color: rgba(0,0,0,0.4);
  color: white;
`;

export default SelectGenre;
