import React, { Component } from 'react'
import axios from 'axios' //fetch
//import Main from '../template/Main'

// const headerProps = {
//     icon: 'users',
//     title: 'Lista de Usuários',
//     subtitle: 'Lista todos os usuário do sistema'
// }
//local - 
//const baseUrl = 'http://localhost:3000/users'
const baseUrl = 'https://unaroadmap-api.herokuapp.com/users'
const initialState = {
    user: { status: 'Active', email: '', password:'123', profile:'Candidato'},
    list: []
}

export default class UserList extends Component {
    
    state = { ...initialState }
    
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    // clear() {
    //     this.setState({ user: initialState.user })
    // }

    // save() {
    //     const user = this.state.user
    //     // Se tiver um id (true) vai fazer um put, se não tiver id vai incluir (post)
    //     const method = user.id ? 'put' : 'post'
    //     const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
    //     console.log(method === 'put' ? 'Alerar' : "Inserir")
    //     axios[method](url, user)
    //         .then(resp => {
    //             const list = this.getUpdatedList(resp.data, method === 'post' ? true : false)
    //             this.setState({ user: initialState.user, list})
    //         })
    // }

    // getUpdatedList(user, add = true) {
    //     // Gera uma lista sem o usuário que está adicionando
    //     console.log(">>>",  user.id)
    //     const list = this.state.list//.filter(u => u.id !== user.id)
    //     // Adiciona o usuário no primeiro elemento da lista
        
    //     if(add) list.unshift(user)
    //     return list 
    // }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    // renderForm() {
    //     return (
    //         <div className="form">
    //             <div className="row">
    //                 <div className="col-12 col md-6">
    //                     <div className="form-group">
    //                         <label>Status</label>   
    //                         <input type="text" className="form-control"
    //                             name="status" 
    //                             value={this.state.user.status}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite o status.." />
    //                     </div>                        
    //                 </div>
                
    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>E-mail</label>
    //                         <input type="text" className="form-control"
    //                             name="email"
    //                             value={this.state.user.email}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite o email...."
    //                         />

    //                     </div>
    //                 </div> 

    //                 <div className="col-12 col-md-6">
    //                     <div className="form-group">
    //                         <label>Password</label>
    //                         <input type="text" className="form-control"
    //                             name="password"
    //                             value={this.state.user.password}
    //                             onChange={e => this.updateField(e)}
    //                             placeholder="Digite o password...."
    //                         />

    //                     </div>
    //                 </div>                 
    //             </div>

         
    //             <hr />
    //             <div className="row">
    //                   <div className="col-12 d-flex justify-content-end">
    //                       <button className="btn btn-primary"
    //                         onClick={e => this.save(e)}>
    //                           Salvar
    //                       </button>
    //                       <button className="btn btn-secondary ml-2"
    //                          onClick={e => this.clear(e)}>
    //                           {/* melhorar-colocar como this.clear */}
    //                           Cancelar
    //                       </button>
    //                   </div>
    //             </div>
    //         </div>
    //     )
    // }

    
    load(user) {
        this.setState({ user })
    }
    
    // remove(user) {
    //     /*axios.delete(`${baseUrl}/${user.id}`).then(resp => {
    //         const list = this.getUpdatedList(user, false)
    //         this.setState({ list })
    //     })*/
    //     user.status = "Inactive";
    //     axios['put'](`${baseUrl}/${user.id}`, user)
    //         .then(resp => {
    //             const list = this.getUpdatedList(user, false)
    //             this.setState({ user: initialState.user, list})
    //         })
    // }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>E-mail</th>
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
        return this.renderTable()
    }
}