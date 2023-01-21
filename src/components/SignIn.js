import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {AuthContext} from "../Contexts/AuthContext";
import { useContext } from "react";

export const REACT_APP_API_URL = "http://localhost:5000";

export default function SignIn() {
  const { setJwt } = useContext(AuthContext);
  const navigate = useNavigate();  
  const [formInfo, setFormInfo] = useState({ email: '', password: '' });
  
  
  function handleForm(e) {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const promise = axios.post(`${REACT_APP_API_URL}/signIn`, ({ ...formInfo }))
    .then((res) => {
      setJwt(res.data.token);
      navigate("/");
    })
    .catch((error) => {
      console.log(error.res)
      alert('Erro, tente novamente');
    });
  }
  return (
    <Container>
      <h1>MyWallet</h1>

      <Form onSubmit={handleSubmit}>
        <Input type="email"
          placeholder="Email"
          name="email"
          onChange={handleForm}
          value={formInfo.email}
          focus
          required
        />

        <Input type="password"
          placeholder="Senha"
          name="password"
          onChange={handleForm}
          value={formInfo.password}
          focus
          required
        />

        <Button type="submit">Entrar</Button>
      </Form>
        <RegisterLink onClick={()=>navigate("/signup")}>
          Primeira vez? Cadastre-se!
        </RegisterLink>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:100%;
  height:667px;
  font-family: "Raleway", sans-serif;
  color: #ffffff;
  background-color: #8C11BE;
  h1{
      font-family: "Saira Stencil One", sans-serif;
      font-size: 32px;
      line-height: 50px;
  }
  a {
    text-decoration: none;
    color: #ffffff;
  }
`
const Form = styled.form`
  display:flex;   
  flex-direction: column;
  margin: 25px 0 25px;
 `
const Input = styled.input`
  width: 305px;
  height: 40px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;    
  margin-bottom: 13px;
  border-radius: 5px; 
  padding: 10px;
  border: none;     
  background-color: "#FFFFFF";
  color: #000000;
`
const Button = styled.button`
  width: 315px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;     
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  background:#A328D6;
  color: #ffffff;
`
const RegisterLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  line-height: 26px;
  text-align: center;
  font-size: 15px;
  line-height: 18px;
  font-style: bold;
  font-weight: 700;
`