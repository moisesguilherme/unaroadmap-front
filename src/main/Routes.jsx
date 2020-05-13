import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'
import UserList from '../components/user/UserList'
import CanditateCrud from '../components/user/CandidateCrud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Route path='/candidates' component={CanditateCrud} />
        <Route path='/list' component={UserList} />
        <Redirect from='*' to='/' />
    </Switch>