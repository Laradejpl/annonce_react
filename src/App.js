import React from 'react';
import logo from './logo.svg';
import './App.css';
import Register from './containers/user/register'
import Login from './containers/user/login'
import Logout from './containers/user/logout'
import Header from './containers/header'
import Footer from './containers/footer';
import Home from './containers/home'
import Profil from './containers/profil'
import Search from './containers/search'
import Detail from './containers/detail'

import {Routes, Route} from 'react-router-dom';
import RequireAuth from './helpers/require-data-auth'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route exact path="/" element={<RequireAuth child={Home} auth={true}/>}/>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path="/login" element={<Login />}/>
          
          <Route exact path="/logout" element={<RequireAuth child={Logout} auth={true}/>}/>
          <Route exact path="/profil" element={<RequireAuth child={Profil} auth={true}/>}/>
          <Route exact path="/search" element={<RequireAuth child={Search} auth={true}/>}/>
          <Route exact path="/detail/:id" element={<RequireAuth child={Detail} auth={true}/>}/>
        
        </Routes>
      </main>
      <Footer />

    </div>
  )
}

export default App;
