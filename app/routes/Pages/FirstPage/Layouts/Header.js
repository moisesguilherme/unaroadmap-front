import React from "react";
import {
  Jumbotron,
  Container,
  Card,
  CardDeck,
  Row,
  Col,
  CardImg
} from "react-bootstrap";
import styled from "styled-components";
import Database from "../../../../assets/database.svg";
import Code from "../../../../assets/code.svg";
import Html from "../../../../assets/html.svg";
import fundo from "../../../../assets/fundo.jpg"

const Styles = styled.div`
    .jumbotron{
      background: url(${fundo}) no-repeat fixed bottom;
      color:#100303;
    }

    .text-content{
      margin: 60px 55px 80px;
    }

    .card-img{
      margin: auto;
      width: 50%;
      padding: 10px;
      
    }
    .card-title{
      text-align: center;
      margin:auto;
    }
    .card-body{
      color:#100303
  }`;


const Styles2 = styled.button`
  margin: auto;
  width: 50%;
  border-radius:15px;
  padding: 10px;
  color:#000000;
  background-color:#f0a500;

  a{
    color: #000;
    text-decoration:none;
  }
  
  
`;

export const Header = () => (
  <Styles>
    <Jumbotron fluid>
      <div className="overlay">
        <Container>
          <Row className="text-content">
            <h1 className="title">
              Conquiste o emprego <br></br>
            dos seus sonhos
          </h1>
            <p className="content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
              inventore doloremque magni fugit corporis optio modi soluta. Cum
              eaque id, corporis ratione incidunt accusantium, perspiciatis
              nesciunt dignissimos sapiente distinctio alias?
          </p>

          </Row>
          <CardDeck>
            <Card>
              <CardImg
                top
                width="100%"
                src={Code}
                alt="Card image cap"
                className="logo"
              />
              <Card.Body>
                <Card.Title><strong>Back-end</strong></Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <CardImg
                top
                width="100%"
                src={Html}
                alt="Card image cap"
                className="logo"
              />
              <Card.Body>
                <Card.Title><strong>Front-end</strong></Card.Title>
                <Card.Text>
                  This card has supporting text below as a natural lead-in to
                  additional content.{" "}
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <CardImg
                top
                width="100%"
                src={Database}
                alt="Card image cap"
                className="logo"
              />
              <Card.Body>
                <Card.Title><strong>Banco de Dados</strong></Card.Title>
                <Card.Text>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardDeck>
          <br></br>
          <Row className="justify-content">
            <Col md={{ span: 3, offset: 5 }}>
              <Styles2>
                <a href="/pages/register">Cadastrar</a>
              </Styles2>
            </Col>
          </Row>
        </Container>
      </div>
    </Jumbotron>
  </Styles>
);
