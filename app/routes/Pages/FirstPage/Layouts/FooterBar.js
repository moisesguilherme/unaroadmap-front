import React from "react";
import styled from "styled-components"
import Logo from '../../../../assets/logo.svg'

const Styles = styled.div ``;

export const FooterBar = ()=>(
    <Styles>
        <footer className="container py-5">
            <div className="row">
                <div className="col-12 col-md">
                    <img src={Logo} alt="logo"/>
                    <small className="d-block mb-3 text-muted">&copy; {new Date().getFullYear()}  Una Roadmap</small>
                </div>

                <div className="col-6 col-md">
                    <h5>
                        features
                    </h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="/">Cool stuff</a></li>
                        <li><a className="text-muted" href="/">Random feature</a></li>
                        <li><a className="text-muted" href="/">Team feature</a></li>
                        <li><a className="text-muted" href="/">Stuff for developers</a></li>
                        <li><a className="text-muted" href="/">Another one</a></li>
                        <li><a className="text-muted" href="/">Last time</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>
                        features
                    </h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="/">Cool stuff</a></li>
                        <li><a className="text-muted" href="/">Random feature</a></li>
                        <li><a className="text-muted" href="/">Team feature</a></li>
                        <li><a className="text-muted" href="/">Stuff for developers</a></li>
                        <li><a className="text-muted" href="/">Another one</a></li>
                        <li><a className="text-muted" href="/">Last time</a></li>
                    </ul>
                </div>
                <div className="col-6 col-md">
                    <h5>
                        features
                    </h5>
                    <ul className="list-unstyled text-small">
                        <li><a className="text-muted" href="/">Cool stuff</a></li>
                        <li><a className="text-muted" href="/">Random feature</a></li>
                        <li><a className="text-muted" href="/">Team feature</a></li>
                        <li><a className="text-muted" href="/">Stuff for developers</a></li>
                        <li><a className="text-muted" href="/">Another one</a></li>
                        <li><a className="text-muted" href="/">Last time</a></li>
                    </ul>
                </div>

            </div>
        </footer>
    </Styles>
)