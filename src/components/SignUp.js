import axios from "axios";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import AuthContext from "../Contexts/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const [formInfo, setFormInfo] = useState({ name: '', email: '', password: '' });
  function handleForm(e) {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/signUp`, ({ ...formInfo }));
     promise.then((response) => {
        navigate("/signin");
      })
      promise.catch((error) => {
        console.log(error.response);
        alert('Erro, tente novamente');
      });
  }
  return (<Container>
    <h1>MyWallet</h1>

    <Form onSubmit={handleSubmit}>
      <Input type="text"
        placeholder="Nome"
        name="name"
        onChange={handleForm}
        value={formInfo.nome}
        focus
        required
        data-test="name"
      />
      <Input type="email"
        placeholder="Email"
        name="email"
        onChange={handleForm}
        value={formInfo.email}
        focus
        required
        data-test="email"
      />
      <Input type="password"
        placeholder="Senha"
        name="password"
        onChange={handleForm}
        value={formInfo.password}
        required
        data-test="password"
      />
      <Button type="submit" data-test="sign-up-submit">Cadastrar</Button>
    </Form>
    <LoginLink onClick={() => navigate("/signin")} >
      Já tem uma conta? Entre agora!
    </LoginLink>
  </Container>)
}
const Container = styled.div`
  display: flex;
  height:100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  background: #A328D6;
  color: #ffffff;
`
const LoginLink = styled.div`
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