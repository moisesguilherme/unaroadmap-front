import React, { Component } from 'react'
import axios from 'axios' //fetch
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários 0.0.3',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

//local - 
//const baseUrl = 'http://localhost:3000/users'
const baseUrl = 'https://unaroadmap-api.herokuapp.com/users'
const initialState = {
    user: { status: 'Active', email: '', password:'123', profile:'Candidato'},
    list: [],
    selectProfile: "Candidato",
    selectStatus: "Active"
}

export default class UserCrud extends Component {
    
    state = { ...initialState }
    
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    insert(){
        const user = this.state.user
                    
        axios['post'](baseUrl, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data, true)
                this.setState({ user: initialState.user, list})
            })

    }

    update(){
        const user = this.state.user
        //Arrumar
        user.profile = this.state.selectProfile;

        const url =  `${baseUrl}/${user.id}`
            
        axios['put'](url, user)
            .then(resp => {
                const list = this.getUpdatedList(user, true)
                this.setState({ user: initialState.user, list})
            })
    }

    remove(user) {
        user.status = "Deleted";
        axios['put'](`${baseUrl}/${user.id}`, user)
            .then(resp => {
                const list = this.getUpdatedList(user, false)
                this.setState({ user: initialState.user, list})
            })
    }

    getUpdatedList(user, add = true) {
        // Gera uma lista sem o usuário que está adicionando
        console.log(">>>",  user.id)
        const list = this.state.list.filter(u => u.id !== user.id)
        // Adiciona o usuário no primeiro elemento da lista
        
        if(add) list.unshift(user)
        return list 
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    handleChange(event){
        this.setState({selectProfile: event.target.value})
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col md-6">
                        <div className="form-group">
                            <label>Status</label>   
                            <input type="text" className="form-control"
                                name="status" 
                                value={this.state.user.status}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o status.." />
                        </div>                        
                    </div>
                
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o email...."
                            />

                        </div>
                    </div> 

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="text" className="form-control"
                                name="password"
                                value={this.state.user.password}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o password...."
                            />

                        </div>
                    </div>                 
                </div>
                <div className="row">
                <div className="col-12 col md-6">
                    <div className="form-group">
                        <label>
                            Profile 
                        </label>
                            <select value={this.state.selectProfile} onChange={e => this.handleChange(e)}>
                                <option value="Candidato">Candidato</option>
                                <option value="Empresa">Empresa</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                    </div>
                </div>
                </div>
         
                <hr />
                <div className="row">
                      <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.insert(e)}>
                              Adicionar
                          </button>
                          <button className="btn btn-primary"
                            onClick={e => this.update(e)}>
                              Salvar
                          </button>
                          <button className="btn btn-secondary ml-2"
                             onClick={e => this.clear(e)}>
                              {/* melhorar-colocar como this.clear */}
                              Cancelar
                          </button>
                      </div>
                </div>
            </div>
        )
    }

    
    load(user) {
        this.setState({user, selectProfile:user.profile})
    }
    

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>E-mail</th>
                        <th>Profile</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
    
    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.status}</td>
                    <td>{user.email}</td>
                    <td>{user.profile}</td>
                    <td>
                        <button className="bt bt-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <buttom className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}
                        >
                            <i className="fa fa-trash"></i>
                        </buttom>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        //console.log(this.state.list)
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )      
    }
}