import React, {Component} from "react";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import styled from "styled-components";
import Logo from "../../assets/logo.svg";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      validate: {
        emailState: "",
      },
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmail(e) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {validate} = this.state;
    if (emailRex.test(e.target.value)) {
      validate.emailState = "has-success";
    } else {
      validate.emailState = "has-danger";
    }
    this.setState({validate});
  }

  handleChange = async (event) => {
    const {target} = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const {name} = target;
    await this.setState({
      [name]: value,
    });
  };

  submitForm(e) {
    e.preventDefault();
    console.log(`Email: ${this.state.email}`);
  }

  render() {
    const {email, password} = this.state;
    return (
      <Styles2>
        <Styles>
          <Container fluid className="App">
            <Form className="form" onSubmit={(e) => this.submitForm(e)}>
              <Col>
                <img className="logo" src={Logo} alt="" />
                <FormGroup>
                  <Label>
                    <strong>Email</strong>
                  </Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="myemail@email.com"
                    value={email}
                    valid={this.state.validate.emailState === "has-success"}
                    invalid={this.state.validate.emailState === "has-danger"}
                    onChange={(e) => {
                      this.validateEmail(e);
                      this.handleChange(e);
                    }}
                  />
                  <FormFeedback valid></FormFeedback>
                  <FormFeedback>
                    Digite um endereço de email valido.
                  </FormFeedback>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplePassword">
                    <strong>Senha</strong>
                  </Label>
                  <Input
                    type="password"
                    name="password"
                    id="examplePassword"
                    placeholder="********"
                    value={password}
                    onChange={(e) => this.handleChange(e)}
                  />
                </FormGroup>
              </Col>
              <Button>Login</Button>
            </Form>
          </Container>
        </Styles>
      </Styles2>
    );
  }
}
const Styles = styled.div`
  .App {
    width: 360px;
    padding: 8% 0 0;
    margin: auto;
  }

  .form {
    position: relative;
    z-index: 1;
    background: #ffffff;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  }
  .form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
  }
  .form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #ef3b3a;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #ffffff;
    font-size: 14px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  .form button:hover,
  .form button:active,
  .form button:focus {
    background: #ffffff;
    color: black;
    border: #ef3b3a solid 2px;
  }
  .form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
  }
  .form .message a {
    color: #ef3b3a;
    text-decoration: none;
  }
  .form .register-form {
    display: none;
  }
  .container {
    position: relative;
    z-index: 1;
    max-width: 300px;
    margin: 0 auto;
  }
  .container:before,
  .container:after {
    content: "";
    display: block;
    clear: both;
  }
  .container .info {
    margin: 50px auto;
    text-align: center;
  }
  .container .info h1 {
    margin: 0 0 15px;
    padding: 0;
    font-size: 36px;
    font-weight: 300;
    color: #1a1a1a;
  }
  .container .info span {
    color: #4d4d4d;
    font-size: 12px;
  }
  .container .info span a {
    color: #000000;
    text-decoration: none;
  }
  .container .info span .fa {
    color: #ef3b3a;
  }
  .logo {
    padding: 20px;
    margin: -10px;
  }
`;
const Styles2 = styled.body`
  body{
    background-color:#1a2f3a
  }

`;

export default Login;
