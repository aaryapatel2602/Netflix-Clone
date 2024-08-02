import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import React, { useState } from 'react'
import styled from "styled-components";
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import {firebaseAuth} from "../utils/firebas-config"
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword]=useState(false);
  const navigate=useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleSignIn=async()=>{
    try{

      const{email,password}=formValues
      await createUserWithEmailAndPassword(firebaseAuth,email,password)

    }catch(err){
      console.log(err);
    }
  }

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate("/")
  })

  return (
    <Container showPassword={showPassword}>
      <BackgroundImage />
      <div className="content">
        <Header login/>
        <div className="body flex column a-center j-center">
          <div className="text flex column">
            <h1>Unlimited Movies, TV Shows and more</h1>
            <h4>Watch anywhere. Cancel anytime</h4>
            <h6>
              Ready to watch? Enter your email to create or restart membership
            </h6>
          </div>
          <div className="form">
            <input type="email" placeholder='Email Address' name='email' 
            value={formValues.email} 
              onChange={(e)=>setFormValues({
              ...formValues,
              [e.target.name]:e.target.value
              })}/>
            {
              showPassword &&(
                <input type="password" placeholder='Password' name='password'
                value={formValues.password} 
                onChange={(e)=>setFormValues({
                ...formValues,
                [e.target.name]:e.target.value
                })} />
            )}
            
            {
              !showPassword && (
              <button onClick={()=>setShowPassword(true)}>Get Started</button>
            )}
            
          </div>
          <button onClick={handleSignIn}>Sign Up</button>
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
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 15vh 85vh;
}

.body {
  gap: 1rem;
}

.text   
{
  font-size: 1.4rem;
  gap: 1rem;
  text-align: center;

  h1 {
    padding: 0 15rem;
  }

  @media (max-width: 768px) {
    h1 {
      padding: 0 5rem;
    }
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 1rem;
  padding: 4rem;

  input {
    padding: 0.5rem 1rem;
    border: 1px solid black;
    border-radius: 0.3rem;
    cursor: pointer;
    font-size: 1rem;

    &:focus {
      outline: none;
    }

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

@media (max-width: 768px) {
  .content {
    grid-template-rows: unset;
  }

  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .text,
  .form {
    width: 100%;
  }

  .text h1 {
    font-size: 1.2rem;
  }

  .form button {
    align-self: center;
  }
}
`;

export default Signup