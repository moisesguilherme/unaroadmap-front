import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { NavigationBar } from "./Layouts/NavigationBar";
import { Header } from './Layouts/Header'
import { FooterBar } from './Layouts/FooterBar'

import WebFont from 'webfontloader'

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


export default function FirstPage() {
    
    WebFont.load({
        google: {
          families: ['Roboto', 'sans-serif']
        }
      });


    return(
        <EmptyLayout>
            <NavigationBar></NavigationBar>
            <Header></Header>
            <FooterBar></FooterBar>
        </EmptyLayout>
    );
}