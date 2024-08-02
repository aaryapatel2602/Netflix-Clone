import {onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth"
import React, { useState } from 'react'
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {firebaseAuth} from "../utils/firebas-config"
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate=useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogIn=async()=>{
    try{

      const{email,password}=formValues
      await signInWithEmailAndPassword(firebaseAuth,email,password)

    }catch(err){
      console.log(err);
    }
  }

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form container flex-column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Log In</h3>
            </div>
            <div className="container flex column butt">

              <input type="email" placeholder='Email Address' name='email' 
                value={formValues.email} 
                onChange={(e)=>setFormValues({
                ...formValues,
                [e.target.name]:e.target.value
              })}/>
            
              <input type="password" placeholder='Password' name='password'
                value={formValues.password} 
                onChange={(e)=>setFormValues({
                ...formValues,
                [e.target.name]:e.target.value
              })} />
                    
              <button onClick={handleLogIn}>Log In</button>

            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

const Container= styled.div`
  position: relative;

.content {
  position: absolute;
  top: 0;
  left: 0;
  background-color:   
rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows:   
15vh 85vh;
}

.title {
  margin-bottom: 2rem;
  font-size: 1.5rem;
}

.text {
  font-size: 1.4rem;
  gap: 1rem;
  text-align: center;

  h1 {
    padding: 0 15rem;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgb(0, 0, 0, 0.5);
  border-radius: 1rem;
  padding: 4rem;

  input {
    padding: 0.5rem 1rem;
    border: 1px solid black;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;
    outline: none;
    color: black;
  }

  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    background-color: #e50914;
    color: white;
  }
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  background-color: #e50914;
  color: white;
}

/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .content {
    grid-template-rows: unset;
  }

  .form {
    padding: 2rem;
    width: 80%;
    margin: 0 auto;
  }
}
`;

export default Login

