import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../Contexts/AuthContext";
import { REACT_APP_API_URL } from "../components/SignIn";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    allTransactions();
  }, [])

  const { jwt, setJwt } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);

  async function allTransactions() {
    if (!jwt) {
      navigate("/signin");
    }
    await axios.get(`${REACT_APP_API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => {
        setUser(res.data.user);
        setTransactions(res.data.transactions);
        console.log(transactions)
        let saldo = 0;
        res.data.transactions.forEach((t) => {
          if (t.type = "entrada") {
            saldo += Number(t.value);
          } else {
            saldo -= Number(t.value);
          }
        })
        setTotalTransactions(saldo);
      })
      .catch((err) => {
        return err.response;
      })
  }
  function exit() {
    setJwt("");
    navigate("/signin");
  }
  function transactionType (type){
    navigate(`transaction/${type}`)
  }
  return (<Container>
    <Headers>
      <h1>Olá, {user.name}</h1>
      <ion-icon name="log-out-outline" onClick={exit}></ion-icon></Headers>
    <Operations>
      <ul>
        {(transactions.map((t, index) => (<><li>
          <ItemValor key={index}>
            <div className="data">{t.date}</div>
            <div className="desc">{t.description}</div>
          </ItemValor>
          <TType><p className={t.type === "entrada" ? "verde" : "vermelho"}>R${t.value}</p></TType>
        </li></>
        )))} </ul>
      <AllFlow><div>Saldo</div> <div><p className={totalTransactions > 0 ? "verde" : "vermelho"}>R${totalTransactions}</p></div>    </AllFlow>
    </Operations>
    <Buttons>
      <OptionsTo onClick={() => transactionType("entrada")}>
        <div><ion-icon name="add-circle-outline"></ion-icon></div>
        <p>Nova <br /> Entrada</p>
      </OptionsTo>
      <OptionsTo onClick={() => transactionType("saida")}>
        <div><ion-icon name="close-circle-outline"></ion-icon></div>
        <p>Nova <br /> Saída</p>
      </OptionsTo>
    </Buttons>
  </Container>)
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height:667px;
  color: #ffffff;
  background-color: #8c11be;
`
const Headers = styled.div`
 display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: "Raleway", sans-serif;
  height:85px;
  width:350px;
  color: #ffffff;
  background-color: #8c11be;
  h1{
      font-family: "Saira Stencil One", sans-serif;
      font-size: 32px;
      line-height: 50px;
  }
  ion-icon{
    font-size: 30px;
  }
  a {
    text-decoration: none;
    color: #ffffff;
  }
`
const Operations = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: space-between;
border-radius: 5px;
background-color: #ffffff;  
width: 350px;
height: 500px;
ion-icon{
  font-size: 25px;
  color: #000000;
  text-align: flex-start;
  margin-left:10px;
  margin-top:10px;
  font-family: "Raleway", sans-serif;
  color: #000000;
  margin-left: 10px;
  margin-bottom: 10px;
  font-weight:700;
}
ul li {
  width: 350px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-bottom: 5px;
    font-family: "Raleway", sans-serif;
  color: #000000;
  font-size: 16px;
  }
  
`
const ItemValor = styled.div`
  display:flex;
  border:1px black;
    flex-direction: row;    
    justify-content: center;
    align-items: center;
    color: #000;
    .data{
    margin-left:30px;
    margin-top:10px;
    width: 50px;
    color: #c6c6c6;
  }
  .desc{
    text-decoration: bold;
    margin-top:10px;
    width:190px;
    align-items: flex-start;
  }
`
const TType = styled.div`
.verde {
  color: green;
}
.vermelho {
  color: red;
}
`;
const Buttons = styled.div`
  display:flex;
  align-items: center;
  width: 360px;
  justify-content: space-around;  
  margin-top: 13px;
  margin-bottom: 10px;
  p{
    margin-left: 10px;
    margin-bottom: 10px;
  }
  ion-icon {
    margin-left: 10px;
    margin-top: 10px;
  }
`
const OptionsTo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-radius: 5px;
  background-color: #A328D6;  
  width: 170px;
  height: 114px;
  font-family: "Raleway", sans-serif;
    color: #ffffff;
    
    margin-bottom: 10px;
    font-weight:700;
  ion-icon{
    font-size: 25px;
    color: #ffffff;
    text-align: flex-start;
  }
`
const AllFlow = styled.div`
display:flex;
width: 330px;
flex-direction:row;
justify-content: space-between;
align-items: center;
font-family: "Raleway", sans-serif;
color: #000;
margin-left: 10px;
margin-right:50px;
margin-bottom: 10px;
font-weight:700;
.verde {
  color: green;
}
.vermelho {
  color: red;
}
`