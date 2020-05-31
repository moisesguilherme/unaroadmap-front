import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import {
    Form,
    FormGroup,
    FormText,
    Input,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

import api from '../../Data/api';

export default function Register() {
    const [data, setData] = useState({
        email: '',
        password: '',
        formErrors: {
            email: '',
            password: ''
        }
    })

    const history = useHistory();
        
    const emailRegex = RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

    const formValid = ({ formErrors, ...rest }) => {
        let valid = true;

        // validate form errors being empty
        Object.values(formErrors).forEach(val => {
            val.length > 0 && (valid = false);
        });

        // validate the form was filled out (null vazio)
        Object.values(rest).forEach(val => {
            val === null && (valid = false)
        });

        return valid;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (formValid(data)) {

           
            const userData = {
                email: data.email,
                password: data.password,
                status: 'Active',
                profile: 'Candidato'
            }

            console.log(`
            --SUMITING--
            ${JSON.stringify(userData)}
            `)

            //Chama api para salvar no banco 
            let logar = false;      
            try {
                const response = await api.post('users', userData);
                logar = true;
            } catch (err) {
                alert('Erro no cadastro, tente novamente.');
            }

            //Colocar o link para página
            if(logar) history.push('/forms/wizard');

        } else {
            console.error('FORM INVALID - DISPLAY ERROR MESSAGE')
        }
    };


    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        
        let formErrors = Object.assign(data.formErrors);
       
        switch (name) {
            case 'email':
                formErrors.email = emailRegex.test(value) && value.length > 0
                    ? ''
                    : 'email inválido';
                break;
            case 'password':
                formErrors.password = value.length < 6 && value.length > 0
                    ? 'Mínimo de 6 letras'
                    : '';
                break;
            default:
                break;
        }

        const userData = {
                password: data.password,
                email: data.email
        }
        userData[name] = value;
        
        setData({formErrors, ...userData })
        //console.log(">>> setData:",  data)
    }

    return (
        <EmptyLayout>
            <EmptyLayout.Section center width={480}>
                { /* START Header */}
                <HeaderAuth
                    title="Criar conta de usuário"
                />
                { /* END Header */}
                { /* START Form */}
                <Form className="mb-3" onSubmit={handleSubmit} noValidate>
                    
                <FormGroup>
                        <Label for="emailAdress">Endereço de email</Label>
                        <Input
                            id="emailAdress"
                            className="bg-white"
                            type="email"
                            name="email"
                            noValidate
                            placeholder="Digite o seu email..."
                            onChange={handleChange}
                        />
                         {data.formErrors.email.length > 0 && (
                                <span className="errorMessage" style={{ color:'red' }}>{data.formErrors.email}</span>
                         )}

                        
                    </FormGroup>
                    
                    
                    <FormGroup>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            className="bg-white"
                            placeholder="Password..."
                            type="password"
                            name="password"
                            id="password"
                            noValidate
                            onChange={handleChange}
                        />
                        {data.formErrors.password.length > 0 && (
                                <span className="errorMessage" style={{ color: 'red' }}>{data.formErrors.password}</span>
                        )}

                    </FormGroup>
                    <FormGroup>
                        <Label for="repeatPassword">Repita o Password</Label>
                        <Input type="password" name="password" id="repeatPassword" placeholder="Password..." className="bg-white" />

                        <FormText color="muted">
                           Nunca vamos compartilhar o seus dados.
                        </FormText>
                    </FormGroup>
                    
                    <FormGroup>
                        <CustomInput type="checkbox" id="acceptTerms" label="Aceito os termos de serviço" inline />
                    </FormGroup>
                    <ThemeConsumer>
                        {
                            ({ color }) => (
                                <Button type="submit" block color={color}  >
                                    Criar conta
                                </Button>
                            )
                        }
                    </ThemeConsumer>
                </Form>
                { /* END Form */}
                { /* START Bottom Links */}
                <div className="d-flex mb-5">
                    <Link to="/pages/forgot-password" className="text-decoration-none">
                        Esqueci a senha!
                        </Link>
                    <Link to="/pages/login" className="ml-auto text-decoration-none">
                        Entrar
                </Link>
                </div>
                { /* END Bottom Links */}
                { /* START Footer */}
                <FooterAuth />
                { /* END Footer */}
            </EmptyLayout.Section>
        </EmptyLayout>
    );
}
