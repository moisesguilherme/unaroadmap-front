import React from 'react'
import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Início"
        subtitle="Dashboard">
        <div className='display-4'>Bem Vindo!</div>
        <hr />
        <p className="nb-0">Sistema para cadastro dos dados na UnaRoadmap.</p>
    </Main>