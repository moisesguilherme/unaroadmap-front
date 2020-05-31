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

export default function Login(){

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const history = useHistory();

    
    const formValid = (data) => {
        let valid = true;
        
        if(data.email == null || data.password == null){
            valid = false;
        }
        return valid;
    }
    
    function handleChange(e) {
        e.preventDefault();
        const { name, value } = e.target;
        
        const userData = {
            email: data.email,
            password: data.password,
        }
        userData[name] = value;

        setData({...userData});
        console.log(">>>>", data)
    }

    //Chama api       
    async function handleSubmit(e){
        e.preventDefault();
        console.log(">>> verificar senha", data.email, data.password)
        
        if (formValid(data)) {

            try{
                const response = await api.get('users')
                let logar = false;

                Object.values(response.data).forEach(val => {
                    if(val.email === data.email && val.password === val.password){
                        //console.log(">>> login válido")
                        logar = true;
                        return;
                    }
                })
                
                if(logar) history.push('/dashboards/projects');
                console.log(">> logar:", logar)
                


            }catch (err) {
                alert('Erro ao conectar com banco de dados, tente novamente')
            }

        }else{
            console.error('Erro o campo email ou senha não foram preenchidos.')
        }
        
    }

    

    return(
        <EmptyLayout>
            <EmptyLayout.Section center>
                { /* START Header */}
                <HeaderAuth 
                    title="Entrar no sistema"
                />
                { /* END Header */}
                { /* START Form */}
                <Form className="mb-3" onSubmit={handleSubmit} noValidate>
                    <FormGroup>
                        <Label htmlFor="emailAdress">
                            Endereço de email
                        </Label>
                        <Input type="email" 
                               name="email" 
                               id="emailAdress" 
                               noValidate 
                               placeholder="Digite o seu email..." 
                               className="bg-white"
                               onChange={handleChange}
                               />
                        <FormText color="muted">
                           Nunca vamos compartilhar o seu email com ninguém.
                        </FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="password">
                            Senha
                        </Label>
                        <Input type="password" 
                                name="password" 
                                id="password" 
                                placeholder="Password..." 
                                className="bg-white"
                                noValidate 
                                onChange={handleChange}
                                 />
                    </FormGroup>
                    <FormGroup>
                        <CustomInput type="checkbox" id="rememberPassword" label="Lembrar senha" inline />
                    </FormGroup>
                    <ThemeConsumer>
                    {
                        ({ color }) => (
                            <Button type="submit" color={ color } block>
                                Entrar
                            </Button>
                        )
                    }
                    </ThemeConsumer>
                </Form>
                { /* END Form */}
                { /* START Bottom Links */}
                <div className="d-flex mb-5">
                    <Link to="/pages/forgotpassword" className="text-decoration-none">
                        Esqueci a senha! 
                    </Link>
                    <Link to="/pages/register" className="ml-auto text-decoration-none">
                        Cadastrar
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
