import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/pharelogo.png'

const Home = (props)=>{
	return (
		<header className='homeheader'>
		<img src={logo} alt="logo application" className="logohome"/>
			<h1>Bienvenue sur le Phare!</h1>
			<p>Ici vous trouverez votre dernier bijoux nautique ,</p>
		</header>
	)
}

export default Home;