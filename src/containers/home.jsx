import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/pharelogo.png'
import Connected from './connected';
import Categories from './categories';
import ReactCardSlider from './ReactCardSlider';



const Home = (props)=>{
	return (
		<main className='main_home'>
		  <header className='homeheader'>
		  <img src={logo} alt="logo application" className="logohome"/>
			<h1 className='titlehome'>Bienvenue sur le Phare!</h1>
			<p>Ici vous trouverez votre dernier bijoux nautique ,</p>
		  </header>
		
		    <aside className='profil_aside'>
			   <Connected/>
			</aside>
		    <aside className='profil_aside_cat'>
		              <Categories/>
		    </aside>
			<section>
			
			  <div id='body'>

			  

			  <ReactCardSlider/>

			


			  </div>
			</section>
		</main>
	)
}


export default Home;