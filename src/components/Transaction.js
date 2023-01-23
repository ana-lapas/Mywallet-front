import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";

export default function Transactions(props) {
  const tipo = props;
  const { jwt, setJwt } = useContext(AuthContext);
  const navigate = useNavigate();
  const { type } = useParams();
  const [formInfo, setFormInfo] = useState({ type: type, description: '', value: '' });

  function handleForm(e) {
    setFormInfo({ ...formInfo, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!jwt) {
      alert("Faça Login")
      navigate("/signin");
    }
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/transactions`, ({ ...formInfo }), {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    promise.then((response) => {
      navigate("/");
    });
    promise.catch((error) => {
      console.log(error.response);
      alert('Erro, tente novamente');
    });
  }
  return (<Container>
    <Topo>Nova {type}</Topo>
    <Form onSubmit={handleSubmit}>
      <Input type="string"
        placeholder="Valor"
        name="value"
        onChange={handleForm}
        value={formInfo.cost}
        focus
        required
      />

      <Input type="string"
        placeholder="Descrição"
        name="description"
        onChange={handleForm}
        value={formInfo.description}
        focus
        required
      />

      <Button type="submit">Salvar {type}</Button>
    </Form>
  </Container>)
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;  
  height:667px;
  font-family: "Raleway", sans-serif;
  color: #ffffff;
  background-color: #8c11be;
`
const Topo = styled.div`
 display: flex;
 width: 336px;
 margin-top:10px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-family: "Raleway", sans-serif;
  font-weight: 700;
  font-size: 32px;
      line-height: 50px;
      text-align: flex-start;
`
const Form = styled.form`
  display:flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;  
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
  font-family: "Raleway", sans-serif;
  border: none;     
  background-color: "#FFFFFF";
  color: #000000;
`
const Button = styled.button`
  width: 325px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;     
  font-family: "Raleway", sans-serif;
  font-size: 20px;
  font-weight:700;
  line-height: 26px;
  text-align: center;
  background-color: #A328D6;
  color: #ffffff;
`