import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios' //fetch
import Main from '../template/Main'


const headerProps = {
    icon: 'users',
    title: 'Inserir Candidato 0.0.1',
    subtitle: 'Cadastro de candidato: Incluir, Listar, Alterar e Excluir!'
}

//local - 
//const baseUrl = 'http://localhost:3000/candidates'
const baseUrl = 'https://unaroadmap-api.herokuapp.com/'
const initialState = {
    user: {
        status: 'Active',
        email: '',
        password: '',
        profile: 'Candidato',
    },
    candidate: {
        name: '',
        birthday: '1990-01-01',
        sexo: '',
        schooling: '',
        nationality: '',
        mother_name: '',
        father_name: '',
        telephone: '',
        cell_phone: ''
    },
    list: [],
    _selectProfile: "Candidato",
    _selectStatus: "Active",
    _btnAdicionarActive: true, //TODO: Refatorar a exibição dos btns
    _btnSalvarActive: false
}

export default class CandidateCrud extends Component {

    state = { ...initialState }

    componentDidMount() {

        axios(baseUrl + "candidates").then(resp => {
            this.setState({ list: resp.data })
        })
    }

    activeButtons(btnAdicionar = true, btnSalvar = false) {
        // O padrão é somente o btn adicionar ativo.
        this.setState({
            _btnAdicionarActive: btnAdicionar,
            _btnSalvarActive: btnSalvar
        })
    }

    clear() {
        this.setState({
            user: initialState.user,
            canditate: initialState.candidate
        })

        this.activeButtons()
    }

    async insert() {
        const user = {
            status: this.state.user.status,
            email: this.state.user.email,
            password: this.state.user.password,
            profile: this.state.user.profile
        }
        const candidate = {
            name: this.state.candidate.name,
            birthday: this.state.candidate.birthday,
            sexo: this.state.candidate.sexo,
            schooling: this.state.candidate.schooling,  
            nationality: this.state.candidate.nationality,
            mother_name: this.state.candidate.mother_name,
            father_name: this.state.candidate.father_name,
            telephone: this.state.candidate.telephone,
            cell_phone: this.state.candidate.cell_phone,
            user_id: ''
        }
       
       //Inserir o usuário
       //Pegar o id do usuário
       await axios['post'](baseUrl + 'users', user)
        .then(resp => {
            //const list = this.getUpdatedList(resp.data, true)
            //this.setState({ user: initialState.user, list })
            candidate.user_id = resp.data.id;           
        })

       //Inserir na tabela candidatos
       await axios['post'](baseUrl + 'candidates', candidate)
        .then(resp => {
            const list = this.getUpdatedList(resp.data, true)
            this.setState({ user: initialState.user, list })
        })

        this.activeButtons()
    }

    update() {
        const user = this.state.user
        //Arrumar
        user.profile = this.state._selectProfile;
        user.status = this.state._selectStatus;

        const url = `${baseUrl}/${user.id}`

        axios['put'](url, user)
            .then(resp => {
                const list = this.getUpdatedList(user, true)
                this.setState({ user: initialState.user, list })
            })

        this.activeButtons()
    }

    remove(user) {
        user.status = "Deleted";
        axios['put'](`${baseUrl}/${user.id}`, user)
            .then(resp => {
                //const list = this.getUpdatedList(user, false)
                const list = this.state.list
                this.setState({ user: initialState.user, list })
            })

        this.activeButtons()
    }

    getUpdatedList(user, add = true) {
        // Gera uma lista sem o usuário que está adicionando
        const list = this.state.list.filter(u => u.id !== user.id)
        // Adiciona o usuário no primeiro elemento da lista

        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    handleChange(event) {

        if (event.target.name === 'profile')
            this.setState({ _selectProfile: event.target.value })

        if (event.target.name === 'status')
            this.setState({ _selectStatus: event.target.value })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">

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
                            <input className="form-control"
                                name="password"
                                type="password"
                                value={this.state.user.password}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o password...."
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Status</label>
                            <select name="status" className="form-control" value={this.state._selectStatus} onChange={e => this.handleChange(e)}>
                                <option value="Inactive">Inactive</option>
                                <option value="Active">Active</option>
                                <option value="Deleted">Deleted</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Profile</label>
                            <select name="profile" className="form-control" value={this.state._selectProfile} readOnly>
                                <option value="Candidato">Candidato</option>
                                <option value="Empresa">Empresa</option>
                                <option value="Administrador">Administrador</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.candidate.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome...."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nascimento</label>
                            <input 
                                className="form-control"
                                type="date" 
                                name="birthday"
                                value={this.state.candidate.birthday}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o ano de nascimento...."
                            />
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Sexo</label>
                            <input type="text" className="form-control"
                                name="sexo"
                                value={this.state.candidate.sexo}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o sexo...."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Escolaridade</label>
                            <input type="text" className="form-control"
                                name="schooling"
                                value={this.state.candidate.schooling}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o escolaridade...."
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nacionalidade</label>
                            <input type="text" className="form-control"
                                name="nationality"
                                value={this.state.candidate.nationality}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nacionalidade...."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome da mãe</label>
                            <input type="text" className="form-control"
                                name="mother_name"
                                value={this.state.candidate.mother_name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome da mãe...."
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome do pai</label>
                            <input type="text" className="form-control"
                                name="father_name"
                                value={this.state.candidate.father_name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome do pai...."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Telefone</label>
                            <input type="text" className="form-control"
                                name="telephone"
                                value={this.state.candidate.telephone}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o telefone...."
                            />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Celular</label>
                            <input type="text" className="form-control"
                                name="cell_phone"
                                value={this.state.candidate.cell_phone}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o celular...."
                            />
                        </div>
                    </div>
                </div>



                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.insert(e)}
                            style={{ display: this.state._btnAdicionarActive ? 'inline' : 'none' }}
                        >
                            Adicionar
                          </button>
                        <button className="btn btn-primary"
                            onClick={e => this.update(e)}
                            style={{ display: this.state._btnSalvarActive ? 'inline' : 'none' }}
                        >
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

 
    async load(candidate) {
        //carregar usuário pelo user_id
        const user_id = candidate.user_id
        console.log(">>> carregando user_id", user_id)

        // Trata erro da data.
        if(candidate.birthday == null) candidate.birthday = '1990-01-01'
        candidate.birthday = candidate.birthday.toString().substr(0,10)
                
        await axios['get'](`${baseUrl}users/${user_id}`)
        .then(resp => {
            //
            let carregaUser = resp.data
            carregaUser.password = "" //Tira o password
            //const list = this.getUpdatedList(resp.data, true)
            this.setState({ user: carregaUser, candidate: candidate})
        })
       
        /* this.setState({
            user,
            _selectProfile: user.profile,
            _selectStatus: user.status
        })*/

        //Ativa o btn salvar
        this.activeButtons(false, true)
    }


    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>USER_ID</th>
                        <th>Nome</th>
                        <th>Celular</th>
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
                    <td>{user.user_id}</td>
                    <td>{user.name}</td>
                    <td>{user.cell_phone}</td>
                    <td>
                        <button className="bt btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
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