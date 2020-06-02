import React from 'react';
import {Jumbotron,Button,Container,Row, Col } from 'react-bootstrap';
import styled from  'styled-components';
import {NavigationBar} from "../Layouts/NavigationBar";
import {FooterBar} from '../Layouts/FooterBar';
import sign from '../../assets/signs.svg';


const Styles = styled.div `

.container{
    margin: auto;
    width: 50%;
    padding:30px;
    
    
    
}
.jumbotron{
    background-color:white;
      margin: auto;
      width: 50%;
      

}
h1{
    text-align:center;
}

.button{
    margin: auto;
}
.colors{
    background-color:#C7E8F3;
}


`;



export const NotFound =()=>(
    <div className="colors">
        <NavigationBar></NavigationBar>
        <Styles>
            <Container>
                <Jumbotron>
                    <img src={sign} alt=""/>
                    <h1>Página Não Encontrada!</h1>
                    <Row className="justify-content-md-center">
                        <Col md={{ span: 6, offset: -7 }}>
                         <Button variant="dark" href="/"  >Voltar para pagina inicial</Button>
                        </Col>
                    </Row>
                </Jumbotron>
            </Container>
        </Styles>
        <FooterBar></FooterBar>
    </div>
)