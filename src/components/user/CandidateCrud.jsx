import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios' //fetch
import Main from '../template/Main'
import ModalDeletar from './ModalDeletar'


const headerProps = {
    icon: 'users',
    title: 'Inserir Candidato 0.0.2',
    subtitle: 'Cadastro de candidato: Incluir, Listar, Alterar e Excluir!'
}

//local - 
//const baseUrl = 'http://localhost:3000/candidates'
const baseUrl = 'https://unaroadmap-api.herokuapp.com/'
const initialState = {
    data: {
        id: '',
        status: 'Active',
        email: '',
        password: '',
        profile: 'Candidato',
        user_id:'',
        name:'',
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
    _btnSalvarActive: false,
    show:false
}

export default class CandidateCrud extends Component {

    state = { ...initialState }

    showModal = e => {
        this.setState({show: !this.state.show})
    }



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
            data: initialState.data,
        })

        this.activeButtons()
    }

    getUser(){
        const user ={
            id: this.state.data.id,
            email: this.state.data.email,
            password: this.state.data.password,
            profile: this.state.data.profile,
        }

        return user;
    }

    getCandidate(){

        const candidate = {
            id: this.state.data.id,
            user_id: this.state.data.user_id,
            name: this.state.data.name,
            birthday: this.state.data.birthday,
            sexo: this.state.data.sexo,
            schooling: this.state.data.schooling,  
            nationality: this.state.data.nationality,
            mother_name: this.state.data.mother_name,
            father_name: this.state.data.father_name,
            telephone: this.state.data.telephone,
            cell_phone: this.state.data.cell_phone
        }

        return candidate

    }


    async insert() {
        const user = this.getUser()
        const candidate = this.getCandidate()
       
       //Inserir o usuário
       await axios['post'](baseUrl + 'users', user)
        .then(resp => {
            //Pegar o id do usuário
            candidate.user_id = resp.data.id;           
        })

       //Inserir o candidato
       await axios['post'](baseUrl + 'candidates', candidate)
        .then(resp => {
            const list = this.getUpdatedList(resp.data, true)
            this.setState({ data: initialState.data, list })
        })

        this.activeButtons()
    }


    async update() {
        const user = this.getUser()
        const candidate = this.getCandidate()
        const user_id = candidate.user_id

        user.profile = this.state._selectProfile;
        user.status = this.state._selectStatus;
        
        //Altera o que for relativo ao usuário na tabela users
        await axios['put'](baseUrl + "users/" + user_id , user)
            .then(resp => {
                //do Nothing
            })

        
        //Altera o que for relativo ao candidato
        await axios['put'](baseUrl + 'candidates/' + candidate.id, candidate)
        .then(resp => {          
            const list = this.getUpdatedList(candidate, true)
            this.setState({ data: initialState.data, list })
        })
  
        this.activeButtons()
    }


    remove(user) {
        user.status = "Deleted";

        this.showModal()

        /*
        axios['put'](`${baseUrl}/${user.id}`, user)
            .then(resp => {
                //const list = this.getUpdatedList(user, false)
                const list = this.state.list
                this.setState({ user: initialState.user, list })
            })

        this.activeButtons()
        */
    }

    getUpdatedList(user, add = true) {
        // Gera uma lista sem o usuário que está adicionando
        const list = this.state.list.filter(u => u.id !== user.id)
        // Adiciona o usuário no primeiro elemento da lista

        if (add) list.unshift(user)
        return list
    }

    updateField(event) {
        const data = { ...this.state.data }
        data[event.target.name] = event.target.value
        this.setState({ data })
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
                                value={this.state.data.email}
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
                                value={this.state.data.password}
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
                                name='name'
                                value={this.state.data.name}
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
                                value={this.state.data.birthday}
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
                                value={this.state.data.sexo}
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
                                value={this.state.data.schooling}
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
                                value={this.state.data.nationality}
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
                                value={this.state.data.mother_name}
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
                                value={this.state.data.father_name}
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
                                value={this.state.data.telephone}
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
                                value={this.state.data.cell_phone}
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
                          <ModalDeletar onClose={this.showModal} show={this.state.show} title="Deletar item"> A opção de deletar ainda não foi implementada! </ModalDeletar> 
                    </div>
                </div>
                
            </div>


        )
    }

 
    
    async load(candidate) {
     
        let copyCandidate = { ...candidate }
        let user

        // Trata erro da data.
        if(copyCandidate.birthday == null) copyCandidate.birthday = '1990-01-01'
        copyCandidate.birthday = copyCandidate.birthday.toString().substr(0,10)
                
        //Busca o usuário pelo user_id do candidato
        await axios['get'](`${baseUrl}users/${copyCandidate.user_id}`)
        .then(resp => {
            user = resp.data
            //Precisa limpar o password para não carregar no textinput.
            user.password = ''
            //user.password = "" //Tira o password
            //const list = this.getUpdatedList(resp.data, true)
            //this.setState({ user: carregaUser, candidate: initialState.candidate})
        })
       
        const newData = {...user, ...copyCandidate }

        console.log(">>>> carregou, o user_id", newData.user_id)

        this.setState({
            data: newData,
            _selectProfile: user.profile,
            _selectStatus: user.status
        })

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
        return this.state.list.map(candidate => {
            return (
                <tr key={candidate.id}>
                    <td>{candidate.id}</td>
                    <td>{candidate.user_id}</td>
                    <td>{candidate.name}</td>
                    <td>{candidate.cell_phone}</td>
                    <td>
                        <button className="bt btn-warning"
                            onClick={() => this.load(candidate)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(candidate)}
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