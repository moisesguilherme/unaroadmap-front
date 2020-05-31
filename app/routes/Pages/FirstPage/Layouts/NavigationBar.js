import React from 'react';
import {Nav ,Navbar, Button}from 'react-bootstrap';
import styled from 'styled-components';
import Logo from '../../../../assets/logo.svg'
import WebFont from 'webfontloader'

const Styles = styled.div `
    .navbar{
        background-color: #1a2f3a;
    }
    .navbar-brand, .navbar-nav .nav-link{
        color: #FFFFFF;
        
        
    }
    .navbar-brand:hover, .navbar-nav:hover  .nav-link:hover{
        color: #878C8F;
    }

    WebFont.load({
        google: {
          families: ['Roboto', 'sans-serif']
        }
      });
`
export const NavigationBar = ()=>(
    <Styles>
        <Navbar id="navbar" fixed="top" expand= "lg ">
            <Navbar.Brand id="logo" href="/">
            <img
                alt=""
                src={Logo}
                className="d-inline-block align-top"
            />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls= "basic-navbar-nav"></Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Item >
                <Nav.Link href="/pages/register">Possui Cadastro?</Nav.Link>
                </Nav.Item>
                <Button variant="outline-light" href="/pages/login">Login</Button>
                </Nav>
            </Navbar.Collapse>
            
        </Navbar>
        <div>
            <hr/>
        </div>
    </Styles>
)